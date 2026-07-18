import type { WorkItem } from "@/types/work";
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const WORKS_DIR = join(process.cwd(), "public", "assets", "works");

export async function getWorks(): Promise<WorkItem[]> {
  let files: string[] = [];
  try {
    files = await readdir(WORKS_DIR);
  } catch {
    return [];
  }

  type ManifestEntry = {
    thumb?: string;
    thumbWidth?: number;
    thumbHeight?: number | null;
    display?: string;
    displayWidth?: number;
    displayHeight?: number | null;
  };
  let manifest: Record<string, ManifestEntry> = {};
  try {
    const m = await readFile(join(WORKS_DIR, "manifest.json"), "utf8");
    manifest = JSON.parse(m);
  } catch {
    // manifest not present — continue
  }

  const imageExt = /\.(png|jpe?g|webp|gif|avif)$/i;

  let items: WorkItem[] = [];

  if (Object.keys(manifest).length > 0) {
    items = await Promise.all(
      Object.keys(manifest).map(async (slug) => {
        const entry = manifest[slug] as ManifestEntry;

        let date: string | undefined;
        const m = slug.match(/^(\d{4})(\d{2})?(\d{2})?/);
        if (m) {
          const y = m[1];
          const mo = m[2] ?? "01";
          const d = m[3] ?? "01";
          date = new Date(`${y}-${mo}-${d}T00:00:00.000Z`).toISOString();
        } else if (entry.display) {
          try {
            const displayRel = entry.display.replace(/^\/assets\/works\//, "");
            const s = await stat(join(WORKS_DIR, displayRel));
            date = s.mtime.toISOString();
          } catch {
            // ignore
          }
        }

        if (!date) date = new Date().toISOString();

        const displaySrc = entry.display ?? entry.thumb ?? "";
        const thumbSrc = entry.thumb ?? entry.display ?? "";

        const item: WorkItem = {
          slug,
          title: slug,
          date,
          src: displaySrc,
          thumb: thumbSrc
            ? {
                src: thumbSrc,
                width: entry.thumbWidth ?? 0,
                height: entry.thumbHeight ?? null,
              }
            : undefined,
          display: entry.display
            ? {
                src: entry.display,
                width: entry.displayWidth ?? 0,
                height: entry.displayHeight ?? null,
              }
            : undefined,
        };

        return item;
      }),
    );
  } else {
    items = await Promise.all(
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
  }

  items.sort((a, b) =>
    b.slug.localeCompare(a.slug, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  return items;
}
