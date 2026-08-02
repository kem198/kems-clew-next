import manifest from "@/../public/assets/archives/manifest.json";

/**
 * 作品を一意に識別する ID
 */
export type ArchiveSlug = keyof typeof manifest;

export type ArchiveTag =
  "original" | "fanart" | "parody" | "animation" | "analog" | "engineering";

/**
 * 一作品のモデル
 */
export type Archive = {
  slug: ArchiveSlug;
  src: string;
  width: number;
  height: number;
  title?: string;
  tags: ArchiveTag[];
};

export type AlbumPhoto = {
  src: string;
  width: number;
  height: number;
  archive: Archive;
};
