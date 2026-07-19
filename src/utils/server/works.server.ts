import type { WorkItem } from "@/types/work";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const WORKS_DIR = join(process.cwd(), "public", "assets", "works");

type ManifestEntry = {
  src: string;
  width: number;
  height: number;
};

export async function getWorks(): Promise<WorkItem[]> {
  const manifest = JSON.parse(
    await readFile(join(WORKS_DIR, "manifest.json"), "utf8"),
  ) as Record<string, ManifestEntry>;

  const items: WorkItem[] = Object.entries(manifest).map(([slug, entry]) => {
    const match = slug.match(/^(\d{4})(\d{2})?(\d{2})?/);

    const date = match
      ? new Date(
          `${match[1]}-${match[2] ?? "01"}-${match[3] ?? "01"}T00:00:00.000Z`,
        ).toISOString()
      : new Date().toISOString();

    return {
      slug,
      title: slug,
      date,
      src: entry.src,
      width: entry.width,
      height: entry.height,
    };
  });

  items.sort((a, b) =>
    b.slug.localeCompare(a.slug, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  return items;
}
