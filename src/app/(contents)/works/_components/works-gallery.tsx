"use client";

import { WorkItem } from "@/types/work";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import GroupToggle from "./works-gallery-controls";
import InlineMasonry from "./works-gallery-inline-masonry";
import { mapItemsToPhotos } from "./works-gallery-utils";

type Props = {
  items: WorkItem[];
};

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
          <InlineMasonry items={items} onPhotoClick={handlePhotoClick} />
        ) : (
          groups.map(([year, its]) => (
            <section key={year} className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">{year}</h2>
              <InlineMasonry items={its} onPhotoClick={handlePhotoClick} />
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
