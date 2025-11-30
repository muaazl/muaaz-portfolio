import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Guestbook from "@/lib/models/guest-book";

export async function GET() {
  await connectDB();
  const entries = await Guestbook.find({}).sort({ createdAt: -1 }).limit(50);
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, message } = await req.json();
    if (!name || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    
    const entry = await Guestbook.create({ name, message });
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  }
}