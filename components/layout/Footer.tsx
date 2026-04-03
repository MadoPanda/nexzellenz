"use client";
import Link from "next/link";

const CONTACT = {
  phone:   "+91 XXXXX XXXXX",
  email:   "info@nexzellenz.com",
  address: "India — Pan-India Delivery",
};
const SOCIALS = [
  { label:"LinkedIn",  href:"#", d:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></> },
  { label:"Instagram", href:"#", d:<><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
  { label:"WhatsApp",  href:"#", d:<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/> },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10" style={{ borderTop:"1px solid var(--border)" }}>
      <div className="container-x py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">

          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" stroke="var(--accent)" strokeWidth="1.5"/>
                <polygon points="20,8 32,14.5 32,25.5 20,32 8,25.5 8,14.5" stroke="var(--accent)" strokeWidth="1" fill="var(--border-soft)"/>
                <circle cx="20" cy="20" r="4" fill="var(--accent)"/>
              </svg>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"2px",lineHeight:1.1,fontSize:"clamp(13px,2vw,17px)" }}>
                <span style={{ color:"var(--text)" }}>NEXZELLENZ</span><br/>
                <span style={{ color:"var(--accent)" }}>TECHNOLOGIES LLP</span>
              </div>
            </div>
            <p className="mb-5 max-w-xs" style={{ fontSize:"clamp(12px,1.3vw,14px)",lineHeight:1.75,color:"var(--text-muted)" }}>
              A registered Partnership Firm delivering precision 3D printing, SLA manufacturing, and 3D modeling services across India since 2021.
            </p>
            <div className="flex gap-2 flex-wrap">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="flex items-center justify-center transition-all duration-300"
                  style={{ width:38,height:38,border:"1px solid var(--border)" }}
                  onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="var(--accent)"; el.style.background="var(--border-soft)"; }}
                  onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="var(--border)"; el.style.background="transparent"; }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">{s.d}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-bold" style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:"var(--text)" }}>Services</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {["SLA 3D Printing","FDM 3D Printing","3D Modeling","Rapid Prototyping","Post Processing"].map(s=>(
                <li key={s}>
                  <Link href="#services" className="no-underline transition-colors duration-200"
                    style={{ fontSize:"clamp(12px,1.3vw,14px)",color:"var(--text-muted)" }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="var(--accent)"}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="var(--text-muted)"}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-bold" style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:"var(--text)" }}>Contact</h4>
            <div className="flex flex-col gap-3">
              {[{k:"Phone",v:CONTACT.phone},{k:"Email",v:CONTACT.email},{k:"Location",v:CONTACT.address}].map(c=>(
                <div key={c.k}>
                  <span className="block mb-0.5" style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",color:"var(--accent)" }}>{c.k}</span>
                  <span style={{ fontSize:"clamp(12px,1.3vw,14px)",color:"var(--text-muted)",wordBreak:"break-all" }}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop:"1px solid var(--border)" }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(9px,1.1vw,11px)",color:"var(--text-muted)",letterSpacing:"1px",textAlign:"center" }}>© {year} Nexzellenz Technologies LLP. All rights reserved.</p>
          <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(9px,1.1vw,11px)",color:"var(--text-muted)",letterSpacing:"1px" }}>Crafting precision, one layer at a time <span style={{ color:"var(--accent2)" }}>◆</span> Est. 2021</p>
        </div>
      </div>
    </footer>
  );
}
