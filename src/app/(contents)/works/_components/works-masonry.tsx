import type { WorkItem } from "@/types/work";
import type { Photo } from "react-photo-album";
import PhotoAlbum from "react-photo-album";

type Props = {
  items: WorkItem[];
  columns?: number;
  targetRowHeight?: number;
  onPhotoClick?: (photo: Photo) => void;
};

export default function WorksMasonry({
  items,
  columns = 3,
  targetRowHeight = 200,
  onPhotoClick,
}: Props) {
  const photos = items.map((it) => {
    const src = it.display?.src ?? it.thumb?.src ?? it.src;
    const width = it.display?.width ?? it.thumb?.width ?? 1;
    const height = it.display?.height ?? it.thumb?.height ?? 1;
    return {
      src,
      width: width ?? 1,
      height: height ?? 1,
      slug: it.slug,
      key: it.slug,
    } as unknown as Photo;
  });

  return (
    <PhotoAlbum
      layout="rows"
      photos={photos}
      targetRowHeight={targetRowHeight}
      columns={columns}
      onClick={(_event: any, photo: Photo) => onPhotoClick?.(photo)}
    />
  );
}
