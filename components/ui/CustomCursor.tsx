"use client";
// components/ui/CustomCursor.tsx
// Hidden automatically on touch devices via CSS (pointer: coarse)

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Don't run on touch-only devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" ref={dotRef}
        style={{
          position: "fixed", width: 10, height: 10,
          background: "var(--accent)", borderRadius: "50%",
          pointerEvents: "none", zIndex: 9999,
          transform: "translate(-50%,-50%)",
          transition: "width 0.2s, height 0.2s",
          mixBlendMode: "difference",
        }}
      />
      <div id="custom-cursor-ring" ref={ringRef}
        style={{
          position: "fixed", width: 40, height: 40,
          border: "1px solid rgba(0,229,255,0.4)", borderRadius: "50%",
          pointerEvents: "none", zIndex: 9998,
          transform: "translate(-50%,-50%)",
        }}
      />
    </>
  );
}
