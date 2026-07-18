"use client";

import type { WorkItem } from "@/lib/works";
import Image from "next/image";
import { useMemo, useState } from "react";
import PhotoAlbum, { type RenderPhotoProps } from "react-photo-album";

type Props = {
  items: WorkItem[];
};

export default function WorksGallery({ items }: Props) {
  const [groupByYear, setGroupByYear] = useState(false);

  const groups = useMemo(() => {
    const map = new Map<number, WorkItem[]>();
    for (const it of items) {
      const y = it.date ? new Date(it.date).getFullYear() : 0;
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(it);
    }
    // convert to sorted array of [year, items]
    const arr = Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
    return arr;
  }, [items]);

  return (
    <div>
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

      <div className="mt-6">
        {!groupByYear ? (
          <InlineMasonry items={items} />
        ) : (
          groups.map(([year, its]) => (
            <section key={year} className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">{year}</h2>
              <InlineMasonry items={its} />
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function InlineMasonry({ items }: { items: WorkItem[] }) {
  const photos = items.map((item) => ({
    src: item.thumb?.src ?? item.display?.src ?? item.src,
    width: item.thumb?.width ?? item.display?.width ?? 800,
    height: item.thumb?.height ?? item.display?.height ?? 600,
    alt: item.title,
    slug: item.slug,
    display: item.display?.src ?? item.src,
  }));

  type AlbumPhoto = {
    src: string;
    width: number;
    height: number;
    alt?: string;
    display?: string;
    [key: string]: unknown;
  };

  const renderPhoto = (props: RenderPhotoProps & { photo: AlbumPhoto }) => {
    const { photo, wrapperStyle } = props;
    const href = photo.display ?? photo.src;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={wrapperStyle}
        className="block"
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
      columns={3}
      photos={photos}
      renderPhoto={renderPhoto}
      targetRowHeight={300}
    />
  );
}
