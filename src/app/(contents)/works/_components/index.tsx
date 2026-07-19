"use client";

import { mapItemsToPhotos } from "@/lib/works";
import { AlbumPhoto, WorkItem } from "@/types/work";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import PhotoAlbum, { RenderPhotoProps } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type GroupToggleProps = {
  groupByYear: boolean;
  setGroupByYear: (v: boolean) => void;
};

export function GroupToggle({ groupByYear, setGroupByYear }: GroupToggleProps) {
  return (
    <fieldset className="flex items-center gap-4">
      <legend className="sr-only">Grouping</legend>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="group"
          checked={!groupByYear}
          onChange={() => setGroupByYear(false)}
        />
        <span>All</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="group"
          checked={groupByYear}
          onChange={() => setGroupByYear(true)}
        />
        <span>Group by year</span>
      </label>
    </fieldset>
  );
}

type WorksMasonryProps = {
  items: WorkItem[];
  columns?: number | ((containerWidth: number) => number);
  targetRowHeight?: number;
  onPhotoClick?: (photo: AlbumPhoto) => void;
};

export function WorksMasonry({
  items,
  columns,
  targetRowHeight = 300,
  onPhotoClick,
}: WorksMasonryProps) {
  const photos = mapItemsToPhotos(items);

  const columnsProp =
    columns !== undefined
      ? columns
      : (containerWidth: number) =>
          containerWidth >= 1024 ? 3 : containerWidth >= 768 ? 2 : 1;

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
      <Link
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
          className="h-full w-full rounded-md border border-gray-200 object-cover"
        />
      </Link>
    );
  };

  return (
    <PhotoAlbum
      layout="masonry"
      columns={columnsProp}
      photos={photos}
      renderPhoto={renderPhoto}
      targetRowHeight={targetRowHeight}
    />
  );
}

type WorksGalleryProps = {
  items: WorkItem[];
};

export function WorksGallery({ items }: WorksGalleryProps) {
  const [groupByYear, setGroupByYear] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const flatPhotos = useMemo(() => mapItemsToPhotos(items), [items]);

  const handlePhotoClick = (photo: { [key: string]: unknown }) => {
    const idx = flatPhotos.findIndex(
      (p) =>
        p.slug === photo.slug &&
        (p.display ?? p.src) === (photo.display ?? photo.src),
    );
    if (idx >= 0) setOpenIndex(idx);
  };

  const groups = useMemo(() => {
    const map = new Map<number, WorkItem[]>();
    for (const it of items) {
      const y = it.date ? new Date(it.date).getFullYear() : 0;
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(it);
    }
    const arr = Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
    return arr;
  }, [items]);

  return (
    <div>
      <GroupToggle groupByYear={groupByYear} setGroupByYear={setGroupByYear} />

      <div className="mt-6">
        {!groupByYear ? (
          <WorksMasonry items={items} onPhotoClick={handlePhotoClick} />
        ) : (
          groups.map(([year, its]) => (
            <section key={year} className="mb-8">
              <div className="prose mb-4 max-w-none">
                <h2>{year}</h2>
              </div>
              <WorksMasonry items={its} onPhotoClick={handlePhotoClick} />
            </section>
          ))
        )}
      </div>

      <Lightbox
        open={openIndex !== null}
        index={openIndex ?? 0}
        slides={flatPhotos.map((p) => ({ src: p.display ?? p.src }))}
        close={() => setOpenIndex(null)}
      />
    </div>
  );
}
