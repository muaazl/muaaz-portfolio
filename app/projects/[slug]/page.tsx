import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaGithub, FaGlobe } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import KudosButton from "@/components/kudos-button";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";

export const dynamic = 'force-dynamic';

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  await connectDB();
  const project = await Project.findOne({ slug }).lean();

  const imageSrc = project.screenshots?.[0];
  const tags = project.tech || [];
  const highlights = project.tech || ["High Performance", "Responsive Design", "Interactive UI"];

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-5xl mx-auto">
      <Link 
        href="/projects" 
        className="inline-flex items-center text-muted hover:text-white transition-colors mb-12 group"
      >
        <FaArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white">{project.title}</h1>
          <p className="text-xl text-muted leading-relaxed">{project.shortDesc}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 bg-surface border border-white/10 text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5 hover:text-white">
                  <FaGithub className="h-4 w-4" /> Code
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 bg-white text-black hover:bg-gray-200 font-bold">
                  <FaGlobe className="h-4 w-4" /> Live Demo
                </Button>
              </a>
            )}
            <KudosButton slug={project.slug} initialLikes={project.likes || 0} />
          </div>
        </div>
      </div>
      <div className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden mb-16 border border-muted/20 bg-surface">
        <Image 
          src={imageSrc} 
          alt={project.title} 
          fill 
          className="object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-2xl font-semibold text-white">The Build</h2>
          <div className="text-muted-foreground leading-loose text-lg whitespace-pre-line">
            {project.details}
          </div>
        </div>
        <div className="bg-surface/30 p-8 rounded-lg border border-white/5 h-fit">
          <h3 className="text-white font-semibold mb-6">Tech Stack & Highlights</h3>
          <ul className="space-y-4">
            {highlights.map((item: string, i: number) => (
              <li key={i} className="flex items-start text-muted-foreground text-sm">
                <span className="mr-3 text-accent-1 font-mono">0{i+1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}