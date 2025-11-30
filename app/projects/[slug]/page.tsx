import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaGithub, FaGlobe } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // You might need to npx shadcn-ui@latest add button
import KudosButton from "@/components/kudos-button";

// Mock data lookup (Replace with DB fetch later)
const getProject = async (slug: string) => {
  const projects = [
    {
      title: "Neon Nexus",
      slug: "neon-nexus",
      shortDesc: "A cyber-aesthetic dashboard for monitoring server metrics in real-time.",
      details: "Built to visualize complex data streams with zero latency. I utilized React Three Fiber for the 3D topology map and a custom WebSocket layer for data ingestion. The challenge was maintaining 60fps while rendering 5000+ data points.",
      tags: ["Next.js", "Three.js", "WebSockets"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      bullets: ["Real-time 3D data visualization", "Sub-20ms latency updates", "Custom dark mode UI system"],
      likes: 128,
    },
    {
      title: "Project Alpha",
      slug: slug,
      shortDesc: "Generic project description for demo purposes.",
      details: "This is a placeholder for dynamic content. In the real app, this would fetch from MongoDB.",
      tags: ["Demo", "React"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      bullets: ["Feature One", "Feature Two", "Feature Three"],
      likes: 42,
    }
  ];
  return projects.find(p => p.slug === slug) || projects[1];
};

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const project = await getProject(resolvedParams.slug);

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-5xl mx-auto">
      {/* Back Link */}
      <Link 
        href="/projects" 
        className="inline-flex items-center text-muted hover:text-white transition-colors mb-12 group"
      >
        <FaArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </Link>

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white">{project.title}</h1>
          <p className="text-xl text-muted leading-relaxed">{project.shortDesc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="outline" className="gap-2">
              <FaGithub className="h-4 w-4" /> Code
            </Button>
            <Button className="gap-2 bg-white text-black hover:bg-gray-200">
              <FaGlobe className="h-4 w-4" /> Live Demo
            </Button>
            <KudosButton slug={project.slug} initialLikes={project.likes} />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden mb-16 border border-muted/20">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* Deep Dive Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-2xl font-semibold text-white">The Build</h2>
          <p className="text-muted-foreground leading-loose text-lg">
            {project.details}
          </p>
        </div>
        
        <div className="bg-surface p-8 rounded-lg border border-muted/10 h-fit">
          <h3 className="text-white font-semibold mb-6">Key Highlights</h3>
          <ul className="space-y-4">
            {project.bullets.map((item, i) => (
              <li key={i} className="flex items-start text-muted-foreground text-sm">
                <span className="mr-3 text-accent-1">0{i+1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}