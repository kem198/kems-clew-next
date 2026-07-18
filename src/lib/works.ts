import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export type WorkItem = {
  slug: string;
  title: string;
  date: string; // ISO
  src: string; // public path
};

const WORKS_DIR = join(process.cwd(), "public", "assets", "works");

export async function getWorks(): Promise<WorkItem[]> {
  let files: string[] = [];
  try {
    files = await readdir(WORKS_DIR);
  } catch (e) {
    return [];
  }

  const imageExt = /\.(png|jpe?g|webp|gif|avif)$/i;

  const items = await Promise.all(
    files
      .filter((f) => imageExt.test(f))
      .map(async (file) => {
        const p = join(WORKS_DIR, file);
        const s = await stat(p);
        const slug = file.replace(/\.[^.]+$/, "");
        return {
          slug,
          title: slug,
          date: s.mtime.toISOString(),
          src: `/assets/works/${file}`,
        } as WorkItem;
      }),
  );

  // sort desc by date
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return items;
}
