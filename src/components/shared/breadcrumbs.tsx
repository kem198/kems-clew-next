import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { BreadcrumbSegment } from "@/constants/breadcrumbs";

type BreadcrumbsProps = {
  segments: BreadcrumbSegment[];
  title?: string;
};

export function Breadcrumbs({ segments, title }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1 && !title;

          return (
            <Fragment key={segment.slug}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-stone-400">{segment.label}</span>
                ) : (
                  <BreadcrumbLink
                    href={`/${segments
                      .slice(0, index + 1)
                      .map((s) => s.slug)
                      .join("/")}`}
                  >
                    {segment.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}

        {title ? (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <span className="text-stone-400">{title}</span>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
