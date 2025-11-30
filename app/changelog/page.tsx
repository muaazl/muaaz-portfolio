import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
};

const changes = [
  {
    version: "1.2.0",
    date: "2025-11-30",
    title: "The Super Update",
    items: [
      "Added /uses page for gear tracking.",
      "Implemented Guestbook with MongoDB.",
      "Added Konami Code easter egg.",
      "Integrated Tech Stack Marquee."
    ]
  },
  {
    version: "1.1.0",
    date: "2025-11-15",
    title: "Content Expansion",
    items: [
      "Launched Blog (Thought Buffer).",
      "Added Work Experience timeline.",
      "Refactored About page into Bento Grid."
    ]
  },
  {
    version: "1.0.0",
    date: "2025-11-01",
    title: "Initial Launch",
    items: [
      "Deployed 'Super Muaaz' Mode.",
      "3D Avatar integration.",
      "Project gallery setup."
    ]
  }
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Changelog</h1>
      <p className="text-muted mb-12">Tracking the evolution of this digital space.</p>

      <div className="space-y-12 relative border-l border-white/10 ml-4">
        {changes.map((log, i) => (
          <div key={i} className="pl-8 relative">
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-accent-1 rounded-full ring-4 ring-background" />
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-white">{log.version}</h2>
              <Badge variant="outline" className="w-fit border-white/20 text-muted-foreground">{log.date}</Badge>
            </div>
            
            <h3 className="text-xl font-semibold text-white/90 mb-4">{log.title}</h3>
            
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {log.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}