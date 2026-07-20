import Link from "next/link";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
import { Tag, Tags } from "@/components/shared/note-tag";
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

  const tagCounts = new Map<string, number>();

  for (const note of notes) {
    for (const tag of note.frontmatter.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const tags = Array.from(tagCounts.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <>
      <Breadcrumbs segments={[BreadcrumbSegment.notes]} />
      <ContentArea>
        <h1>Notes</h1>

        <div className="not-prose flex flex-col gap-2">
          <h2 className="text-lg font-bold">Tags</h2>

          <ul className="flex flex-wrap gap-2 text-cyan-600">
            {tags.map(([tag, count]) => (
              <li key={tag}>
                <Tag tag={tag} /> ({count})
              </li>
            ))}
          </ul>
        </div>

        <ul className="not-prose flex flex-col gap-12">
          {notes.map((note) => (
            <li key={note.slug} className="flex flex-col gap-2">
              <span className={`${ubuntuSans.className} text-sm text-gray-400`}>
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
    </>
  );
}
