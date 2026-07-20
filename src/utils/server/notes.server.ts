import type { Note, NoteFrontmatter, NoteTag } from "@/types/note";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { readdir, readFile } from "node:fs/promises";
import path, { join } from "node:path";

export async function getNotes(): Promise<Note[]> {
  const files = await readdir(NOTES_DIR);

  return Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const source = await readFile(join(NOTES_DIR, file), "utf-8");

        const { frontmatter } = getFrontmatter<NoteFrontmatter>(source);

        // strip frontmatter block from source to get body
        const body = source.replace(/^---[\s\S]*?---\s*/m, "");

        // get first non-empty paragraph
        const firstParagraph =
          body
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .find((p) => p.length > 0) ?? "";

        const text = firstParagraph
          .replace(/\[(.*?)\]\([^\)]+\)/g, "$1") // links
          .replace(/[#>*`~\-\[\]]/g, "")
          .replace(/\n+/g, " ")
          .trim();

        const MAX = 50;
        const preview =
          text.length > MAX ? text.slice(0, MAX).trimEnd() + "…" : text;

        // ensure frontmatter.preview is set (types expect string)
        const fm = {
          ...(frontmatter as NoteFrontmatter),
          tags: Array.isArray(frontmatter?.tags) ? frontmatter.tags : [],
        };

        return {
          slug: file.replace(/\.md$/, ""),
          frontmatter: fm,
          preview: preview ?? "",
        };
      }),
  );
}

export async function getNoteSource(slug: string) {
  return readFile(join(NOTES_DIR, `${slug}.md`), "utf-8");
}

export async function getSortedNotes(order: "asc" | "desc" = "asc") {
  const all = await getNotes();
  const notes = all.filter((n) => {
    const date = n.frontmatter?.date;
    const title = n.frontmatter?.title;
    const t = date ? new Date(date).getTime() : NaN;
    return typeof title === "string" && title.length > 0 && !Number.isNaN(t);
  });

  const sorted = notes.slice().sort((a, b) => {
    const ta = new Date(a.frontmatter.date).getTime();
    const tb = new Date(b.frontmatter.date).getTime();
    return ta - tb;
  });

  return order === "asc" ? sorted : sorted.reverse();
}

export async function getLatestNotes(count = 3) {
  const sortedDesc = await getSortedNotes("desc");
  return sortedDesc.slice(0, count);
}

export async function getPrevNextNote(slug: string) {
  const sorted = await getSortedNotes("asc");
  const idx = sorted.findIndex((n) => n.slug === slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

  return { prev, next };
}

export type NoteIndexItem = {
  slug: string;
  title?: string;
  tags: string[];
  date?: string;
  lastmod?: string;
};

const NOTES_DIR = path.join(process.cwd(), "contents", "notes");

export function getNoteTags(notes: Note[]): NoteTag[] {
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
