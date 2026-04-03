import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Brand colours ──────────────────────────────────────────────────────
      colors: {
        bg: {
          DEFAULT: "#060810",
          2: "#0b0f1a",
          3: "#111828",
        },
        accent: {
          cyan: "#00e5ff",
          orange: "#ff6b00",
          purple: "#7c3aed",
        },
        text: {
          DEFAULT: "#e8eaf0",
          muted: "#7a8099",
        },
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },

      // ── Animations ─────────────────────────────────────────────────────────
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.5)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-medium": "spin 30s linear infinite reverse",
        "spin-fast": "spin 40s linear infinite",
        pulse: "pulse 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.7s ease forwards",
        "gradient-shift": "gradientShift 6s ease infinite",
      },

      // ── Shadows / Glows ────────────────────────────────────────────────────
      boxShadow: {
        "glow-cyan": "0 0 40px rgba(0,229,255,0.25)",
        "glow-orange": "0 0 40px rgba(255,107,0,0.25)",
        "glow-purple": "0 0 40px rgba(124,58,237,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
