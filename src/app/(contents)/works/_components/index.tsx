"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mapItemsToPhotos } from "@/lib/works";
import type { AlbumPhoto, WorkItem } from "@/types/work";
import Image from "next/image";
import { useMemo, useState } from "react";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/rows.css";
import "react-photo-album/styles.css";
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
    <RadioGroup
      value={groupByYear ? "year" : "all"}
      onValueChange={(value) => onChange(value === "year")}
      className="flex items-center gap-6"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="all" id="group-all" />
        <Label htmlFor="group-all">すべて</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem value="year" id="group-year" />
        <Label htmlFor="group-year">年度ごとに表示</Label>
      </div>
    </RadioGroup>
  );
}

function renderNextImage(
  {
    alt = "",
    title,
    sizes,
  }: {
    alt?: string;
    title?: string;
    sizes?: string;
  },
  {
    photo,
    width,
    height,
  }: {
    photo: AlbumPhoto;
    width: number;
    height: number;
  },
) {
  return (
    <div
      className="overflow-hidden rounded border border-zinc-100"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        quality={80}
        className="object-cover"
      />
    </div>
  );
}

type WorksAlbumProps = {
  photos: AlbumPhoto[];
  onClick: (index: number) => void;
};

function WorksAlbum({ photos, onClick }: WorksAlbumProps) {
  return (
    <div className="not-prose">
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        columns={columns}
        breakpoints={[640, 768, 1024]}
        onClick={({ index }: { index: number }) => onClick(index)}

        render={{ image: renderNextImage }}
      />
    </div>
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
        src: photo.src,
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
    <div className="flex flex-col gap-8">
      <GroupToggle groupByYear={groupByYear} onChange={setGroupByYear} />

      {!groupByYear ? (
        <WorksAlbum
          photos={photos}
          onClick={(index: number) => openLightbox(photos, index)}
        />
      ) : (
        <div>
          {groups.map(([year, groupItems]) => {
            const groupPhotos = mapItemsToPhotos(groupItems);

            return (
              <section key={year}>
                <h2>{year}</h2>

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
    </div>
  );
}
