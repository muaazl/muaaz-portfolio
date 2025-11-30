// components/BucketItem.tsx
"use client";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface BucketProps {
  id: string;
  title: string;
  status: "not-started" | "in-progress" | "done";
}

export default function BucketItem({ title, status }: BucketProps) {

  return (
    <div 
      className={cn(
        "flex items-center gap-4 p-4 border rounded-lg transition-all",
        "bg-surface/30 border-white/5",
        status === "done" && "opacity-60"
      )}
    >
      <div className="shrink-0">
        {status === "not-started" && (
          <FaCircle className="text-muted-foreground/50 w-6 h-6" />
        )}
        {status === "in-progress" && (
          <div className="relative">
            <TbLoader2 className="text-accent-1 w-6 h-6 animate-spin" />
            <div className="absolute inset-0 bg-accent-1/20 blur-md rounded-full" />
          </div>
        )}
        {status === "done" && (
          <FaCheckCircle className="w-6 h-6 text-accent-2" />
        )}
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "text-lg font-medium",
          status === "done" ? "line-through text-muted-foreground" : "text-white"
        )}>
          {title}
        </span>
        <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mt-1">
          {status === "not-started" && "Pending"}
          {status === "in-progress" && <span className="text-accent-1">In Progress</span>}
          {status === "done" && <span className="text-accent-2">Completed</span>}
        </span>
      </div>
    </div>
  );
}