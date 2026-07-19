"use client";

import { mapItemsToPhotos } from "@/lib/works";
import type { AlbumPhoto, WorkItem } from "@/types/work";
import { useMemo, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type WorksGalleryProps = {
  items: WorkItem[];
};

const columns = (containerWidth: number) => {
  if (containerWidth < 640) return 1;
  if (containerWidth < 768) return 2;
  if (containerWidth < 1024) return 3;
  return 4;
};

type GroupToggleProps = {
  groupByYear: boolean;
  onChange: (value: boolean) => void;
};

function GroupToggle({ groupByYear, onChange }: GroupToggleProps) {
  return (
    <fieldset className="mb-6 flex items-center gap-4">
      <legend className="sr-only">Grouping</legend>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="group"
          checked={!groupByYear}
          onChange={() => onChange(false)}
        />
        <span>All</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="group"
          checked={groupByYear}
          onChange={() => onChange(true)}
        />
        <span>By year</span>
      </label>
    </fieldset>
  );
}

type WorksAlbumProps = {
  photos: AlbumPhoto[];
  onClick: (index: number) => void;
};

function WorksAlbum({ photos, onClick }: WorksAlbumProps) {
  return (
    <PhotoAlbum
      layout="masonry"
      photos={photos}
      columns={columns}
      breakpoints={[640, 768, 1024]}
      onClick={({ index }: { index: number }) => onClick(index)}
    />
  );
}

type WorksLightboxProps = {
  index: number;
  slides: AlbumPhoto[];
  onClose: () => void;
};

function WorksLightbox({ index, slides, onClose }: WorksLightboxProps) {
  return (
    <Lightbox
      open={index >= 0}
      index={index}
      close={onClose}
      slides={slides.map((photo) => ({
        src: photo.display ?? photo.src,
      }))}
      controller={{
        closeOnBackdropClick: true,
      }}
      plugins={[Zoom]}
    />
  );
}

export function WorksGallery({ items }: WorksGalleryProps) {
  const [groupByYear, setGroupByYear] = useState(false);
  const [index, setIndex] = useState(-1);
  const [slides, setSlides] = useState<AlbumPhoto[]>([]);

  const photos = useMemo(() => mapItemsToPhotos(items), [items]);

  const groups = useMemo(() => {
    const grouped = new Map<number, WorkItem[]>();

    for (const item of items) {
      const year = new Date(item.date).getFullYear();

      if (!grouped.has(year)) {
        grouped.set(year, []);
      }

      grouped.get(year)!.push(item);
    }

    return [...grouped.entries()].sort((a, b) => b[0] - a[0]);
  }, [items]);

  const openLightbox = (photos: AlbumPhoto[], index: number) => {
    setSlides(photos);
    setIndex(index);
  };

  return (
    <>
      <GroupToggle groupByYear={groupByYear} onChange={setGroupByYear} />

      {!groupByYear ? (
        <WorksAlbum
          photos={photos}
          onClick={(index: number) => openLightbox(photos, index)}
        />
      ) : (
        <div className="space-y-10">
          {groups.map(([year, groupItems]) => {
            const groupPhotos = mapItemsToPhotos(groupItems);

            return (
              <section key={year}>
                <h2 className="mb-4 text-2xl font-bold">{year}</h2>

                <WorksAlbum
                  photos={groupPhotos}
                  onClick={(index: number) => openLightbox(groupPhotos, index)}
                />
              </section>
            );
          })}
        </div>
      )}

      <WorksLightbox
        index={index}
        slides={slides}
        onClose={() => setIndex(-1)}
      />
    </>
  );
}
