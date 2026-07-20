import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import ContentArea from "@/components/shared/content-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { getNotes, getNoteTags } from "@/utils/server/notes.server";
import Link from "next/link";

type NoteTagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export const dynamic = "force-static";

export async function generateStaticParams() {
  const notes = await getNotes();
  const tags = getNoteTags(notes);

  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

export default async function NoteTagPage({ params }: NoteTagPageProps) {
  const { tag } = await params;

  const notes = await getNotes();

  const filteredNotes = notes.filter((note) =>
    note.frontmatter.tags?.includes(tag),
  );

  const tags = getNoteTags(notes);

  return (
    <>
      <Breadcrumbs
        segments={[BreadcrumbSegment.notes, BreadcrumbSegment.tags]}
        title={`#${tag}`}
      />

      <div className="flex gap-6">
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

        <NoteSidebar tags={tags} />
      </div>
    </>
  );
}
