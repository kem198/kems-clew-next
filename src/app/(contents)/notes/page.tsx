import Link from "next/link";

import { Tags } from "@/components/shared/tags";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { getNotes } from "@/utils/server/notes.server";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <article className="prose">
      <h1>Notes</h1>

      <ul className="not-prose flex flex-col gap-2 bg-red-200">
        {notes.map((note) => (
          <li key={note.slug} className="bg-blue-200">
            <Link href={`/notes/${note.slug}`}>
              {formatDateToYYYYMMDD(note.frontmatter.date)}
              {note.frontmatter.title}
              {/* // TODO: 記事の本分プレビューを表示する */}
              {<Tags tags={note.frontmatter.tags}></Tags>}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
