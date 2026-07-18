import Link from "next/link";

import { getNotes } from "@/lib/notes";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <>
      <h1>Notes</h1>

      <ul>
        {notes.map((note) => (
          <li key={note.slug}>
            <Link href={`/notes/${note.slug}`}>{note.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
