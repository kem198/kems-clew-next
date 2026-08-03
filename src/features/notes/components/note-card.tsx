import { NoteTagList } from "@/features/notes/components/note-tags";
import type { Note } from "@/features/notes/note";
import { ubuntuSans } from "@/shared/constants/fonts";
import { cn } from "@/shared/lib/cn";
import { formatDateToYYYYMMDD } from "@/shared/lib/date";
import Link from "next/link";

export type NoteCardProps = {
  note: Note;
  className?: string;
};

export function NoteCard({ note, className }: NoteCardProps) {
  return (
    <article className={cn("flex flex-col gap-1", className)}>
      <span className={`${ubuntuSans.className} text-sm text-zinc-400`}>
        {formatDateToYYYYMMDD(note.frontmatter.date)}
      </span>

      <Link href={`/notes/${note.slug}`}>
        <span className="text-primary/90 text-xl font-bold hover:underline">
          {note.frontmatter.title}
        </span>
      </Link>

      {note.preview ? (
        <p className="text-sm text-zinc-400">{note.preview}</p>
      ) : null}

      <NoteTagList tags={note.frontmatter.tags} />
    </article>
  );
}
