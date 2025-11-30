"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/hooks/use-mode";
import { useEffect, useState } from "react";

const lines = [
  "> activating systems...",
  "> syncing neural modules...",
  "> SUPER Muaaz Mode online.",
];

export default function ConsoleOverlay() {
  const { isBooting } = useMode();
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!isBooting) {
      return;
    }
    const interval = setInterval(() => {
      setLineIndex((prev) => {
        if (prev < lines.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isBooting]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background text-accent-1 font-mono text-xl"
        >
          <div className="flex flex-col gap-2">
            {lines.slice(0, lineIndex + 1).map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {line}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}