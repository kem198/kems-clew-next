export type WorkTag =
  | "engineering"
  | "original"
  | "fanart"
  | "parody"
  | "flipnote-studio"
  | "misc"
  | "axnos-paint";

export type WorkItem = {
  slug: string;
  title: string;
  date: string;
  src: string;
  width: number;
  height: number;
  tags: WorkTag[];
};

export type AlbumPhoto = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  [key: string]: unknown;
};
