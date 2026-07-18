import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import { getFrontmatter } from "next-mdx-remote-client/utils";

import type { Note, NoteFrontmatter } from "@/types/note";

const NOTES_DIR = join(process.cwd(), "src/contents/notes");

export async function getNotes(): Promise<Note[]> {
  const files = await readdir(NOTES_DIR);

  const notes = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const source = await readFile(join(NOTES_DIR, file), "utf-8");

        const { frontmatter } = getFrontmatter<NoteFrontmatter>(source);

        return {
          slug: file.replace(/\.md$/, ""),
          frontmatter,
        };
      }),
  );

  return notes;
}

export async function getNoteSource(slug: string): Promise<string> {
  return readFile(join(NOTES_DIR, `${slug}.md`), "utf-8");
}
