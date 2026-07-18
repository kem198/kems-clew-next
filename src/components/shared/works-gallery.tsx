"use client";

import type { WorkItem } from "@/lib/works";
import { useMemo, useState } from "react";
import GroupToggle from "./works-gallery-controls";
import InlineMasonry from "./works-gallery-inline-masonry";

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
    const arr = Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
    return arr;
  }, [items]);

  return (
    <div>
      <GroupToggle groupByYear={groupByYear} setGroupByYear={setGroupByYear} />

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
