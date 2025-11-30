"use client";
import { useEffect, useState } from "react";
import { useMode } from "@/hooks/use-mode";
import { useSoundEffects } from "@/hooks/use-sound-effects";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export function useKonami() {
  const [input, setInput] = useState<string[]>([]);
  const { toggleMode, mode } = useMode();
  const { play } = useSoundEffects();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);

      if (newInput.join("") === KONAMI_CODE.join("")) {
        if (mode === 'muaaz') {
          play("achievement");
          toggleMode(); // ACTIVATE SUPER MODE
        }
        setInput([]);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [input, toggleMode, mode, play]);
}