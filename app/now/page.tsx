import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
};

export default function NowPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Now</h1>
      <p className="text-muted mb-12 text-sm uppercase tracking-widest border-l-2 border-accent-1 pl-4">
        Last Updated: November 2025
      </p>

      <div className="prose prose-invert prose-lg">
        <h3 className="text-white">📍 Location</h3>
        <p className="text-muted-foreground">Currently based in Colombo, Sri Lanka.</p>

        <h3 className="text-white">💻 Building</h3>
        <p className="text-muted-foreground">
          Deep diving into **WebGPU** and **Rust**. Working on a SaaS for automated cloud infrastructure.
        </p>

        <h3 className="text-white">📚 Reading</h3>
        <ul className="text-muted-foreground list-disc pl-5">
          <li>&quot;Designing Data-Intensive Applications&quot; by Martin Kleppmann</li>
          <li>&quot;Snow Crash&quot; by Neal Stephenson</li>
        </ul>

        <h3 className="text-white">🏋️ Fitness</h3>
        <p className="text-muted-foreground">
          Training for a half-marathon. Current goal: Sub 2-hour pace.
        </p>
      </div>
    </main>
  );
}