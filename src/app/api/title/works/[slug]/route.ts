import { getWorks } from "@/utils/server/works.server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  try {
    const works = await getWorks();
    const found = works.find((w) => w.slug === slug);
    return NextResponse.json({ title: found?.title ?? slug });
  } catch {
    return NextResponse.json({ title: slug });
  }
}
