import manifest from "@/../public/assets/archives/manifest.json";

/**
 * 作品を一意に識別する ID
 */
export type ArchiveSlug = keyof typeof manifest;

/**
 * 作品のタグ
 */
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
