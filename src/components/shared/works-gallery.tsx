"use client";

import type { WorkItem } from "@/lib/works";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type SyntheticEvent } from "react";
import Masonry from "react-masonry-css";

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
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    480: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item) => (
        <article key={item.slug} className="not-prose mb-4">
          <Link
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {item.thumb && item.thumb.width && item.thumb.height ? (
              <div
                className="relative w-full"
                style={{
                  aspectRatio: `${item.thumb.width}/${item.thumb.height}`,
                }}
              >
                <Image
                  src={item.thumb.src}
                  alt={item.title}
                  width={item.thumb.width}
                  height={item.thumb.height}
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="h-full w-full rounded object-cover"
                />
              </div>
            ) : (
              <div
                className="relative w-full"
                style={{ aspectRatio: ratios[item.slug] ?? 1 }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="h-full w-full rounded object-cover"
                  onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
                    const img = e.currentTarget as HTMLImageElement;
                    const w = img.naturalWidth || img.width;
                    const h = img.naturalHeight || img.height;
                    if (w && h) {
                      setRatios((prev) =>
                        prev[item.slug]
                          ? prev
                          : { ...prev, [item.slug]: w / h },
                      );
                    }
                  }}
                />
              </div>
            )}
          </Link>
        </article>
      ))}
    </Masonry>
  );
}
