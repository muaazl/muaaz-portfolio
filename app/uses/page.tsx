import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses | Muaaz Lattif",
  description: "Hardware, software, and dream configurations.",
};

export default function UsesPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">/uses</h1>
        <p className="text-muted text-lg">
          The gear I use to build, the software I rely on, and the tech I dream of.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Hardware */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-accent-1 border-b border-white/10 pb-2">Battle Station</h2>
          <ul className="space-y-4">
            <ListItem title="Machine" desc="MacBook Pro M3 Max (16-inch, 64GB RAM)" />
            <ListItem title="Display" desc="LG 34WN80C-B UltraWide Monitor" />
            <ListItem title="Keyboard" desc="Keychron Q1 Pro (Red Switches)" />
            <ListItem title="Mouse" desc="Logitech MX Master 3S" />
            <ListItem title="Audio" desc="Sony WH-1000XM5" />
          </ul>
        </div>

        {/* Software */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-accent-1 border-b border-white/10 pb-2">Command Center</h2>
          <ul className="space-y-4">
            <ListItem title="Editor" desc="VS Code (One Dark Pro Theme)" />
            <ListItem title="Terminal" desc="Warp / Oh My Zsh" />
            <ListItem title="Browser" desc="Arc Browser" />
            <ListItem title="Notes" desc="Obsidian / Notion" />
            <ListItem title="Design" desc="Figma" />
          </ul>
        </div>

        {/* The Vision */}
        <div className="md:col-span-2 mt-8 p-8 rounded-2xl bg-surface/30 border border-dashed border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">The Dream Setup (Vision 2026)</h2>
          <p className="text-muted-foreground mb-6">
            The goal is to build a completely off-grid, solar-powered development studio. 
            High-speed Starlink connection, total silence, and pure code.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="p-4 bg-black/40 rounded-lg text-center border border-white/5">
                <span className="block text-accent-2 font-bold mb-1">Apple Vision Pro</span>
                <span className="text-xs text-muted-foreground">Spatial Computing</span>
             </div>
             <div className="p-4 bg-black/40 rounded-lg text-center border border-white/5">
                <span className="block text-accent-2 font-bold mb-1">NVIDIA H100</span>
                <span className="text-xs text-muted-foreground">Local LLM Training</span>
             </div>
             <div className="p-4 bg-black/40 rounded-lg text-center border border-white/5">
                <span className="block text-accent-2 font-bold mb-1">Herman Miller Embody</span>
                <span className="text-xs text-muted-foreground">Ergonomics</span>
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}

function ListItem({ title, desc }: { title: string; desc: string }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
      <span className="font-bold text-white min-w-[100px]">{title}</span>
      <span className="text-muted-foreground">{desc}</span>
    </li>
  );
}