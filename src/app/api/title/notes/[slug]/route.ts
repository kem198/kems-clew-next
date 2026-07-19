import { getNoteSource } from "@/utils/server/notes.server";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  try {
    const src = await getNoteSource(slug);
    const { frontmatter } = getFrontmatter<{ title?: string }>(src);
    return NextResponse.json({ title: frontmatter?.title ?? slug });
  } catch {
    return NextResponse.json({ title: slug });
  }
}
