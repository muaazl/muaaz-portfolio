"use client";
import { useEffect, useRef } from "react";
import { useMode } from "@/hooks/use-mode";
import gsap from "gsap";

export default function CircuitBackground() {
  const { mode } = useMode();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Logic: If mode is SUPER, animate lines. If MUAAZ, fade them out.
      if (mode === "super") {
        gsap.to(".circuit-line", {
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.1,
          ease: "power2.inOut",
          opacity: 1
        });
      } else {
        gsap.to(".circuit-line", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.set(".circuit-line", { strokeDashoffset: 1000 });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mode]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Define Gradient */}
        <defs>
          <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e1ff" /> 
            <stop offset="100%" stopColor="#3aa0ff" />
          </linearGradient>
        </defs>

        {/* Circuit Lines (Paths) */}
        {/* Top Right */}
        <path className="circuit-line" d="M100 0 L 80 20 L 80 50" fill="none" stroke="url(#circuit-grad)" strokeWidth="0.2" strokeDasharray="1000" strokeDashoffset="1000" opacity="0" />
        <path className="circuit-line" d="M100 10 L 90 20 L 90 40 L 100 50" fill="none" stroke="url(#circuit-grad)" strokeWidth="0.1" strokeDasharray="1000" strokeDashoffset="1000" opacity="0" />
        
        {/* Bottom Left */}
        <path className="circuit-line" d="M0 100 L 20 80 L 20 50" fill="none" stroke="url(#circuit-grad)" strokeWidth="0.2" strokeDasharray="1000" strokeDashoffset="1000" opacity="0" />
        <path className="circuit-line" d="M0 90 L 10 80 L 10 60 L 0 50" fill="none" stroke="url(#circuit-grad)" strokeWidth="0.1" strokeDasharray="1000" strokeDashoffset="1000" opacity="0" />
        
        {/* Center Cross */}
        <path className="circuit-line" d="M40 0 L 40 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.05" strokeDasharray="1000" strokeDashoffset="1000" opacity="0" />
        <path className="circuit-line" d="M0 40 L 100 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.05" strokeDasharray="1000" strokeDashoffset="1000" opacity="0" />
      </svg>
    </div>
  );
}