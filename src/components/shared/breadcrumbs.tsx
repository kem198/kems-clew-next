"use client";

import { usePageTitle } from "@/components/shared/page-title-context";
import { useSelectedLayoutSegments } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

function Breadcrumbs() {
  // 呼び出されたページまでのセグメントを配列として取得する
  const pathnames = useSelectedLayoutSegments();

  // ルートグループの要素を除去する
  const pathnamesIgnoredRouteGroups = pathnames.filter(
    (pathname) => !pathname.startsWith("("),
  );

  const { title: pageTitle } = usePageTitle();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathnamesIgnoredRouteGroups.map((segment, index) => (
          <React.Fragment key={segment}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/**
               * 最後のセグメント以外はリンクとして表示する
               * 最後のセグメントはテキストとして表示する
               */}
              {index === pathnamesIgnoredRouteGroups.length - 1 ? (
                // If this is a top-level route (no parent), show the static label (Notes/Works/About)
                pathnamesIgnoredRouteGroups[index - 1] === undefined ? (
                  <span className="text-stone-400">
                    <StaticBreadcrumbLabel segment={segment} />
                  </span>
                ) : // If the page has set a title via context, use it first
                (pathnamesIgnoredRouteGroups[index - 1] === "notes" ||
                    pathnamesIgnoredRouteGroups[index - 1] === "works") &&
                  pageTitle ? (
                  <span className="text-stone-400">{pageTitle}</span>
                ) : (
                  <DynamicBreadcrumbLabel
                    segment={segment}
                    parent={pathnamesIgnoredRouteGroups[index - 1]}
                  />
                )
              ) : (
                <BreadcrumbLink
                  href={`/${pathnamesIgnoredRouteGroups
                    .slice(0, index + 1)
                    .join("/")}`}
                >
                  <StaticBreadcrumbLabel segment={segment} />
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function StaticBreadcrumbLabel({ segment }: { segment: string }) {
  // map common route names to display titles
  const map: Record<string, string> = {
    notes: "Notes",
    works: "Works",
    about: "About",
  };
  return <>{map[segment] ?? segment}</>;
}

function DynamicBreadcrumbLabel({
  segment,
  parent,
}: {
  segment: string;
  parent?: string;
}) {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchTitle() {
      if (!parent) return setTitle(segment);
      if (parent === "notes") {
        try {
          const res = await fetch(`/api/title/notes/${segment}`);
          const j = await res.json();
          if (!cancelled) setTitle(j.title ?? segment);
        } catch {
          if (!cancelled) setTitle(segment);
        }
      } else if (parent === "works") {
        try {
          const res = await fetch(`/api/title/works/${segment}`);
          const j = await res.json();
          if (!cancelled) setTitle(j.title ?? segment);
        } catch {
          if (!cancelled) setTitle(segment);
        }
      } else {
        setTitle(segment);
      }
    }

    fetchTitle();

    return () => {
      cancelled = true;
    };
  }, [segment, parent]);

  return <span className="text-stone-400">{title ?? segment}</span>;
}

export { Breadcrumbs };
