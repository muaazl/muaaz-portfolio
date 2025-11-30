import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Bucket from "@/lib/models/bucket";

export async function GET() {
  await connectDB();
  const items = await Bucket.find({});
  return NextResponse.json(items);
}

export async function PATCH(request: Request) {
  await connectDB();
  const { id, status } = await request.json();
  
  const updatedItem = await Bucket.findByIdAndUpdate(
    id, 
    { status }, 
    { new: true } 
  );
  
  return NextResponse.json(updatedItem);
}