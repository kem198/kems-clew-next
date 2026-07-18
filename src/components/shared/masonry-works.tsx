"use client";

import type { WorkItem } from "@/lib/works";
import Image from "next/image";
import Link from "next/link";
import { useState, type SyntheticEvent } from "react";
import Masonry from "react-masonry-css";

type Props = {
  items: WorkItem[];
};

export default function MasonryWorks({ items }: Props) {
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
                      prev[item.slug] ? prev : { ...prev, [item.slug]: w / h },
                    );
                  }
                }}
              />
            </div>
          </Link>
        </article>
      ))}
    </Masonry>
  );
}
