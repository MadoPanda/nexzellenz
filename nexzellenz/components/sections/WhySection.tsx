// components/sections/WhySection.tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const points = [
  { icon:<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,           title:"Certified Quality Standards",  desc:"Every part undergoes rigorous dimensional inspection. We maintain tight tolerances and deliver consistent results across all production runs." },
  { icon:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,  title:"Fast Turnaround Times",        desc:"From order to dispatch in as little as 24–48 hours. Our streamlined workflow and in-house capabilities mean zero delays." },
  { icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, title:"Pan-India Delivery Network", desc:"Reliable shipping to all major cities and Tier-2 markets. Secure packaging ensures your prints arrive in perfect condition." },
  { icon:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, title:"Expert Support Team", desc:"Dedicated technical consultants guide you from design to delivery. We're partners in your manufacturing journey, not just a vendor." },
];

export function WhySection() {
  return (
    <section id="why" className="section-py relative z-10">
      <div className="container-x">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Visual */}
          <ScrollReveal>
            <div className="relative" style={{ height:"clamp(320px,40vw,480px)",border:"1px solid var(--border)",overflow:"hidden" }}>
              <div className="absolute inset-0" style={{ backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 39px, var(--border-soft) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, var(--border-soft) 40px)" }}/>
              <div className="absolute inset-0 flex items-center justify-center">
                {[200,280,360,440].map((size,i)=>(
                  <div key={size} className="absolute rounded-full" style={{ width:size,height:size,border:`1px solid var(--border)`,borderStyle:i%2===1?"dashed":"solid",animation:`ring-spin-${i%2===0?"cw":"ccw"} ${20+i*10}s linear infinite` }}/>
                ))}
                <div className="flex items-center justify-center" style={{ width:"clamp(72px,8vw,100px)",height:"clamp(72px,8vw,100px)",background:"linear-gradient(135deg, var(--accent), var(--accent3))",clipPath:"polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",animation:"float-y 4s ease-in-out infinite" }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
              </div>
              {[["top-4 left-4","X: 0.100mm"],["top-4 right-4","LAYER: 25μm"],["bottom-4 left-4","MATERIAL: UV-RESIN"],["bottom-4 right-4","STATUS: PRINTING"]].map(([pos,label])=>(
                <span key={label} className={`absolute ${pos}`} style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"var(--accent)",opacity:0.6,letterSpacing:"1px" }}>{label}</span>
              ))}
            </div>
          </ScrollReveal>

          {/* Points */}
          <div className="flex flex-col gap-4">
            <ScrollReveal>
              <p className="section-label">Why Choose Us</p>
              <h2 className="mb-10" style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(40px,4vw,72px)",letterSpacing:"2px",lineHeight:0.95,color:"var(--text)" }}>THE NEXZELLENZ<br/>ADVANTAGE</h2>
            </ScrollReveal>
            {points.map((p,i)=>(
              <ScrollReveal key={p.title} delay={(i+1) as 1|2|3|4}>
                <div className="group flex gap-5 p-5 sm:p-6 border border-transparent relative transition-all duration-300 hover:border-[var(--border)] hover:bg-[var(--bg2)]">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" style={{ background:"var(--accent)" }}/>
                  <div className="flex-shrink-0 flex items-center justify-center" style={{ width:48,height:48,background:"var(--border-soft)",border:"1px solid var(--border)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">{p.icon}</svg>
                  </div>
                  <div>
                    <h4 className="mb-1.5 font-bold" style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(14px,1.5vw,16px)",color:"var(--text)" }}>{p.title}</h4>
                    <p style={{ fontSize:"clamp(12px,1.3vw,14px)",lineHeight:1.6,color:"var(--text-muted)" }}>{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
