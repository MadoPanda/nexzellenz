"use client";
// ─────────────────────────────────────────────────────────────────────────────
// components/ui/Hero3D.tsx
// Pure WebGL 3D element — no Three.js, no external 3D libraries needed.
// Shows a hexagonal prism (layer-by-layer print metaphor) with:
//   - Animated scan line (print head sweeping)
//   - Orbital rings (range of services)
//   - Inner sphere (precision core)
//   - Rising particles (material depositing)
//   - Live HUD (cycling material names + layer count)
//   - Drag/touch to rotate, auto-rotates when idle
//
// HOW TO USE IN HeroSection.tsx:
//   import { Hero3D } from "@/components/ui/Hero3D";
//   <div className="hidden lg:block w-full max-w-xl">
//     <Hero3D />
//   </div>
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";

export function Hero3D() {
  const rootRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudLayer  = useRef<HTMLSpanElement>(null);
  const hudMat    = useRef<HTMLSpanElement>(null);
  const hudStatus = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root   = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      (canvas as HTMLCanvasElement & { getContext(c: "experimental-webgl"): WebGLRenderingContext | null }).getContext("experimental-webgl");

    if (!gl) return;

    // ── resize ───────────────────────────────────────────────────────────────
    function resize() {
      const w = root!.clientWidth;
      const h = Math.min(w * 0.72, 520);
      root!.style.minHeight = h + "px";
      canvas!.width  = w * (window.devicePixelRatio || 1);
      canvas!.height = h * (window.devicePixelRatio || 1);
      canvas!.style.width  = w + "px";
      canvas!.style.height = h + "px";
      (gl as WebGLRenderingContext).viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    window.addEventListener("resize", resize);

    // ── shaders ──────────────────────────────────────────────────────────────
    const vsSource = `
      attribute vec3 aPos;
      attribute vec3 aNorm;
      uniform mat4 uMV;
      uniform mat4 uProj;
      uniform mat3 uNormMat;
      varying vec3 vNorm;
      varying vec3 vPos;
      void main(){
        vec4 mv = uMV * vec4(aPos,1.0);
        gl_Position = uProj * mv;
        vNorm = normalize(uNormMat * aNorm);
        vPos  = mv.xyz;
      }`;

    const fsSource = `
      precision mediump float;
      varying vec3 vNorm;
      varying vec3 vPos;
      uniform vec3 uAccent;
      uniform vec3 uAccent2;
      uniform float uTime;
      uniform float uPrintProgress;
      void main(){
        vec3 L1 = normalize(vec3(1.0,2.0,2.0));
        vec3 L2 = normalize(vec3(-2.0,-1.0,1.5));
        float d1 = max(dot(vNorm,L1),0.0);
        float d2 = max(dot(vNorm,L2),0.0)*0.3;
        float amb = 0.12;
        vec3 vd = normalize(-vPos);
        vec3 refl = reflect(-L1,vNorm);
        float spec = pow(max(dot(vd,refl),0.0),64.0)*0.8;
        vec3 base = mix(uAccent2,uAccent,d1);
        vec3 col  = (amb+d1+d2)*base + spec;
        float scanY   = uPrintProgress*4.0-2.0;
        float scanD   = abs(vPos.y-scanY);
        float scanGlow= exp(-scanD*scanD*8.0)*0.6;
        col += scanGlow*uAccent*1.5;
        float fresnel = pow(1.0-abs(dot(vNorm,vd)),3.0)*0.5;
        col += fresnel*uAccent;
        gl_FragColor = vec4(col,1.0);
      }`;

    const wireVS = `
      attribute vec3 aPos;
      uniform mat4 uMV;
      uniform mat4 uProj;
      void main(){ gl_Position = uProj*uMV*vec4(aPos,1.0); }`;
    const wireFS = `
      precision mediump float;
      uniform vec3 uColor;
      uniform float uAlpha;
      void main(){ gl_FragColor = vec4(uColor,uAlpha); }`;

    const ptVS = `
      attribute vec3 aPos;
      attribute float aSize;
      attribute float aAlpha;
      uniform mat4 uMV;
      uniform mat4 uProj;
      varying float vAlpha;
      void main(){
        gl_Position  = uProj*uMV*vec4(aPos,1.0);
        gl_PointSize = aSize;
        vAlpha = aAlpha;
      }`;
    const ptFS = `
      precision mediump float;
      varying float vAlpha;
      uniform vec3 uColor;
      void main(){
        vec2 d = gl_PointCoord-0.5;
        float r = dot(d,d)*4.0;
        if(r>1.0) discard;
        gl_FragColor = vec4(uColor, vAlpha*(1.0-r));
      }`;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    function makeProgram(vs: string, fs: string) {
      const p = gl!.createProgram()!;
      gl!.attachShader(p, compile(gl!.VERTEX_SHADER,   vs));
      gl!.attachShader(p, compile(gl!.FRAGMENT_SHADER, fs));
      gl!.linkProgram(p);
      return p;
    }

    const solidProg  = makeProgram(vsSource, fsSource);
    const wireProg   = makeProgram(wireVS,   wireFS);
    const ptProg     = makeProgram(ptVS,     ptFS);

    // ── geometry builders ────────────────────────────────────────────────────
    function hexPrism(r: number, h: number, n: number) {
      const v: number[] = [], nm: number[] = [], idx: number[] = [];
      const hh = h / 2;
      for (let i = 0; i < n; i++) {
        const a0 = (i/n)*Math.PI*2, a1 = ((i+1)/n)*Math.PI*2;
        const x0=Math.cos(a0)*r, z0=Math.sin(a0)*r;
        const x1=Math.cos(a1)*r, z1=Math.sin(a1)*r;
        const nx=Math.cos((a0+a1)/2), nz=Math.sin((a0+a1)/2);
        const b = v.length/3;
        v.push(x0,-hh,z0, x1,-hh,z1, x1,hh,z1, x0,hh,z0);
        for(let j=0;j<4;j++) nm.push(nx,0,nz);
        idx.push(b,b+1,b+2, b,b+2,b+3);
      }
      const tb = v.length/3;
      v.push(0,hh,0); nm.push(0,1,0);
      for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2; v.push(Math.cos(a)*r,hh,Math.sin(a)*r); nm.push(0,1,0); }
      for(let i=0;i<n;i++) idx.push(tb, tb+1+i, tb+1+(i+1)%n);
      const bb = v.length/3;
      v.push(0,-hh,0); nm.push(0,-1,0);
      for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2; v.push(Math.cos(a)*r,-hh,Math.sin(a)*r); nm.push(0,-1,0); }
      for(let i=0;i<n;i++) idx.push(bb, bb+1+(i+1)%n, bb+1+i);
      return { positions: new Float32Array(v), normals: new Float32Array(nm), indices: new Uint16Array(idx) };
    }

    function sphere(r: number, lat: number, lon: number) {
      const v: number[]=[],nm: number[]=[],idx: number[]=[];
      for(let i=0;i<=lat;i++){
        const t=i/lat*Math.PI;
        for(let j=0;j<=lon;j++){
          const p=j/lon*Math.PI*2;
          const x=Math.sin(t)*Math.cos(p), y=Math.cos(t), z=Math.sin(t)*Math.sin(p);
          v.push(r*x,r*y,r*z); nm.push(x,y,z);
        }
      }
      for(let i=0;i<lat;i++) for(let j=0;j<lon;j++){
        const a=i*(lon+1)+j, b=a+lon+1;
        idx.push(a,b,a+1, b,b+1,a+1);
      }
      return { positions:new Float32Array(v), normals:new Float32Array(nm), indices:new Uint16Array(idx) };
    }

    function ring(r: number, tube: number, seg: number, rs: number) {
      const v: number[]=[],nm: number[]=[],idx: number[]=[];
      for(let i=0;i<seg;i++){
        const u=i/seg*Math.PI*2;
        const cx=Math.cos(u)*r, cz=Math.sin(u)*r;
        for(let j=0;j<=rs;j++){
          const v2=j/rs*Math.PI*2;
          const tx=Math.cos(u)*(r+tube*Math.cos(v2));
          const ty=tube*Math.sin(v2);
          const tz=Math.sin(u)*(r+tube*Math.cos(v2));
          v.push(tx,ty,tz);
          const len=Math.sqrt((tx-cx)**2+ty**2+(tz-cz)**2)||1;
          nm.push((tx-cx)/len,ty/len,(tz-cz)/len);
        }
      }
      for(let i=0;i<seg;i++) for(let j=0;j<rs;j++){
        const a=i*(rs+1)+j, b=((i+1)%seg)*(rs+1)+j;
        idx.push(a,b,a+1, b,b+1,a+1);
      }
      return { positions:new Float32Array(v), normals:new Float32Array(nm), indices:new Uint16Array(idx) };
    }

    function upload(data: { positions: Float32Array; normals: Float32Array; indices: Uint16Array }) {
      const pb=gl!.createBuffer()!; gl!.bindBuffer(gl!.ARRAY_BUFFER,pb); gl!.bufferData(gl!.ARRAY_BUFFER,data.positions,gl!.STATIC_DRAW);
      const nb=gl!.createBuffer()!; gl!.bindBuffer(gl!.ARRAY_BUFFER,nb); gl!.bufferData(gl!.ARRAY_BUFFER,data.normals,  gl!.STATIC_DRAW);
      const ib=gl!.createBuffer()!; gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER,ib); gl!.bufferData(gl!.ELEMENT_ARRAY_BUFFER,data.indices,gl!.STATIC_DRAW);
      return { pb, nb, ib, count: data.indices.length };
    }

    const hexGeo   = upload(hexPrism(0.75,1.6,6));
    const sphGeo   = upload(sphere(0.35,18,24));
    const ring1Geo = upload(ring(1.15,0.030,64,10));
    const ring2Geo = upload(ring(1.45,0.025,64,10));

    // wireframe
    function wireHex(r: number, h: number, n: number) {
      const v: number[]=[], hh=h/2;
      for(let i=0;i<n;i++){
        const a0=(i/n)*Math.PI*2, a1=((i+1)/n)*Math.PI*2;
        const x0=Math.cos(a0)*r, z0=Math.sin(a0)*r;
        const x1=Math.cos(a1)*r, z1=Math.sin(a1)*r;
        v.push(x0,-hh,z0, x1,-hh,z1, x0,hh,z0, x1,hh,z1, x0,-hh,z0, x0,hh,z0);
      }
      const wb=gl!.createBuffer()!;
      gl!.bindBuffer(gl!.ARRAY_BUFFER,wb);
      gl!.bufferData(gl!.ARRAY_BUFFER,new Float32Array(v),gl!.STATIC_DRAW);
      return { wb, count:v.length/3 };
    }
    const wire = wireHex(0.78,1.64,6);

    // ── particles ────────────────────────────────────────────────────────────
    const NP=120;
    const pPos=new Float32Array(NP*3), pSz=new Float32Array(NP), pAl=new Float32Array(NP);
    const pVel=new Float32Array(NP*3), pLf=new Float32Array(NP), pMax=new Float32Array(NP);
    function spawnP(i: number){
      const a=Math.random()*Math.PI*2, rr=0.7+Math.random()*0.1;
      pPos[i*3]=Math.cos(a)*rr; pPos[i*3+1]=(Math.random()-0.5)*1.6; pPos[i*3+2]=Math.sin(a)*rr;
      pVel[i*3]=(Math.random()-0.5)*0.003; pVel[i*3+1]=0.005+Math.random()*0.008; pVel[i*3+2]=(Math.random()-0.5)*0.003;
      pSz[i]=2+Math.random()*4; pLf[i]=0; pMax[i]=60+Math.random()*80; pAl[i]=0;
    }
    for(let i=0;i<NP;i++){ spawnP(i); pLf[i]=Math.random()*pMax[i]; }
    const ppb=gl.createBuffer()!, psb=gl.createBuffer()!, pab=gl.createBuffer()!;

    // ── math ─────────────────────────────────────────────────────────────────
    type M4 = Float32Array;
    const perspective=(fov:number,asp:number,n:number,f:number):M4=>{
      const t=1/Math.tan(fov/2), nf=1/(n-f);
      return new Float32Array([t/asp,0,0,0, 0,t,0,0, 0,0,(f+n)*nf,-1, 0,0,2*f*n*nf,0]);
    };
    const mul=(a:M4,b:M4):M4=>{
      const o=new Float32Array(16);
      for(let i=0;i<4;i++) for(let j=0;j<4;j++){ let s=0; for(let k=0;k<4;k++) s+=a[i+k*4]*b[k+j*4]; o[i+j*4]=s; }
      return o;
    };
    const rotY=(a:number):M4=>{ const c=Math.cos(a),s=Math.sin(a); return new Float32Array([c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1]); };
    const rotX=(a:number):M4=>{ const c=Math.cos(a),s=Math.sin(a); return new Float32Array([1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1]); };
    const rotZ=(a:number):M4=>{ const c=Math.cos(a),s=Math.sin(a); return new Float32Array([c,s,0,0, -s,c,0,0, 0,0,1,0, 0,0,0,1]); };
    const trans=(x:number,y:number,z:number):M4=>new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1]);
    const normMat=(m:M4):Float32Array=>{
      const a=m[0],b=m[1],c=m[2],d=m[4],e=m[5],f=m[6],g=m[8],h=m[9],k=m[10];
      const det=a*(e*k-f*h)-b*(d*k-f*g)+c*(d*h-e*g)||1;
      const inv=1/det;
      return new Float32Array([(e*k-f*h)*inv,(c*h-b*k)*inv,(b*f-c*e)*inv, (f*g-d*k)*inv,(a*k-c*g)*inv,(c*d-a*f)*inv, (d*h-e*g)*inv,(b*g-a*h)*inv,(a*e-b*d)*inv]);
    };

    // ── draw helpers ─────────────────────────────────────────────────────────
    function drawSolid(geo:{pb:WebGLBuffer,nb:WebGLBuffer,ib:WebGLBuffer,count:number}, mv:M4, proj:M4, ac:[number,number,number], ac2:[number,number,number], t:number, pp:number){
      gl!.useProgram(solidProg);
      gl!.bindBuffer(gl!.ARRAY_BUFFER,geo.pb);
      const pl=gl!.getAttribLocation(solidProg,"aPos");
      gl!.enableVertexAttribArray(pl); gl!.vertexAttribPointer(pl,3,gl!.FLOAT,false,0,0);
      gl!.bindBuffer(gl!.ARRAY_BUFFER,geo.nb);
      const nl=gl!.getAttribLocation(solidProg,"aNorm");
      gl!.enableVertexAttribArray(nl); gl!.vertexAttribPointer(nl,3,gl!.FLOAT,false,0,0);
      gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER,geo.ib);
      gl!.uniformMatrix4fv(gl!.getUniformLocation(solidProg,"uMV"),   false,mv);
      gl!.uniformMatrix4fv(gl!.getUniformLocation(solidProg,"uProj"), false,proj);
      gl!.uniformMatrix3fv(gl!.getUniformLocation(solidProg,"uNormMat"),false,normMat(mv));
      gl!.uniform3fv(gl!.getUniformLocation(solidProg,"uAccent"), ac);
      gl!.uniform3fv(gl!.getUniformLocation(solidProg,"uAccent2"),ac2);
      gl!.uniform1f(gl!.getUniformLocation(solidProg,"uTime"),t);
      gl!.uniform1f(gl!.getUniformLocation(solidProg,"uPrintProgress"),pp);
      gl!.drawElements(gl!.TRIANGLES,geo.count,gl!.UNSIGNED_SHORT,0);
    }
    function drawWire(mv:M4,proj:M4){
      gl!.useProgram(wireProg);
      gl!.bindBuffer(gl!.ARRAY_BUFFER,wire.wb);
      const pl=gl!.getAttribLocation(wireProg,"aPos");
      gl!.enableVertexAttribArray(pl); gl!.vertexAttribPointer(pl,3,gl!.FLOAT,false,0,0);
      gl!.uniformMatrix4fv(gl!.getUniformLocation(wireProg,"uMV"),   false,mv);
      gl!.uniformMatrix4fv(gl!.getUniformLocation(wireProg,"uProj"), false,proj);
      gl!.uniform3fv(gl!.getUniformLocation(wireProg,"uColor"),[0,0.9,1.0]);
      gl!.uniform1f(gl!.getUniformLocation(wireProg,"uAlpha"),0.22);
      gl!.drawArrays(gl!.LINES,0,wire.count);
    }

    // ── interaction ──────────────────────────────────────────────────────────
    let rY=0.3,rX=0.2,tY=0.3,tX=0.2,dragging=false,lx=0,ly=0,autoRot=true;
    const onDown=(x:number,y:number)=>{dragging=true;lx=x;ly=y;autoRot=false;};
    const onMove=(x:number,y:number)=>{
      if(!dragging)return;
      tY+=(x-lx)*0.012; tX+=(y-ly)*0.009;
      tX=Math.max(-1.1,Math.min(1.1,tX)); lx=x;ly=y;
    };
    const onUp=()=>{dragging=false;};
    canvas.addEventListener("mousedown", e=>onDown(e.clientX,e.clientY));
    window.addEventListener("mousemove", e=>onMove(e.clientX,e.clientY));
    window.addEventListener("mouseup",   onUp);
    canvas.addEventListener("touchstart",e=>{e.preventDefault();onDown(e.touches[0].clientX,e.touches[0].clientY);},{passive:false});
    window.addEventListener("touchmove", e=>{if(dragging){e.preventDefault();onMove(e.touches[0].clientX,e.touches[0].clientY);}},{passive:false});
    window.addEventListener("touchend",  onUp);

    // ── render loop ──────────────────────────────────────────────────────────
    let pp=0,ppDir=1,frame=0,lastSwitch=0;
    const MATS=["SLA Resin","ABS Nylon","PETG","TPU Flex","Castable"];
    const STATS=["Printing...","Slicing...","Curing...","Inspecting...","Dispatching"];
    let raf=0;

    function render(ts:number){
      raf=requestAnimationFrame(render);
      ts*=0.001; frame++;

      // HUD
      if(frame-lastSwitch>180){
        lastSwitch=frame;
        const i=Math.floor(Math.random()*MATS.length);
        if(hudMat.current)    hudMat.current.textContent    = MATS[i];
        if(hudStatus.current) hudStatus.current.textContent = STATS[i];
      }
      if(hudLayer.current) hudLayer.current.textContent = String(Math.floor(((ts*12)%300)+1)).padStart(3,"0");

      pp+=0.003*ppDir;
      if(pp>=1) ppDir=-1;
      if(pp<=0) ppDir=1;
      if(autoRot) tY+=0.006;
      rY+=(tY-rY)*0.06; rX+=(tX-rX)*0.06;

      // particles
      for(let i=0;i<NP;i++){
        pLf[i]++;
        pPos[i*3]+=pVel[i*3]; pPos[i*3+1]+=pVel[i*3+1]; pPos[i*3+2]+=pVel[i*3+2];
        const t2=pLf[i]/pMax[i];
        pAl[i]=(t2<0.2?t2/0.2:t2>0.7?(1-t2)/0.3:1.0)*0.7;
        if(pLf[i]>=pMax[i]) spawnP(i);
      }

      const W=canvas!.width, H=canvas!.height;
      gl!.viewport(0,0,W,H);
      gl!.clearColor(0.02,0.027,0.035,1);
      gl!.clear(gl!.COLOR_BUFFER_BIT|gl!.DEPTH_BUFFER_BIT);
      gl!.enable(gl!.DEPTH_TEST);
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.SRC_ALPHA,gl!.ONE_MINUS_SRC_ALPHA);

      const proj=perspective(0.85,W/H,0.1,50);
      const view=trans(0,0,-3.8);
      const rot=mul(rotX(rX),rotY(rY));
      const mv=mul(view,rot);

      const ac:[number,number,number]=[0,0.9,1];
      const ac2:[number,number,number]=[0.1,0.05,0.2];
      const warm:[number,number,number]=[1,0.42,0];
      const purp:[number,number,number]=[0.48,0.23,0.93];

      drawSolid(hexGeo,mv,proj,ac,ac2,ts,pp);
      drawWire(mv,proj);
      drawSolid(sphGeo,mul(mv,mul(rotZ(ts*0.7),rotX(ts*0.5))),proj,warm,[0.2,0,0.1],ts,pp);
      drawSolid(ring1Geo,mul(mv,mul(rotX(0.6+Math.sin(ts*0.3)*0.15),rotY(ts*0.4))),proj,ac,[0,0.3,0.4],ts,0.5);
      drawSolid(ring2Geo,mul(mul(view,rotY(rY*0.7)),mul(rotX(-0.4+Math.cos(ts*0.25)*0.12),rotY(-ts*0.3))),proj,purp,[0.1,0,0.3],ts,0.5);

      // particles
      gl!.useProgram(ptProg);
      gl!.bindBuffer(gl!.ARRAY_BUFFER,ppb); gl!.bufferData(gl!.ARRAY_BUFFER,pPos,gl!.DYNAMIC_DRAW);
      const ppl=gl!.getAttribLocation(ptProg,"aPos"); gl!.enableVertexAttribArray(ppl); gl!.vertexAttribPointer(ppl,3,gl!.FLOAT,false,0,0);
      gl!.bindBuffer(gl!.ARRAY_BUFFER,psb); gl!.bufferData(gl!.ARRAY_BUFFER,pSz,gl!.DYNAMIC_DRAW);
      const psl=gl!.getAttribLocation(ptProg,"aSize"); gl!.enableVertexAttribArray(psl); gl!.vertexAttribPointer(psl,1,gl!.FLOAT,false,0,0);
      gl!.bindBuffer(gl!.ARRAY_BUFFER,pab); gl!.bufferData(gl!.ARRAY_BUFFER,pAl,gl!.DYNAMIC_DRAW);
      const pal=gl!.getAttribLocation(ptProg,"aAlpha"); gl!.enableVertexAttribArray(pal); gl!.vertexAttribPointer(pal,1,gl!.FLOAT,false,0,0);
      gl!.uniformMatrix4fv(gl!.getUniformLocation(ptProg,"uMV"),  false,mv);
      gl!.uniformMatrix4fv(gl!.getUniformLocation(ptProg,"uProj"),false,proj);
      gl!.uniform3fv(gl!.getUniformLocation(ptProg,"uColor"),[0,0.9,1]);
      gl!.blendFunc(gl!.SRC_ALPHA,gl!.ONE);
      gl!.drawArrays(gl!.POINTS,0,NP);
      gl!.blendFunc(gl!.SRC_ALPHA,gl!.ONE_MINUS_SRC_ALPHA);
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",  resize);
      window.removeEventListener("mousemove",e=>onMove(e.clientX,e.clientY));
      window.removeEventListener("mouseup",  onUp);
      window.removeEventListener("touchmove",()=>{});
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        width:"100%",
        background:"#050709",
        borderRadius:12,
        position:"relative",
        overflow:"hidden",
        minHeight:400,
        fontFamily:"'JetBrains Mono','Courier New',monospace",
      }}
    >
      {/* Corner brackets */}
      {(["tl","tr","bl","br"] as const).map(c=>(
        <div key={c} style={{
          position:"absolute",
          width:18,height:18,
          top:    c[0]==="t"?10:undefined,
          bottom: c[0]==="b"?10:undefined,
          left:   c[1]==="l"?10:undefined,
          right:  c[1]==="r"?10:undefined,
          borderTop:    c[0]==="t"?"1.5px solid rgba(0,229,255,0.4)":undefined,
          borderBottom: c[0]==="b"?"1.5px solid rgba(0,229,255,0.4)":undefined,
          borderLeft:   c[1]==="l"?"1.5px solid rgba(0,229,255,0.4)":undefined,
          borderRight:  c[1]==="r"?"1.5px solid rgba(0,229,255,0.4)":undefined,
          pointerEvents:"none",
        }}/>
      ))}

      {/* HUD top-left */}
      <div style={{position:"absolute",top:18,left:20,display:"flex",flexDirection:"column",gap:5,pointerEvents:"none"}}>
        {[
          {label:"Layer",    slot:<span ref={hudLayer} style={{color:"#00e5ff",fontWeight:500}}>001</span>},
          {label:"Material", slot:<span ref={hudMat}   style={{color:"#00e5ff",fontWeight:500}}>SLA Resin</span>},
          {label:"Res",      slot:<span style={{color:"#00e5ff",fontWeight:500}}>0.05mm</span>},
        ].map(row=>(
          <div key={row.label} style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(0,229,255,0.55)"}}>
            {row.label} {row.slot}
          </div>
        ))}
      </div>

      {/* Hint */}
      <div style={{position:"absolute",top:18,right:20,fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(0,229,255,0.3)",pointerEvents:"none"}}>
        drag to rotate
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{display:"block",maxWidth:"100%"}}/>

      {/* Status bottom-left */}
      <div style={{position:"absolute",bottom:18,left:20,display:"flex",alignItems:"center",gap:7,fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(0,229,255,0.45)",pointerEvents:"none"}}>
        <span style={{width:6,height:6,borderRadius:"50%",background:"#00e5ff",animation:"nx3d-pulse 2s ease-in-out infinite",flexShrink:0}}/>
        <span ref={hudStatus}>Printing...</span>
      </div>

      {/* Label bottom-right */}
      <div style={{position:"absolute",bottom:18,right:20,textAlign:"right",pointerEvents:"none"}}>
        <span style={{display:"block",fontSize:11,letterSpacing:"3px",textTransform:"uppercase",color:"#00e5ff"}}>Nexzellenz</span>
        <span style={{display:"block",fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(0,229,255,0.4)",marginTop:2}}>Technologies LLP</span>
      </div>

      {/* Pulse keyframe */}
      <style>{`@keyframes nx3d-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.3;transform:scale(1.6)}}`}</style>
    </div>
  );
}
