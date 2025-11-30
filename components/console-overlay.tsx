"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  "> initializing connection...",
  "> loading neural modules...",
  "> ACCESS GRANTED.",
];

export default function ConsoleOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsVisible(false);
      return;
    }

    const typeInterval = setInterval(() => {
      setLineIndex((prev) => {
        if (prev < lines.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const finishTime = (lines.length * 600) + 800;

    const dismissTimeout = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasBooted", "true");
    }, finishTime);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(dismissTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-accent-1 font-mono text-xl sm:text-2xl"
        >
          <div className="flex flex-col gap-4 min-w-[300px]">
            {lines.slice(0, lineIndex + 1).map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-6 bg-accent-1 inline-block mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}