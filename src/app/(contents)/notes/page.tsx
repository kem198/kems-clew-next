import Link from "next/link";

import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
import { Tags } from "@/components/shared/note-tag";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { withSiteName } from "@/lib/seo";
import { getSortedNotes } from "@/utils/server/notes.server";

export const metadata = {
  title: withSiteName("Notes"),
};

export default async function NotesPage() {
  const notes = await getSortedNotes("desc");

  const tags = Array.from(
    new Set(notes.flatMap((note) => note.frontmatter.tags ?? [])),
  ).sort();

  return (
    <>
      <Breadcrumbs segments={[BreadcrumbSegment.notes]} />
      <div className="flex gap-6">
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

                {/* TODO: タグで絞り込み可能にする */}
                <Tags tags={note.frontmatter.tags} />
              </li>
            ))}
          </ul>
        </ContentArea>

        <NoteSidebar tags={tags} />
      </div>
    </>
  );
}
