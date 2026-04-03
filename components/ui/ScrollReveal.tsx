"use client";
// components/ui/ScrollReveal.tsx
// Wraps children in a div that fades + slides up when scrolled into view.

import { useInView } from "react-intersection-observer";
import { clsx } from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  threshold?: number;
}

const delayMap = {
  0: "",
  1: "reveal-delay-1",
  2: "reveal-delay-2",
  3: "reveal-delay-3",
  4: "reveal-delay-4",
};

export function ScrollReveal({ children, className, delay = 0, threshold = 0.1 }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  return (
    <div
      ref={ref}
      className={clsx("reveal", inView && "visible", delayMap[delay], className)}
    >
      {children}
    </div>
  );
}
