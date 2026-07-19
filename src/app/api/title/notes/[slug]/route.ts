import { getNoteSource } from "@/utils/server/notes.server";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  try {
    const src = await getNoteSource(slug);
    const { frontmatter } = getFrontmatter<{ title?: string }>(src);
    return NextResponse.json({ title: frontmatter?.title ?? slug });
  } catch {
    return NextResponse.json({ title: slug });
  }
}
