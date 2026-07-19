import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import { getFrontmatter } from "next-mdx-remote-client/utils";

import type { Note, NoteFrontmatter } from "@/types/note";

export async function getNotes(): Promise<Note[]> {
  const files = await readdir(NOTES_DIR);

  return Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const source = await readFile(join(NOTES_DIR, file), "utf-8");

        const { frontmatter } = getFrontmatter<NoteFrontmatter>(source);

        // ensure preview exists: use frontmatter.preview if present,
        // otherwise generate from the markdown body (first paragraph)
        let preview = frontmatter?.preview;
        if (!preview || preview.length === 0) {
          // strip frontmatter block from source to get body
          const body = source.replace(/^---[\s\S]*?---\s*/m, "");
          // get first non-empty paragraph
          const para =
            body
              .split(/\n\s*\n/)
              .map((p) => p.trim())
              .find((p) => p.length > 0) ?? "";

          // very small markdown-to-text conversion
          const text = para
            .replace(/\[(.*?)\]\([^\)]+\)/g, "$1") // links
            .replace(/[#>*`~\-\[\]]/g, "")
            .replace(/\n+/g, " ")
            .trim();

          const MAX = 50;
          if (text.length > MAX) {
            preview = text.slice(0, MAX).trimEnd() + "…";
          } else {
            preview = text;
          }
        }

        // ensure frontmatter.preview is set (types expect string)
        const fm = {
          ...(frontmatter as NoteFrontmatter),
          preview: preview ?? "",
        };

        return {
          slug: file.replace(/\.md$/, ""),
          frontmatter: fm,
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

import fs from "node:fs/promises";
import path from "node:path";

export type NoteIndexItem = {
  slug: string;
  title?: string;
  date?: string;
  lastmod?: string;
};

const NOTES_DIR = path.join(process.cwd(), "contents", "notes");

export async function getAllNotes(): Promise<NoteIndexItem[]> {
  const files = await fs.readdir(NOTES_DIR);
  const mdFiles = files.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const notes = await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(NOTES_DIR, file);
      const src = await fs.readFile(fullPath, "utf-8");
      const { frontmatter } = getFrontmatter<NoteFrontmatter>(src);
      return {
        slug,
        title: frontmatter?.title,
        date: frontmatter?.date,
        lastmod: frontmatter?.lastmod,
      };
    }),
  );

  // 必要なら日付順に
  notes.sort((a, b) => (a.date && b.date ? (a.date < b.date ? 1 : -1) : 0));
  return notes;
}
