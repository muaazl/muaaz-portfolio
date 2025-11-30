"use client";
import { FaMusic } from "react-icons/fa";

export default function SpotifyFooter() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 bg-black/80 backdrop-blur-md p-2 pr-4 rounded-full border border-white/10 shadow-2xl">
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-spin-slow">
        <FaMusic className="w-4 h-4 text-black" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-white leading-none">Not Playing</span>
        <span className="text-[10px] text-muted-foreground leading-none">Spotify</span>
      </div>
    </div>
  );
}