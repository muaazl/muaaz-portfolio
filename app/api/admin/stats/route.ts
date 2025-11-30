import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Post from "@/lib/models/post";
import Guestbook from "@/lib/models/guest-book";
import Contact from "@/lib/models/contact";
import Bucket from "@/lib/models/bucket";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const [projectCount, postCount, guestbookCount, bucketCount, contactCount, messages] = await Promise.all([
      Project.countDocuments(),
      Post.countDocuments(),
      Guestbook.countDocuments(),
      Bucket.countDocuments(),
      Contact.countDocuments(),
      Contact.find({}).sort({ createdAt: -1 }).limit(50)
    ]);

    return NextResponse.json({
      counts: {
        projects: projectCount,
        posts: postCount,
        guestbook: guestbookCount,
        bucket: bucketCount,
        messages: contactCount
      },
      messages: messages
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}