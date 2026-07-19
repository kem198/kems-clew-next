import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

type BreadcrumbsProps = {
  segments: string[];
  title?: string;
};

const staticLabels: Record<string, string> = {
  notes: "Notes",
  works: "Works",
  about: "About",
};

function getLabel(segment: string) {
  return staticLabels[segment] ?? segment;
}

export function Breadcrumbs({ segments, title }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={`${segment}-${index}`}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-stone-400">
                    {title ?? getLabel(segment)}
                  </span>
                ) : (
                  <BreadcrumbLink
                    href={`/${segments.slice(0, index + 1).join("/")}`}
                  >
                    {getLabel(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
