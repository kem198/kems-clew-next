import type { AlbumPhoto, WorkItem } from "@/types/work";

export function mapItemsToPhotos(items: WorkItem[]): AlbumPhoto[] {
  return items.map((item) => ({
    src: item.src,
    width: item.width,
    height: item.height,
    alt: item.title,
    slug: item.slug,
  }));
}
