import manifest from "@/../public/assets/works/manifest.json";
import { WORKS } from "@/constants/work-metadata";
import type { AlbumPhoto, Work, WorkSlug } from "@/types/work";

type ManifestEntry = {
  src: string;
  width: number;
  height: number;
};

export function getWorks(): Work[] {
  const works = Object.entries(manifest as Record<string, ManifestEntry>).map(
    ([slug, entry]) => {
      const metadata = WORKS[slug as WorkSlug];

      return {
        slug: slug as WorkSlug,

        title: metadata?.title,
        tags: metadata?.tags ?? [],

        src: entry.src,
        width: entry.width,
        height: entry.height,
      };
    },
  );

  return works.sort((a, b) =>
    b.slug.localeCompare(a.slug, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

export function mapWorksToPhotos(works: Work[]): AlbumPhoto[] {
  return works.map((work) => ({
    src: work.src,
    width: work.width,
    height: work.height,

    work,
  }));
}

export function formatWorkDescription(work: Work): string {
  const parts: string[] = [];

  if (work.title) {
    parts.push(`${work.title}`);
  }

  if (work.tags.length > 0) {
    parts.push(work.tags.map((tag) => `#${tag}`).join(" "));
  }

  parts.push(work.slug.substring(0, 4));

  return parts.join(" | ");
}
