"use client";

import { mapItemsToPhotos } from "@/lib/works";
import type { WorkItem } from "@/types/work";
import { useMemo, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type WorksGalleryProps = {
  items: WorkItem[];
};

export function WorksGallery({ items }: WorksGalleryProps) {
  const [index, setIndex] = useState(-1);

  const photos = useMemo(() => mapItemsToPhotos(items), [items]);

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        columns={(containerWidth: number) => {
          if (containerWidth < 640) return 1;
          if (containerWidth < 768) return 2;
          if (containerWidth < 1024) return 3;
          return 4;
        }}
        breakpoints={[640, 768, 1024]}
        onClick={({ index }: { index: number }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map((photo) => ({
          src: photo.display ?? photo.src,
        }))}
      />
    </>
  );
}
