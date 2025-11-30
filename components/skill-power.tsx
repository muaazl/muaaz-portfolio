"use client";
import { motion } from "framer-motion";

interface SkillProps {
  name: string;
  percent: number;
}

export default function SkillPower({ name, percent }: SkillProps) {
  
  return (
    <div className="mb-6 group">
      <div className="flex justify-between mb-2 font-mono text-sm">
        <span className="text-muted-foreground text-accent-1">
          {name}
        </span>
        <span className="text-foreground">
          {percent}%
        </span>
      </div>
      <div className="h-2 w-full bg-surface overflow-hidden rounded-full relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className={"h-full rounded-full relative bg-gradient-to-r from-accent-1 to-accent-2 shadow-[0_0_10px_#3aa0ff]"}
        >
          <motion.div
            animate={{ x: ["0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 h-full w-10 bg-white/50 skew-x-12 blur-sm"
          />
        </motion.div>
      </div>
    </div>
  );
}