"use client";

import type { WorkItem } from "@/lib/works";
import Image from "next/image";
import PhotoAlbum, { type RenderPhotoProps } from "react-photo-album";
import { mapItemsToPhotos, type AlbumPhoto } from "./works-gallery-utils";

type Props = {
  items: WorkItem[];
  columns?: number;
  targetRowHeight?: number;
  onPhotoClick?: (photo: AlbumPhoto) => void;
};

export default function InlineMasonry({
  items,
  columns = 3,
  targetRowHeight = 300,
  onPhotoClick,
}: Props) {
  const photos = mapItemsToPhotos(items);

  const renderPhoto = (props: RenderPhotoProps & { photo: AlbumPhoto }) => {
    const { photo, wrapperStyle } = props;
    const href = photo.display ?? photo.src;

    const handleClick = (e: React.MouseEvent) => {
      if (onPhotoClick) {
        e.preventDefault();
        onPhotoClick(photo);
      }
    };

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={wrapperStyle}
        className="block"
        onClick={handleClick}
      >
        <Image
          src={photo.src}
          alt={String(photo.alt ?? "")}
          width={photo.width}
          height={photo.height}
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="h-full w-full rounded object-cover"
        />
      </a>
    );
  };

  return (
    <PhotoAlbum
      layout="masonry"
      columns={columns}
      photos={photos}
      renderPhoto={renderPhoto}
      targetRowHeight={targetRowHeight}
    />
  );
}
