import { FaGithub, FaTwitter, FaLinkedin, FaMapPin, FaDownload } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import SkillPower from "@/components/skill-power";
import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";
import Skill from "@/lib/models/skill";
import TimeStatus from "@/components/time-status";
import GitHubStats from "@/components/github-stats"; // Import 1
import TechMarquee from "@/components/tech-marquee"; // Import 2

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  await connectDB();
  const skills = await Skill.find({});

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Section 1: Header */}
      <div>
         <h1 className="text-4xl font-bold text-white mb-8">Character Stats</h1>
      </div>

      {/* Section 2: GitHub Stats Row (New) */}
      <section>
        <h3 className="text-xl font-bold text-white mb-4">Live Activity</h3>
        <GitHubStats />
      </section>
      
      {/* Section 3: Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Bio */}
        <div className="md:col-span-2 row-span-2 bg-surface/40 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-2/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-2xl font-bold text-white mb-4 relative z-10">The Operator</h2>
          <div className="space-y-4 text-muted-foreground text-lg relative z-10 leading-relaxed">
            <p>
              I'm Muaaz. Full-stack engineer. Creative technologist. 
              I build systems that look good and run fast.
            </p>
            <p>
              My philosophy is <strong>"Calm by default, powerful on demand."</strong> 
              I specialize in React ecosystems, but I'm comfortable diving into low-level systems when the need arises.
            </p>
          </div>
          <div className="mt-8 relative z-10">
            <Button className="bg-white text-black hover:bg-accent-1 hover:text-white font-bold transition-colors">
              <FaDownload className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-surface/40 border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent-1 to-accent-2 mb-4 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                 <span className="text-2xl font-bold text-white">ML</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">Muaaz Lattif</h3>
            <p className="text-accent-1 text-sm font-mono">Level 25 Dev</p>
        </div>

        {/* Time / Location */}
        <div className="bg-surface/40 border border-white/5 p-6 rounded-3xl flex flex-col justify-center items-start">
           <TimeStatus />
        </div>

        {/* Socials */}
        <div className="md:col-span-1 bg-surface/40 border border-white/5 p-6 rounded-3xl flex flex-col justify-center">
          <h3 className="text-white font-bold mb-4">Connect</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href="https://github.com" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"><FaGithub className="h-4 w-4"/> GitHub</a>
            <a href="https://twitter.com" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-accent-1 transition-colors"><FaTwitter className="h-4 w-4"/> Twitter</a>
            <a href="https://linkedin.com" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors"><FaLinkedin className="h-4 w-4"/> LinkedIn</a>
            <a href="mailto:email@me.com" className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors"><FiMail className="h-4 w-4"/> Email</a>
          </div>
        </div>

        {/* Skills */}
        <div className="md:col-span-3 bg-surface/40 border border-white/5 p-8 rounded-3xl">
          <h3 className="text-white font-bold mb-6">Skill Tree</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
             {skills.map((skill) => (
               <SkillPower key={skill._id} name={skill.name} percent={skill.percent} />
             ))}
          </div>
        </div>

      </div>

      {/* Section 4: Tech Marquee (New) */}
      <section className="pt-8">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Arsenal</h3>
        <TechMarquee />
      </section>
      
    </main>
  );
}
