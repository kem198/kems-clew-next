"use client";

import { useMemo, useState } from "react";
import type { Photo } from "react-photo-album";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { mapItemsToPhotos } from "@/lib/works";
import type { WorkItem } from "@/types/work";

type Props = {
  items: WorkItem[];
};

function GroupToggle({
  groupByYear,
  setGroupByYear,
}: {
  groupByYear: boolean;
  setGroupByYear: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={groupByYear}
          onChange={(e) => setGroupByYear(e.target.checked)}
        />
        <span>Group by year</span>
      </label>
    </div>
  );
}

function WorksMasonry({
  items,
  columns = 3,
  targetRowHeight = 200,
  onPhotoClick,
}: {
  items: WorkItem[];
  columns?: number;
  targetRowHeight?: number;
  onPhotoClick?: (photo: Photo) => void;
}) {
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
      onClick={(_event: unknown, photo: Photo) => onPhotoClick?.(photo)}
    />
  );
}

export default function WorksGallery({ items }: Props) {
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
              <h2 className="mb-4 text-lg font-semibold">{year}</h2>
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
