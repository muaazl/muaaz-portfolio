import Avatar3D from "@/components/avatar-3d";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl z-10 items-center">
        <div className="flex flex-col justify-center space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-muted-foreground">Muaaz.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted font-light max-w-lg leading-relaxed">
              I&apos;m a developer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">            
            <Link 
              href="/projects" 
              className="group flex items-center gap-2 text-muted hover:text-white transition-colors"
            >
              <span className="border-b border-transparent group-hover:border-accent-1">View Projects</span>
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="h-[400px] md:h-[600px] w-full flex items-center justify-center order-1 lg:order-2">
          <Avatar3D />
        </div>
      </section>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface/50 to-background opacity-80" />
    </main>
  );
}