"use client";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";

const GALLERY = [
  { id:"1", title:"SLA Dental Model",        category:"sla",       material:"Dental Resin",  image:"https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80&fit=crop" },
  { id:"2", title:"Engineering Prototype",   category:"fdm",       material:"PETG",          image:"https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80&fit=crop" },
  { id:"3", title:"Architectural Scale Model",category:"modeling", material:"PLA",           image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop" },
  { id:"4", title:"Functional Bracket",      category:"fdm",       material:"ABS",           image:"https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80&fit=crop" },
  { id:"5", title:"Jewellery Prototype",     category:"sla",       material:"Castable Resin",image:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&fit=crop" },
  { id:"6", title:"Consumer Product Shell",  category:"fdm",       material:"PETG",          image:"https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&q=80&fit=crop" },
  { id:"7", title:"Medical Device Part",     category:"sla",       material:"Bio-Safe Resin", image:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80&fit=crop" },
  { id:"8", title:"Custom Enclosure",        category:"fdm",       material:"ABS",           image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&fit=crop" },
];

const CATEGORY_LABELS: Record<string, string> = { sla:"SLA Printing", fdm:"FDM Printing", modeling:"3D Modeling", prototyping:"Prototyping" };

export function GallerySection() {
  const [active, setActive] = useState("all");
  const filters = ["all", ...Array.from(new Set(GALLERY.map(g => g.category)))];
  const filtered = active === "all" ? GALLERY : GALLERY.filter(g => g.category === active);

  return (
    <section id="gallery" className="section-py relative z-10" style={{ background:"var(--bg2)" }}>
      <div className="container-x">
        <ScrollReveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <p className="section-label">Portfolio</p>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(44px,5vw,80px)",letterSpacing:"2px",lineHeight:0.95,color:"var(--text)" }}>OUR WORK</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)}
                className="transition-all duration-200"
                style={{ padding:"6px 14px",fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",border:"1px solid",borderColor: active===f ? "var(--accent)" : "var(--border)",color: active===f ? "var(--accent)" : "var(--text-muted)",background: active===f ? "var(--border-soft)" : "transparent",cursor:"pointer" }}>
                {f === "all" ? "All" : CATEGORY_LABELS[f] || f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((item, i) => (
            <ScrollReveal key={item.id} delay={(i % 4) as 0|1|2|3}>
              <div className="group relative overflow-hidden aspect-square" style={{ border:"1px solid var(--border)" }}>
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4" style={{ background:"linear-gradient(to top, var(--bg) 0%, transparent 100%)" }}>
                  <span className="text-[10px] mb-1" style={{ fontFamily:"'JetBrains Mono',monospace",color:"var(--accent)",letterSpacing:"2px",textTransform:"uppercase" }}>{CATEGORY_LABELS[item.category]||item.category}</span>
                  <h4 className="font-bold text-xs sm:text-sm" style={{ fontFamily:"'Syne',sans-serif",color:"var(--text)" }}>{item.title}</h4>
                  {item.material && <p className="text-[11px] mt-1" style={{ color:"var(--text-muted)" }}>{item.material}</p>}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
