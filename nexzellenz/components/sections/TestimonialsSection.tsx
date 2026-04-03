"use client";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const TESTIMONIALS = [
  { id:"1", name:"Rahul Sharma",     company:"Startup Founder, Mumbai",     rating:5, quote:"Nexzellenz delivered our product prototypes in 48 hours with exceptional accuracy. The SLA prints were flawless — exactly what we needed for investor demos." },
  { id:"2", name:"Priya Nair",       company:"Product Designer, Bangalore",  rating:5, quote:"The 3D modeling team transformed my rough sketches into print-ready files overnight. Communication was excellent throughout. Highly recommend." },
  { id:"3", name:"Arjun Mehta",      company:"R&D Engineer, Pune",           rating:5, quote:"We've used Nexzellenz for over 50 engineering prototypes. Consistent quality, fast turnaround, and competitive pricing. Our go-to 3D printing partner." },
  { id:"4", name:"Sneha Iyer",       company:"Jewellery Designer, Surat",    rating:5, quote:"The castable resin prints for my jewellery line are absolutely perfect. Ultra-fine details preserved every time. Outstanding craftsmanship." },
  { id:"5", name:"Vikram Patel",     company:"Architect, Ahmedabad",         rating:5, quote:"Scale models for our architectural presentations come out beautifully every time. The team understands precision and always delivers on schedule." },
  { id:"6", name:"Deepa Krishnan",   company:"Medical Device Startup, Chennai", rating:5, quote:"Bio-safe resin parts for our device prototypes met all our specifications. Professional, reliable, and responsive. Couldn't ask for more." },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-py relative z-10">
      <div className="container-x">
        <ScrollReveal className="text-center mb-10 sm:mb-16">
          <p className="section-label justify-center">Testimonials</p>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(44px,5vw,80px)",letterSpacing:"2px",lineHeight:0.95,color:"var(--text)" }}>CLIENT STORIES</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.id} delay={(i % 3) as 0|1|2}>
              <div className="relative p-6 sm:p-8 h-full flex flex-col" style={{ border:"1px solid var(--border)",background:"var(--card-bg)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:"linear-gradient(90deg, var(--accent), transparent)" }}/>
                <div className="flex gap-1 mb-5">
                  {Array.from({length:t.rating}).map((_,j)=>(
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="var(--accent2)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <p className="mb-7 flex-1" style={{ fontSize:"clamp(13px,1.3vw,14px)",lineHeight:1.75,color:"var(--text-muted)",fontStyle:"italic" }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width:40,height:40,background:"var(--border-soft)",border:"1px solid var(--border)" }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",color:"var(--accent)" }}>{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold" style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(13px,1.4vw,15px)",color:"var(--text)" }}>{t.name}</p>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(9px,1vw,11px)",color:"var(--text-muted)",letterSpacing:"0.5px" }}>{t.company}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
