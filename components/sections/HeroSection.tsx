"use client";
import { Hero3D } from "@/components/ui/Hero3D";
import Link from "next/link";

const TAGLINE = "Est. 2021 — Precision Manufacturing India";
const LINE1 = "PRINT";
const LINE2 = "THE";
const LINE3 = "FUTURE";
const DESCRIPTION =
  "Nexzellenz Technologies LLP delivers cutting-edge 3D printing services, SLA precision manufacturing, and advanced 3D modeling solutions — transforming your concepts into tangible reality, nationwide.";
const STATS = [
  { number: "500+", label: "Projects Delivered" },
  { number: "4+", label: "Years Experience" },
  { number: "PAN", label: "India Delivery" },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden section-py"
      style={{ paddingTop: "clamp(96px,12vw,140px)" }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "clamp(300px,50vw,600px)",
          height: "clamp(300px,50vw,600px)",
          top: -100,
          right: -100,
          background:
            "radial-gradient(circle, rgba(0,229,255,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float-y 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "clamp(200px,35vw,400px)",
          height: "clamp(200px,35vw,400px)",
          bottom: 0,
          left: "10%",
          background:
            "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float-y 10s ease-in-out infinite 2s",
        }}
      />

      <div className="container-x relative z-10 w-full">
        <div className="max-w-4xl">
          <div
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 py-1.5 sm:px-4"
            style={{
              border: "1px solid var(--border)",
              background: "var(--border-soft)",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "clamp(9px,1.5vw,11px)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: "var(--accent)",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            {TAGLINE}
          </div>

          <h1
            className="mb-6 sm:mb-8"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(52px,12vw,140px)",
              lineHeight: 0.88,
              letterSpacing: "2px",
            }}
          >
            <span className="block" style={{ color: "var(--text)" }}>
              {LINE1}
            </span>
            <span className="block" style={{ color: "var(--accent)" }}>
              {LINE2}
            </span>
            <span
              className="block"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--border)",
              }}
            >
              {LINE3}
            </span>
          </h1>

          <p
            className="mb-8 sm:mb-12"
            style={{
              fontSize: "clamp(13px,1.8vw,16px)",
              lineHeight: 1.75,
              color: "var(--text-muted)",
              maxWidth: "min(480px,90%)",
            }}
          >
            {DESCRIPTION}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-cta-group flex flex-wrap items-center gap-3 sm:gap-5">
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 no-underline font-bold uppercase clip-chamfer transition-all duration-300"
                style={{
                  padding: "clamp(11px,1.5vw,14px) clamp(20px,3vw,32px)",
                  background: "var(--accent)",
                  color: "var(--bg)",
                  fontSize: "clamp(11px,1.3vw,13px)",
                  letterSpacing: "1px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow =
                    "var(--shadow-glow)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "none")
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Explore Services
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 no-underline font-semibold uppercase transition-all duration-300"
                style={{
                  padding: "clamp(11px,1.5vw,14px) clamp(20px,3vw,32px)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: "clamp(11px,1.3vw,13px)",
                  letterSpacing: "1px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text)";
                }}
              >
                Request a Quote
              </Link>
            </div>

            {/* Mobile stats */}
            <div className="grid grid-cols-3 gap-3 mt-10 xl:hidden">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--border-soft)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: "clamp(22px,5vw,32px)",
                      lineHeight: 1,
                      color: "var(--accent)",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "clamp(7px,1.5vw,10px)",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 3D element on the right — hidden on mobile, shown on desktop */}
          <div >
            <Hero3D />
          </div>
        </div>
        {/* Desktop stats */}
        <div className=" absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-right pr-5 overflow-hidden"
              style={{ borderRight: "2px solid var(--accent)" }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(36px,4vw,48px)",
                  lineHeight: 1,
                  color: "var(--accent)",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
