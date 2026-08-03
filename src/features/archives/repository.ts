import manifest from "@/../public/assets/archives/manifest.json";
import type { Archive, ArchiveSlug } from "@/features/archives/archive";
import { WORKS } from "@/features/archives/constants";

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

export type AlbumPhoto = {
  src: string;
  width: number;
  height: number;
  archive: Archive;
};

export function mapArchivesToPhotos(archives: Archive[]): AlbumPhoto[] {
  return archives.map((archive) => ({
    src: archive.src,
    width: archive.width,
    height: archive.height,

    archive,
  }));
}
