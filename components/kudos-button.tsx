"use client";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export default function KudosButton({ slug, initialLikes }: { slug: string, initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (isLiked) return; // Prevent double spamming locally if you want

    // 1. Optimistic Update
    setLikes(prev => prev + 1);
    setIsLiked(true);

    // 2. Confetti
    const rect = document.getElementById("kudos-btn")?.getBoundingClientRect();
    const originX = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const originY = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: ['#00e1ff', '#ffffff']
    });

    // 3. API Call
    try {
      const res = await fetch("/api/kudos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      
      if (!res.ok) {
        throw new Error("Failed");
      }
      
      // Optional: Sync with server value just in case
      // const data = await res.json();
      // setLikes(data.likes);
    } catch (e) {
      console.error("Like failed", e);
      setLikes(prev => prev - 1); // Revert on error
      setIsLiked(false);
    }
  };

  return (
    <button 
      id="kudos-btn"
      onClick={handleLike}
      className={cn(
        "group flex items-center gap-2 bg-surface/50 border border-white/10 px-4 py-2 rounded-full transition-all active:scale-95 hover:border-accent-1/50",
        isLiked && "border-accent-1/50 bg-accent-1/10"
      )}
    >
      <FaHeart 
        className={cn(
          "w-5 h-5 transition-colors", 
          isLiked ? "fill-accent-1 text-accent-1" : "text-muted-foreground group-hover:text-white"
        )} 
      />
      <span className={cn(
        "font-mono text-sm",
        isLiked ? "text-accent-1" : "text-white"
      )}>{likes}</span>
    </button>
  );
}