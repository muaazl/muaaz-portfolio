// components/ProjectCard.tsx
"use client";
import { motion } from "framer-motion";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectProps {
  title: string;
  desc: string;
  tags: string[];
  image: string;
  slug: string;
}

export default function ProjectCard({ title, desc, tags, image, slug }: ProjectProps) {
  const { play } = useSoundEffects();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => play("hover")}
      className="h-full"
    >
      <Link href={`/projects/${slug}`}>
        <Card className="h-full overflow-hidden bg-surface border-muted/20 transition-all duration-300 hover:border-accent-1 hover:shadow-[0_0_20px_rgba(0,225,255,0.3)] hover:scale-[1.02]" >
          <div className="relative h-48 w-full overflow-hidden">
            <Image 
              src={image} 
              alt={title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 border-b-2 border-accent-2" />
          </div>
          <CardHeader>
            <CardTitle className="text-xl text-foreground flex justify-between items-center">
              {title}
              <span className="text-xs text-accent-2 font-mono">[SECURE]</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{desc}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-background/50 text-accent-2 border border-accent-2/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}