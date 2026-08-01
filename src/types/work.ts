import manifest from "@/../public/assets/works/manifest.json";

/**
 * 作品を一意に識別する ID
 */
export type WorkSlug = keyof typeof manifest;

export type WorkTag =
  | "original"
  | "fanart"
  | "parody"
  | "flipnote-studio"
  | "axnos-paint"
  | "analog"
  | "engineering";

/**
 * 一作品のモデル
 */
export type Work = {
  slug: WorkSlug;
  src: string;
  width: number;
  height: number;
  title?: string;
  tags: WorkTag[];
};

export type AlbumPhoto = {
  src: string;
  width: number;
  height: number;
  work: Work;
};
