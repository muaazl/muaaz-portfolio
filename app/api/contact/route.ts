import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/lib/models/contact";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await Contact.create(body);
    return NextResponse.json({ message: "Message received" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to send message: ${error} ` }, { status: 500 });
  }
}