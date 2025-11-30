import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Bucket from "@/lib/models/bucket";
import Post from "@/lib/models/post";
import Experience from "@/lib/models/experience";
import Skill from "@/lib/models/skill";

export async function GET() {
  try {
    await connectDB();

    await Promise.all([
      Project.deleteMany({}),
      Bucket.deleteMany({}),
      Post.deleteMany({}),
      Experience.deleteMany({}),
      Skill.deleteMany({})
    ]);

    // 2. SEED EXPERIENCE
    await Experience.create([
      {
        role: "Senior Frontend Engineer",
        company: "TechNova Corp",
        period: "2022 — Present",
        desc: "Spearheading the migration to Next.js 14. Reduced LCP by 40%. Leading a squad of 5 developers.",
        stack: ["React", "Next.js", "GraphQL"],
        order: 1
      },
      {
        role: "Full Stack Developer",
        company: "Creative Solutions",
        period: "2020 — 2022",
        desc: "Built scalable e-commerce platforms. Integrated Stripe & Algolia for seamless shopping experiences.",
        stack: ["Node.js", "MongoDB", "Vue"],
        order: 2
      }
    ]);

    // 3. SEED SKILLS
    await Skill.create([
      { name: "Frontend (React/Next)", percent: 95, category: "Dev" },
      { name: "Backend (Node/Go)", percent: 85, category: "Dev" },
      { name: "3D (Three.js/R3F)", percent: 75, category: "Creative" },
      { name: "DevOps (Docker/AWS)", percent: 60, category: "Ops" },
    ]);

    await Project.create([
      {
        title: "Neon Nexus",
        slug: "neon-nexus",
        shortDesc: "A cyber-aesthetic dashboard for monitoring server metrics in real-time.",
        details: "Built to visualize complex data streams with zero latency. I utilized React Three Fiber for the 3D topology map and a custom WebSocket layer for data ingestion. The challenge was maintaining 60fps while rendering 5000+ data points.",
        tech: ["Next.js", "Three.js", "WebSockets"],
        screenshots: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"],
        liveUrl: "https://example.com",
        featured: true
      },
      {
        title: "Zenith Commerce",
        slug: "zenith-commerce",
        shortDesc: "Headless e-commerce platform built for extreme performance.",
        details: "A fully headless approach using Shopify Storefront API. Implemented edge caching and optimistic UI updates to ensure the user never waits.",
        tech: ["Shopify API", "Redis", "Tailwind"],
        screenshots: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"],
        featured: true
      },
      {
        title: "Echo Chat",
        slug: "echo-chat",
        shortDesc: "End-to-end encrypted messaging app with ephemeral message support.",
        details: "Focused on privacy first. Uses Signal Protocol for encryption. No messages are stored on the server permanently.",
        tech: ["Socket.io", "MongoDB", "Node.js"],
        screenshots: ["https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop"],
        featured: false
      }
    ]);

    // 3. SEED BUCKET LIST
    await Bucket.create([
      { title: "Launch a SaaS Product", status: "in-progress", category: "Dev" },
      { title: "Visit Japan", status: "not-started", category: "Life" },
      { title: "Contribute to a major Open Source repo", status: "done", category: "Dev" },
      { title: "Deadlift 150kg", status: "in-progress", category: "Fitness" },
      { title: "Learn Rust", status: "not-started", category: "Dev" }
    ]);

    await Post.create({
      title: "The Art of Invisible UI",
      slug: "invisible-ui",
      excerpt: "Why the best interfaces are the ones you don't notice.",
      content: "# The Art of Invisible UI\n\nGood design is obvious. Great design is transparent...",
      tags: ["Design", "Philosophy"],
      publishedAt: new Date()
    });

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Seeding failed", details: error }, { status: 500 });
  }
}