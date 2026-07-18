"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import React from "react";
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
                <span className="text-stone-400">{segment}</span>
              ) : (
                <BreadcrumbLink
                  href={`/${pathnamesIgnoredRouteGroups
                    .slice(0, index + 1)
                    .join("/")}`}
                >
                  {segment}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { Breadcrumbs };
