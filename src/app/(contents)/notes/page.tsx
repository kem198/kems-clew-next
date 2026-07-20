import Link from "next/link";

import { NotePageLayout } from "@/app/(contents)/notes/_components/note-page-layout";
import { TagBadgeList } from "@/app/(contents)/notes/_components/note-tag";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { withSiteName } from "@/lib/seo";
import {
  getNotes,
  getNoteTags,
  getSortedNotes,
} from "@/utils/server/notes.server";

export const metadata = {
  title: withSiteName("Notes"),
};

export default async function NotesPage() {
  const allNotes = await getNotes();
  const notes = getSortedNotes(allNotes, "desc");
  const tags = getNoteTags(notes);

  return (
    <>
      <Breadcrumbs segments={[BreadcrumbSegment.notes]} />
      <NotePageLayout tagCloud={tags}>
        <ContentArea>
          <h1>Notes</h1>

          <ul className="not-prose flex flex-col gap-12">
            {notes.map((note) => (
              <li key={note.slug} className="flex flex-col gap-2">
                <span
                  className={`${ubuntuSans.className} text-sm text-gray-400`}
                >
                  {formatDateToYYYYMMDD(note.frontmatter.date)}
                </span>

                <div className="flex flex-col gap-1">
                  <Link href={`/notes/${note.slug}`}>
                    <span className="text-primary/90 text-xl font-bold hover:underline">
                      {note.frontmatter.title}
                    </span>
                  </Link>

                  {note.preview ? (
                    <p className="text-sm text-gray-400">{note.preview}</p>
                  ) : null}
                </div>
                <TagBadgeList tags={note.frontmatter.tags} />
              </li>
            ))}
          </ul>
        </ContentArea>
      </NotePageLayout>
    </>
  );
}
