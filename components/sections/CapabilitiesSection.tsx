"use client";
// components/sections/CapabilitiesSection.tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const caps = [
  { num:"01", title:"Layer Resolution",   desc:"25–300 microns. SLA achieves ultra-fine detail at 25μm for jewellery, dental, and micro-scale parts.", pct:95,  icon:<><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></> },
  { num:"02", title:"Build Volume",       desc:"Up to 500×500×500mm for FDM. Multiple simultaneous small-part printing for high-volume orders.",          pct:80,  icon:<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></> },
  { num:"03", title:"Turnaround Speed",   desc:"Express orders in 24 hours. Standard production within 48–72 hours including post-processing.",           pct:90,  icon:<><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></> },
  { num:"04", title:"File Formats",       desc:"STL, OBJ, STEP, IGES, 3MF and more. We can convert 2D drawings to print-ready 3D files.",                pct:100, icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
  { num:"05", title:"Industries Served",  desc:"Automotive, aerospace, medical, architecture, consumer goods, education, jewellery and custom art.",       pct:100, icon:<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
  { num:"06", title:"Quality Guarantee",  desc:"Dimensional verification on every order. Full re-print guarantee if parts don't meet agreed specs.",      pct:100, icon:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></> },
  { num:"07", title:"Materials Range",    desc:"PLA, ABS, PETG, TPU, Nylon, Carbon Fiber, Standard & Engineering Resins, Flexible & Castable.",          pct:85,  icon:<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/> },
  { num:"08", title:"Post Processing",    desc:"Sanding, painting, vapor smoothing, UV curing, support removal, and assembly — all in-house.",            pct:75,  icon:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section-py relative z-10" style={{ background:"var(--bg2)" }}>
      <div className="container-x">
        <ScrollReveal className="flex justify-between items-end mb-14 flex-wrap gap-6">
          <div>
            <p className="section-label">Technical Specs</p>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(44px,5vw,80px)",letterSpacing:"2px",lineHeight:0.95,color:"var(--text)" }}>CAPABILITIES</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {caps.map((c,i)=>(
            <ScrollReveal key={c.num} delay={(i%4) as 0|1|2|3}>
              <div className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ padding:"clamp(24px,3vw,32px)",border:"1px solid var(--border)",background:"var(--card-bg)" }}
                onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="var(--accent)"; el.style.boxShadow="var(--shadow-glow)"; }}
                onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="var(--border)"; el.style.boxShadow="none"; }}>
                <div className="absolute bottom-0 right-2 pointer-events-none select-none" style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"80px",color:"var(--border-soft)",lineHeight:1 }}>{c.num}</div>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="mb-4">{c.icon}</svg>
                <h4 className="mb-2 font-bold" style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(13px,1.4vw,15px)",color:"var(--text)" }}>{c.title}</h4>
                <p className="mb-4" style={{ fontSize:"clamp(12px,1.2vw,13px)",lineHeight:1.6,color:"var(--text-muted)" }}>{c.desc}</p>
                <div className="h-0.5 overflow-hidden" style={{ background:"var(--border-soft)" }}>
                  <div className="h-full" style={{ width:`${c.pct}%`,background:"linear-gradient(90deg, var(--accent), var(--accent3))" }}/>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
