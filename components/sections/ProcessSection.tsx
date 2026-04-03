"use client";
// components/sections/ProcessSection.tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  { num:"1", title:"Consultation",      desc:"Share your requirements and goals. We guide you through technology selection and feasibility.", icon:<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/> },
  { num:"2", title:"Design & Modeling", desc:"Our team prepares or refines your 3D model, optimising geometry for the selected material.", icon:<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></> },
  { num:"3", title:"Precision Printing", desc:"Production using calibrated printers. Real-time quality monitoring on every layer.", icon:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
  { num:"4", title:"Delivery",           desc:"Post-processing, quality inspection, and secure pan-India shipping. Parts arrive ready to use.", icon:<><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></> },
];

export function ProcessSection() {
  return (
    <section id="process" className="section-py relative z-10" style={{ background:"var(--bg2)" }}>
      <div className="container-x">
        <ScrollReveal className="text-center mb-16">
          <p className="section-label justify-center">Our Workflow</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(44px,5vw,80px)",letterSpacing:"2px",lineHeight:0.95,color:"var(--text)" }}>HOW IT WORKS</h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background:"linear-gradient(90deg, var(--accent), var(--accent3), var(--accent2))" }}/>
          {steps.map((step,i) => (
            <ScrollReveal key={step.num} delay={i as 0|1|2|3} className="text-center relative z-10">
              <div className="group relative mx-auto mb-6 flex items-center justify-center transition-all duration-300" style={{ width:"clamp(64px,8vw,80px)",height:"clamp(64px,8vw,80px)",border:"1px solid var(--border)",background:"var(--bg)",clipPath:"polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="var(--accent)"; el.style.boxShadow="var(--shadow-glow)"; }}
                onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="var(--bg)"; el.style.boxShadow="none"; }}>
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-[11px] font-bold" style={{ background:"var(--accent)",color:"var(--bg)",fontFamily:"'Bebas Neue',sans-serif" }}>{step.num}</span>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">{step.icon}</svg>
              </div>
              <h3 className="mb-2 font-bold" style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(13px,1.5vw,16px)",color:"var(--text)" }}>{step.title}</h3>
              <p style={{ fontSize:"clamp(12px,1.2vw,13px)",lineHeight:1.6,color:"var(--text-muted)" }}>{step.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
