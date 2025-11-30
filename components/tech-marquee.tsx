"use client";
import { cn } from "@/lib/utils";

const techs = [
  "React", "Next.js", "TypeScript", "Tailwind", "Node.js", "MongoDB", "Three.js", "Framer Motion", "PostgreSQL", "Docker", "AWS", "Figma", "Git"
];

export default function TechMarquee() {
  return (
    <div className="relative flex overflow-hidden w-full bg-surface/30 border-y border-white/5 py-8">
      {/* Gradient Masks to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />

      {/* The Moving Track */}
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Double the list to create seamless loop */}
        {[...techs, ...techs, ...techs].map((tech, i) => (
          <span
            key={i}
            className="mx-8 text-2xl font-bold text-muted-foreground/50 uppercase tracking-widest hover:text-white transition-colors cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}