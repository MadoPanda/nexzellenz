// components/sections/MarqueeSection.tsx
const items = ["FDM 3D Printing","SLA 3D Printing","3D Modeling","Rapid Prototyping","Product Design","Industrial Parts","Architectural Models","Custom Components"];

export function MarqueeSection() {
  const doubled = [...items,...items];
  return (
    <div className="marquee-wrapper overflow-hidden  py-5 relative z-10" style={{ borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)" }}>
      <div className="marquee-track">
        {doubled.map((item,i) => (
          <span key={i} className="flex items-center gap-5 flex-shrink-0"
            style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",letterSpacing:"3px",textTransform:"uppercase",color:"var(--text-muted)" }}>
            {item}
            <span style={{ color:"var(--accent)",fontSize:"8px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
