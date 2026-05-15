"use client";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link  from "next/link";
import { useState } from "react";

const SERVICES = [
  {
    id: "1", code: "SVC_01", featured: true,
    title: "SLA 3D Printing Services",
    description: "Stereolithography printing delivers outstanding accuracy with smooth surface finishes. Ideal for prototypes, dental models, jewellery, and highly detailed components with tolerances as tight as 0.1mm.",
    tags: ["High Resolution", "±0.1mm Tolerance", "Smooth Finish"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=85&fit=crop",
    accent: "#00e5ff", glow: "rgba(0,229,255,0.55)",
  },
  {
    id: "2", code: "SVC_02", featured: true,
    title: "FDM 3D Printing",
    description: "Cost-effective, durable parts in PLA, ABS, PETG, TPU, and engineering-grade nylons. Perfect for functional prototypes and end-use parts at any scale.",
    tags: ["Multi-Material", "Large Format", "Functional Parts"],
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&q=85&fit=crop",
    accent: "#ff6b00", glow: "rgba(255,107,0,0.55)",
  },
  {
    id: "3", code: "SVC_03", featured: false,
    title: "3D Modeling & Design",
    description: "Expert designers create precise CAD models from sketches or concepts, delivering print-ready files optimised for any printing technology.",
    tags: ["CAD Design", "Reverse Engineering", "Print-Ready"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop",
    accent: "#a78bfa", glow: "rgba(124,58,237,0.55)",
  },
  {
    id: "4", code: "SVC_04", featured: false,
    title: "Rapid Prototyping",
    description: "Go from CAD file to physical model in as little as 24 hours. Accelerate your product development cycle with fast-turnaround prototypes.",
    tags: ["24hr Turnaround", "Iterative Design", "Multi-Scale"],
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=85&fit=crop",
    accent: "#00e5ff", glow: "rgba(0,229,255,0.55)",
  },
];

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`group relative overflow-hidden ${svc.featured ? "md:col-span-2" : ""}`}
      style={{ height: svc.featured ? "clamp(440px,52vw,580px)" : "clamp(380px,42vw,500px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out" style={{ transform: hovered ? "scale(1.07)" : "scale(1.0)" }}>
        <Image src={svc.image} alt={svc.title} fill className="object-cover" sizes={svc.featured ? "100vw" : "(max-width:768px) 100vw, 50vw"} priority={index === 0}/>
      </div>
      {/* Dark gradient */}
      <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(4,6,14,0.96) 0%, rgba(4,6,14,0.70) 40%, rgba(4,6,14,0.25) 75%, rgba(4,6,14,0.10) 100%)" }}/>
      {/* Accent bloom */}
      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: hovered ? 1 : 0, background:`radial-gradient(ellipse 80% 60% at 50% 100%, ${svc.glow} 0%, transparent 70%)` }}/>
      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 4px)" }}/>
      {/* Top-left bracket */}
      <div className="absolute top-5 left-5 pointer-events-none transition-all duration-500" style={{ width: hovered ? 44 : 32, height: hovered ? 44 : 32, borderTop:`2px solid ${svc.accent}`, borderLeft:`2px solid ${svc.accent}`, opacity:0.9 }}/>
      {/* Service code badge */}
      <div className="absolute top-5 right-5 z-10">
        <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",letterSpacing:"3px",color:svc.accent,padding:"5px 12px",border:`1px solid ${svc.accent}55`,background:"rgba(0,0,0,0.50)",backdropFilter:"blur(8px)",display:"block" }}>{svc.code}</span>
      </div>
      {/* Bottom-right bracket */}
      <div className="absolute bottom-5 right-5 pointer-events-none transition-all duration-500" style={{ width: hovered ? 44 : 28, height: hovered ? 44 : 28, borderBottom:`2px solid ${svc.accent}`, borderRight:`2px solid ${svc.accent}`, opacity: hovered ? 0.9 : 0.4 }}/>
      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
        <h3 className="mb-3 leading-tight transition-transform duration-500" style={{ fontFamily:"'Syne',sans-serif",fontSize: svc.featured ? "clamp(22px,2.8vw,38px)" : "clamp(18px,2.2vw,26px)",fontWeight:700,color:"#ffffff",transform: hovered ? "translateY(-4px)" : "translateY(0)",textShadow:"0 2px 12px rgba(0,0,0,0.6)" }}>
          {svc.title}
        </h3>
        {/* Description on hover */}
        <div style={{ overflow:"hidden",maxHeight: hovered ? "160px" : "0px",opacity: hovered ? 1 : 0,transition:"max-height 0.45s ease, opacity 0.35s ease" }}>
          <p className="mb-5" style={{ fontSize:"clamp(12px,1.3vw,14px)",lineHeight:1.75,color:"rgba(255,255,255,0.78)" }}>{svc.description}</p>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {svc.tags.map(tag => (
            <span key={tag} style={{ padding:"3px 10px",border:`1px solid ${svc.accent}44`,fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"1px",color:svc.accent,background:"rgba(0,0,0,0.40)",backdropFilter:"blur(6px)" }}>{tag}</span>
          ))}
        </div>
        {/* CTA */}
        <div className="flex justify-end">
          <Link href="#contact" className="no-underline flex items-center gap-2"
            style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:svc.accent,padding:"7px 16px",border:`1px solid ${svc.accent}66`,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(8px)",opacity: hovered ? 1 : 0,transform: hovered ? "translateY(0)" : "translateY(6px)",transition:"all 0.4s 0.1s ease" }}>
            Get Quote <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section-py relative z-10">
      <div className="container-x">
        <ScrollReveal className="grid md:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <p className="section-label">Our Services</p>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(44px,5vw,80px)",letterSpacing:"2px",lineHeight:0.95,color:"var(--text)" }}>WHAT WE<br/>MANUFACTURE</h2>
          </div>
          <p style={{ fontSize:"clamp(14px,1.5vw,16px)",lineHeight:1.75,color:"var(--text-muted)" }}>From concept to creation, we provide end-to-end additive manufacturing solutions. Precision, speed, and quality on every project.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background:"var(--border)",border:"1px solid var(--border)" }}>
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.id} delay={(i % 3) as 0|1|2}>
              <ServiceCard svc={svc} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
