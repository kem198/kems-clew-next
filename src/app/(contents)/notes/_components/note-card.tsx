import { TagBadgeList } from "@/app/(contents)/notes/_components/note-tag";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { Note } from "@/types/note";
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

      <TagBadgeList tags={note.frontmatter.tags} />
    </article>
  );
}
