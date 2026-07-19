import { getWorks } from "@/utils/server/works.server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  try {
    const works = await getWorks();
    const found = works.find((w) => w.slug === slug);
    return NextResponse.json({ title: found?.title ?? slug });
  } catch {
    return NextResponse.json({ title: slug });
  }
}
