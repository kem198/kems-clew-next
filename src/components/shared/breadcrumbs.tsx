import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { BreadcrumbSegment } from "@/constants/breadcrumbs";
import Link from "next/link";

type BreadcrumbsProps = {
  segments: BreadcrumbSegment[];
  current?: string;
};

export function Breadcrumbs({ segments, current: current }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/">Home</Link>} />
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1 && !current;

          return (
            <Fragment key={segment.slug}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-zinc-400">{segment.label}</span>
                ) : (
                  <BreadcrumbLink
                    render={
                      <Link
                        href={`/${segments
                          .slice(0, index + 1)
                          .map((s) => s.slug)
                          .join("/")}`}
                      >
                        {segment.label}
                      </Link>
                    }
                  />
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}

        {current ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-zinc-400">{current}</span>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
