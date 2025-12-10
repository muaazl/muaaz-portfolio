import connectDB from "@/lib/db";
import Experience from "@/lib/models/experience";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
};

export const dynamic = 'force-dynamic';

export default async function ExperiencePage() {
  await connectDB();
  const jobs = await Experience.find({}).sort({ order: 1 });

  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-12">Career Timeline</h1>
      <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
        {jobs.map((job) => (
          <div key={job._id} className="relative pl-8 md:pl-12 group">
            <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent-1 ring-4 ring-background group-hover:bg-white transition-colors" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-2xl font-bold text-white">{job.role}</h3>
              <span className="text-sm font-mono text-accent-1 mt-1 sm:mt-0">{job.period}</span>
            </div>
            
            <div className="text-lg text-white/80 mb-2 font-medium">{job.company}</div>
            <p className="text-muted-foreground mb-4 max-w-xl leading-relaxed">
              {job.desc}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {job.stack.map((tech: string) => (
                <Badge key={tech} variant="outline" className="border-white/10 text-xs text-muted-foreground">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}