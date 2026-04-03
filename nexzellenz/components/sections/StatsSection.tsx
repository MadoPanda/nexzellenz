"use client";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const STATS = [
  { number: "500+", label: "Projects Completed"    },
  { number: "200+", label: "Clients Served"        },
  { number: "4+",   label: "Years in Operation"    },
  { number: "PAN",  label: "India Service Network" },
];

function CountUp({ value }: { value: string }) {
  const elRef = useRef<HTMLSpanElement | null>(null);
  const { ref: inRef, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView || !elRef.current) return;
    const num = parseInt(value);
    if (isNaN(num)) { elRef.current.textContent = value; return; }
    const suffix = value.replace(/[0-9]/g, "");
    const dur = 1500, start = performance.now();
    const step = (ts: number) => {
      const p = Math.min((ts - start) / dur, 1);
      if (elRef.current) elRef.current.textContent = Math.floor(p * num) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else if (elRef.current) elRef.current.textContent = num + suffix;
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={el => { elRef.current = el; inRef(el); }} style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,5vw,64px)",lineHeight:1,color:"var(--accent)" }} />;
}

export function StatsSection() {
  return (
    <div className="relative z-10" style={{ borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)" }}>
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="py-8 sm:py-12 text-center flex flex-col items-center justify-center"
              style={{ borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none" }}>
              <CountUp value={s.number} />
              <div className="mt-1 px-2" style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(8px,1vw,11px)",letterSpacing:"2px",textTransform:"uppercase",color:"var(--text-muted)",lineHeight:1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
