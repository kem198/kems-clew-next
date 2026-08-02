import manifest from "@/../public/assets/archives/manifest.json";
import { WORKS } from "@/constants/archive-metadata";
import type { AlbumPhoto, Archive, ArchiveSlug } from "@/types/archive";

type ManifestEntry = {
  src: string;
  width: number;
  height: number;
};

export function getArchives(): Archive[] {
  const archives = Object.entries(
    manifest as Record<string, ManifestEntry>,
  ).map(([slug, entry]) => {
    const metadata = WORKS[slug as ArchiveSlug];

    return {
      slug: slug as ArchiveSlug,

      title: metadata?.title,
      tags: metadata?.tags ?? [],

      src: entry.src,
      width: entry.width,
      height: entry.height,
    };
  });

  return archives.sort((a, b) =>
    b.slug.localeCompare(a.slug, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

export function mapArchivesToPhotos(archives: Archive[]): AlbumPhoto[] {
  return archives.map((archive) => ({
    src: archive.src,
    width: archive.width,
    height: archive.height,

    archive,
  }));
}

export function formatArchiveDescription(archive: Archive): string {
  const parts: string[] = [];

  if (archive.title) {
    parts.push(`${archive.title}`);
  }

  if (archive.tags.length > 0) {
    parts.push(archive.tags.map((tag) => `#${tag}`).join(" "));
  }

  parts.push(archive.slug.substring(0, 4));

  return parts.join(" | ");
}
