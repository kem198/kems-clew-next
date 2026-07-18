"use client";

import type { WorkItem } from "@/lib/works";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";

type Props = {
  items: WorkItem[];
};

export default function MasonryWorks({ items }: Props) {
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
          <Link href={item.src} target="_blank" className="block">
            <Image
              src={item.src}
              alt={item.title}
              width={1000}
              height={1000}
              className="h-auto w-full rounded"
            />
          </Link>
        </article>
      ))}
    </Masonry>
  );
}
