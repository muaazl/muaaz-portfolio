import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project"; // Check casing: 'project' vs 'Project' depending on your filename

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }
    
    // Find and increment
    const project = await Project.findOneAndUpdate(
      { slug },
      { $inc: { likes: 1 } },
      { new: true } // Return the updated doc
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ likes: project.likes });
  } catch (e) {
    console.error("Kudos Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}