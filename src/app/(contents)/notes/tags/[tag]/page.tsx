import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import ContentArea from "@/components/shared/content-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { getNotes } from "@/utils/server/notes.server";
import Link from "next/link";

type NoteTagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export const dynamic = "force-static";

export async function generateStaticParams() {
  const notes = await getNotes();

  const tags = new Set<string>();

  for (const note of notes) {
    for (const tag of note.frontmatter.tags ?? []) {
      tags.add(tag);
    }
  }

  return Array.from(tags).map((tag) => ({
    tag,
  }));
}

export default async function NoteTagPage({ params }: NoteTagPageProps) {
  const { tag } = await params;

  const notes = await getNotes();

  const filteredNotes = notes.filter((note) =>
    note.frontmatter.tags?.includes(tag),
  );

  return (
    <>
      {/* TODO: 階層を Notes > Tags > #aaa にする */}
      <Breadcrumbs segments={[BreadcrumbSegment.notes]} title={`#${tag}`} />

      <ContentArea>
        <h1>#{tag}</h1>

        <ul className="flex flex-col gap-4">
          {filteredNotes.map((note) => (
            <li key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="hover:underline">
                {note.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </ContentArea>
    </>
  );
}
