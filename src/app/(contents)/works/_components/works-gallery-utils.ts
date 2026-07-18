import { WorkItem } from "@/types/work";

export type AlbumPhoto = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  display?: string;
  [key: string]: unknown;
};

export function mapItemsToPhotos(items: WorkItem[]): AlbumPhoto[] {
  return items.map((item) => ({
    src: item.thumb?.src ?? item.display?.src ?? item.src,
    width: item.thumb?.width ?? item.display?.width ?? 800,
    height: item.thumb?.height ?? item.display?.height ?? 600,
    alt: item.title,
    slug: item.slug,
    display: item.display?.src ?? item.src,
  }));
}
