"use client";

import { Howl } from "howler";
import { useEffect, useRef } from "react";

type SoundType = "toggle" | "hover" | "achievement" | "boot";

export const useSoundEffects = () => {
  const sounds = useRef<Record<SoundType, Howl | null>>({
    toggle: null,
    hover: null,
    achievement: null,
    boot: null,
  });

  useEffect(() => {
    sounds.current.toggle = new Howl({ src: ["/sounds/toggle.mp3"], volume: 0.1 });
    sounds.current.hover = new Howl({ src: ["/sounds/hover.mp3"], volume: 0.05 });
    sounds.current.achievement = new Howl({ src: ["/sounds/achievement.mp3"], volume: 0.2 });
    sounds.current.boot = new Howl({ src: ["/sounds/boot.mp3"], volume: 0.3 });

    const currentSounds = sounds.current;

    return () => {
      Object.values(currentSounds).forEach((sound) => sound?.unload());
    };
  }, []);

  const play = (type: SoundType) => {
    sounds.current[type]?.play();
  };

  return { play };
};