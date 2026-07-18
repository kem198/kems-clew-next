export type WorkItem = {
  slug: string;
  title: string;
  date: string; // ISO
  src: string; // public path
  thumb?: { src: string; width: number; height: number | null };
  display?: { src: string; width: number; height: number | null };
};

export type AlbumPhoto = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  display?: string;
  [key: string]: unknown;
};
