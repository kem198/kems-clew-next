export type WorkItem = {
  slug: string;
  title: string;
  date: string;
  src: string;
  width: number;
  height: number;
};

export type AlbumPhoto = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  [key: string]: unknown;
};
