import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";

export async function GET() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 });
  return NextResponse.json(projects);
}