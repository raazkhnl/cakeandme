"use client";

import { useEffect, useRef } from "react";

export function FlavorGlow() {
  const glow1 = useRef<HTMLDivElement>(null);
  const glow2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        if (glow1.current) glow1.current.style.transform = `translate3d(${x * 80}px, ${y * 80}px, 0)`;
      });
    };
    const onScroll = () => {
      if (glow2.current) {
        glow2.current.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={glow1}
        className="absolute -top-32 left-[55%] h-[700px] w-[700px] rounded-full opacity-70 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--surface-tint) / 0.22) 0%, hsl(var(--secondary) / 0.12) 45%, transparent 70%)"
        }}
      />
      <div
        ref={glow2}
        className="absolute top-[60%] -left-32 h-[600px] w-[600px] rounded-full opacity-60 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--secondary) / 0.16) 0%, hsl(var(--accent) / 0.10) 45%, transparent 70%)"
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.06), transparent 60%)"
        }}
      />
    </div>
  );
}
