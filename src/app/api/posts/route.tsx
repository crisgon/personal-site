import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
  const allPosts = getAllPosts();

  return NextResponse.json({ data: allPosts });
}
