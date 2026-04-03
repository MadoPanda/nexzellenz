"use client";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PARAGRAPHS = [
  "Nexzellenz Technologies LLP is a registered Partnership Firm incorporated in 2021, born from the vision of making high-quality additive manufacturing accessible to businesses and creators across India.",
  "We believe in the transformative power of 3D printing — enabling faster innovation cycles, reduced tooling costs, and unlimited design freedom.",
  "From startups validating their first prototype to established manufacturers scaling production, we deliver the same commitment to excellence on every order.",
];
const HIGHLIGHTS = [
  "Registered Partnership Firm — Compliant and Reliable",
  "ISO-aligned Quality Management Practices",
  "Transparent Pricing — No Hidden Costs",
  "Dedicated Project Manager for Every Order",
  "NDA Available for Sensitive Projects",
];
const TIMELINE = [
  { year:"2021", text:"Founded — Nexzellenz Technologies LLP incorporated with focus on 3D printing services." },
  { year:"2022", text:"Expanded — Added SLA printing capabilities and 3D modeling services." },
  { year:"2023", text:"Scaled — Expanded to pan-India delivery. Launched engineering-grade material capabilities." },
  { year:"2024", text:"Grew — Surpassed 500 projects. Added 24hr express rapid prototyping service." },
  { year:"2025+",text:"Future — Scaling operations, investing in multi-material and metal 3D printing." },
];

export function AboutSection() {
  return (
    <section id="about" className="section-py relative z-10">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          <ScrollReveal>
            <p className="section-label">About Us</p>
            <h2 className="mb-6 sm:mb-8" style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(40px,6vw,80px)",letterSpacing:"2px",lineHeight:0.95,color:"var(--text)" }}>
              <span className="block">BUILT FOR</span>
              <span className="block">PRECISION</span>
            </h2>
            {PARAGRAPHS.map((p, i) => (
              <p key={i} className="mb-4" style={{ fontSize:"clamp(13px,1.5vw,15px)",lineHeight:1.8,color:"var(--text-muted)" }}>{p}</p>
            ))}
            <div className="flex flex-col gap-3 mt-8">
              {HIGHLIGHTS.map(h => (
                <div key={h} className="flex items-start gap-3" style={{ color:"var(--text)",fontSize:"clamp(12px,1.4vw,14px)" }}>
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2" style={{ background:"var(--accent)",clipPath:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}/>
                  {h}
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className="relative p-6 sm:p-8 lg:p-10 h-full" style={{ background:"var(--bg2)",border:"1px solid var(--border)" }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:"linear-gradient(90deg, var(--accent2), var(--accent), var(--accent3))" }}/>
              <h3 className="mb-6 sm:mb-8 font-bold" style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(15px,2vw,20px)",color:"var(--text)" }}>Our Journey</h3>
              <div className="flex flex-col gap-4 sm:gap-5">
                {TIMELINE.map(t => (
                  <div key={t.year} className="flex gap-4 sm:gap-5">
                    <span className="flex-shrink-0 pt-0.5" style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(15px,2vw,20px)",color:"var(--accent)",minWidth:"52px" }}>{t.year}</span>
                    <p style={{ fontSize:"clamp(12px,1.3vw,14px)",lineHeight:1.6,color:"var(--text-muted)" }}>{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
