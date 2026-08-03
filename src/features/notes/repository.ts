import type { Note, NoteFrontmatter } from "@/features/notes/note";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { readdir, readFile } from "node:fs/promises";
import path, { join } from "node:path";

const NOTES_DIR = path.join(process.cwd(), "contents", "notes");

export async function getNotes(): Promise<Note[]> {
  const files = await readdir(NOTES_DIR);

  return Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
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
          slug: file.replace(/\.mdx$/, ""),
          frontmatter: fm,
          preview: preview ?? "",
        };
      }),
  );
}

export async function getNoteSource(slug: string) {
  return readFile(join(NOTES_DIR, `${slug}.mdx`), "utf-8");
}
