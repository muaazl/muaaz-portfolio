import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/5 bg-black/20 pt-16 pb-8 px-8 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white">Sitemap</h4>
          <Link href="/" className="text-sm text-muted-foreground hover:text-accent-1 transition-colors">Home</Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-accent-1 transition-colors">About</Link>
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-accent-1 transition-colors">Projects</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent-1 transition-colors">Contact</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white">Resources</h4>
          <Link href="/uses" className="text-sm text-muted-foreground hover:text-accent-1 transition-colors">/uses</Link>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white">More</h4>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white">System</h4>
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-accent-1 transition-colors">Admin</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-white/5 pt-8">
        <span className="text-xs text-muted-foreground">
          © 2025 Muaaz Lattif.
        </span>
      </div>
    </footer>
  );
}