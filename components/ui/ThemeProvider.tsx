"use client";
// components/ui/ThemeProvider.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wraps the app and manages dark/light theme state.
// - Reads saved preference from localStorage on first load
// - Falls back to OS/system preference (prefers-color-scheme)
// - Writes "light" class to <html> element (CSS vars handle the rest)
// - Exposes useTheme() hook so any component can read/toggle theme
// ─────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (t: Theme) => {
    const html = document.documentElement;
    if (t === "light") {
      html.classList.add("light");
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
      html.classList.remove("light");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("nexzellenz-theme") as Theme | null;
    const osPref: Theme = window.matchMedia("(prefers-color-scheme: light)")
      .matches
      ? "light"
      : "dark";

    const initial = saved ?? osPref;
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("nexzellenz-theme", next);
      return next;
    });
  }, []);

  if (!mounted) {
    return <div className="invisible">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
