import { NoteCard } from "@/app/(contents)/notes/_components/note-card";
import type { Note } from "@/types/note";

type NoteListProps = {
  notes: Note[];
  className?: string;
};

export function NoteList({ notes, className }: NoteListProps) {
  return (
    <ul className={className ?? "not-prose flex flex-col gap-12"}>
      {notes.map((note) => (
        <li key={note.slug}>
          <NoteCard note={note} />
        </li>
      ))}
    </ul>
  );
}
