import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Contact from "@/lib/models/contact";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const [projectCount, postCount, guestbookCount ] = await Promise.all([
      Project.countDocuments(),
      Contact.countDocuments(),
      Contact.find({}).sort({ createdAt: -1 }).limit(50)
    ]);

    return NextResponse.json({
      counts: {
        projects: projectCount,
        posts: postCount,
        guestbook: guestbookCount,
      },
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}