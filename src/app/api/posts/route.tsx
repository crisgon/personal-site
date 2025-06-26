import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const allPosts = getAllPosts();

  return NextResponse.json({ data: allPosts });
  // return NextResponse.json({ data: allPosts }, { status: 200 });
}
