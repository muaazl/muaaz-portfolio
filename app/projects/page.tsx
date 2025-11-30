import ProjectCard from "@/components/project-card";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Selected Works.
        </h1>
        <p className="text-muted text-lg max-w-2xl">
          A collection of experiments, products, and solutions engineered for performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project._id.toString()} className="h-[400px]">
            <ProjectCard 
              title={project.title}
              desc={project.shortDesc}
              tags={project.tech}
              image={project.screenshots[0]}
              slug={project.slug}
            />
          </div>
        ))}
      </div>
    </main>
  );
}