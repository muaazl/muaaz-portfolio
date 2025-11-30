// components/BucketItem.tsx
"use client";
import { useState } from "react";
import { useMode } from "@/hooks/use-mode";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import confetti from "canvas-confetti";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface BucketProps {
  id: string;
  title: string;
  status: "not-started" | "in-progress" | "done";
}

export default function BucketItem({ id, title, status: initialStatus }: BucketProps) {
  const [status, setStatus] = useState(initialStatus);
  const { mode } = useMode();
  const { play } = useSoundEffects();

  // Update the existing handleToggle in BucketItem.tsx
  const handleToggle = async () => {
    const next = status === "not-started" ? "in-progress" : status === "in-progress" ? "done" : "not-started";
    setStatus(next);

    // Optimistic UI update done above. Now sync with server:
    try {
      await fetch('/api/bucket', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: next })
      });
    } catch (error) {
      console.error(`Failed to save status: ${error}`);
    }

    // Visual effects
    if (next === "done") {
      play("achievement");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: mode === "super" ? ['#ff2d55', '#3aa0ff'] : ['#ffffff']
      });
    } else {
      play("toggle");
    }
  };

  return (
    <div 
      onClick={handleToggle}
      className={cn(
        "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all",
        "hover:bg-surface border-muted/10",
        mode === "super" && status === "done" && "border-accent-2/50 bg-accent-2/5"
      )}
    >
      <div className="shrink-0">
        {status === "not-started" && <FaCircle className="text-muted w-6 h-6" />}
        {status === "in-progress" && <TbLoader2 className="text-accent-2 w-6 h-6 animate-spin" />}
        {status === "done" && <FaCheckCircle className={cn("w-6 h-6", mode === "super" ? "text-accent-1" : "text-green-500")} />}
      </div>
      
      <span className={cn(
        "text-lg font-medium",
        status === "done" && "line-through text-muted-foreground"
      )}>
        {title}
      </span>
    </div>
  );
}