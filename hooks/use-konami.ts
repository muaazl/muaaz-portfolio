"use client";
import { useEffect, useState } from "react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export function useKonami() {
  const [input, setInput] = useState<string[]>([]);
  const { play } = useSoundEffects();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);

      if (newInput.join("") === KONAMI_CODE.join("")) {
        play("achievement");
        setInput([]);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [input, play]);
}