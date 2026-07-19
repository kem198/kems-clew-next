import Link from "next/link";

import { ContentArea } from "@/components/shared/content-area";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { withSiteName } from "@/lib/seo";
import { getNotes } from "@/utils/server/notes.server";

export const metadata = {
  title: withSiteName("Notes"),
};

export default async function NotesPage() {
  const notes = await (await getNotes()).reverse();

  return (
    <ContentArea full>
      <h1>Notes</h1>

      <ul className="not-prose flex flex-col gap-12">
        {notes.map((note) => (
          <li key={note.slug} className="flex flex-col gap-1">
            <span className={`${ubuntuSans.className} text-sm text-gray-400`}>
              {formatDateToYYYYMMDD(note.frontmatter.date)}
            </span>

            <div className="flex flex-col gap-0">
              <Link href={`/notes/${note.slug}`}>
                <span className="text-lg font-bold hover:underline">
                  {note.frontmatter.title}
                </span>
              </Link>

              {note.frontmatter.preview ? (
                <p className="text-sm text-gray-400">
                  {note.frontmatter.preview}
                </p>
              ) : null}
            </div>

            {/* TODO: タグで絞り込み可能にする */}
            {/* {<Tags tags={note.frontmatter.tags}></Tags>} */}
          </li>
        ))}
      </ul>
    </ContentArea>
  );
}
