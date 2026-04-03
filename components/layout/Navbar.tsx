"use client";
// components/layout/Navbar.tsx — fully responsive + theme-aware
// React 19 / Next.js 15 compatible

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme }    from "@/components/ui/ThemeProvider";

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { label: "Services",  href: "/#services"  },
    { label: "Process",   href: "/#process"   },
    { label: "Gallery",   href: "/#gallery"   },
    { label: "About",     href: "/#about"     },
  ];

  const navBg    = isDark
    ? (scrolled ? "rgba(6,8,16,0.97)"      : "rgba(6,8,16,0.85)")
    : (scrolled ? "rgba(240,244,255,0.97)" : "rgba(240,244,255,0.85)");
  const mobileBg = isDark ? "#0b0f1a" : "#e4eaf8";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: "72px",
        background: navBg,
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container-x h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline flex-shrink-0">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" stroke="var(--accent)" strokeWidth="1.5"/>
            <polygon points="20,8 32,14.5 32,25.5 20,32 8,25.5 8,14.5" stroke="var(--accent)" strokeWidth="1" fill="rgba(0,229,255,0.05)"/>
            <circle cx="20" cy="20" r="4" fill="var(--accent)"/>
          </svg>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"2px", lineHeight:1.1, fontSize:"clamp(14px,2vw,18px)" }}>
            <span style={{ color:"var(--text)" }}>NEXZELLENZ</span><br/>
            <span style={{ color:"var(--accent)" }}>TECHNOLOGIES</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <ul className="flex items-center gap-6 lg:gap-10 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="no-underline transition-colors duration-200 relative group"
                  style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", color:"var(--text-muted)" }}>
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background:"var(--accent)" }} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/#contact"
              className="no-underline transition-all duration-300 whitespace-nowrap"
              style={{
                padding: "9px 20px",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--bg)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
            >
              Get Quote
            </Link>
          </div>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col justify-center gap-1.5 p-2 w-10 h-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="w-6 h-px block transition-all duration-300"
              style={{ background:"var(--accent)", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
            <span className="w-6 h-px block transition-all duration-300"
              style={{ background:"var(--accent)", opacity: menuOpen ? 0 : 1 }} />
            <span className="w-6 h-px block transition-all duration-300"
              style={{ background:"var(--accent)", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: mobileBg,
          borderBottom: menuOpen ? "1px solid var(--border)" : "none",
        }}
      >
        <ul className="flex flex-col list-none container-x py-6 gap-1">
          {[...links, { label: "Get Quote →", href: "/#contact" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setMenuOpen(false)}
                className="block py-3 no-underline border-b transition-colors duration-200"
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "13px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: l.label.includes("Quote") ? "var(--accent)" : "var(--text)",
                  borderColor: "var(--border-soft)",
                }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
