// components/Cursor.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMode } from "@/hooks/use-mode";
import { useKonami } from "@/hooks/use-konami";
import { cn } from "@/lib/utils"; // shadcn helper

export default function Cursor() {
  const { mode } = useMode();
  const [isVisible, setIsVisible] = useState(false);
  useKonami();
  
  // Motion values for smooth physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth delay (Lag effect)
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleHide = () => setIsVisible(false);
    const handleShow = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseenter", handleShow);
    window.addEventListener("mouseleave", handleHide);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", handleShow);
      window.removeEventListener("mouseleave", handleHide);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-cursor-styles", "");
    style.textContent = `
      body { cursor: none; }
      a, button, input { cursor: none; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* <style jsx global>{`
        body { cursor: none; }
        a, button, input { cursor: none; }
      `}</style> */}

      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference",
          !isVisible && "opacity-0"
        )}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Muaaz Mode: Simple Glow Dot */}
        {mode === "super" && (
          <div className="h-4 w-4 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
        )}
      </motion.div>
    </>
  );
}