import { Note, NoteTagSummary } from "@/features/notes/note";

export function getSortedNotes(
  notes: Note[],
  order: "asc" | "desc" = "asc",
): Note[] {
  const sorted = notes
    .filter((n) => {
      const date = n.frontmatter?.date;
      const title = n.frontmatter?.title;
      const t = date ? new Date(date).getTime() : NaN;

      return typeof title === "string" && title.length > 0 && !Number.isNaN(t);
    })
    .slice()
    .sort((a, b) => {
      const ta = new Date(a.frontmatter.date).getTime();
      const tb = new Date(b.frontmatter.date).getTime();

      return ta - tb;
    });

  return order === "asc" ? sorted : sorted.reverse();
}

export function getLatestNotes(notes: Note[], count = 3): Note[] {
  return getSortedNotes(notes, "desc").slice(0, count);
}

export function getPrevNextNote(notes: Note[], slug: string) {
  const sorted = getSortedNotes(notes, "asc");

  const idx = sorted.findIndex((n) => n.slug === slug);

  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

export type NoteIndexItem = {
  slug: string;
  title?: string;
  tags: string[];
  date?: string;
  lastmod?: string;
};

export function getNoteTags(notes: Note[]): NoteTagSummary[] {
  const tagCounts = new Map<string, number>();

  for (const note of notes) {
    for (const tag of note.frontmatter.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
