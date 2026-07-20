import { NoteToc } from "@/app/(contents)/notes/_components";
import { TagBadgeList } from "@/app/(contents)/notes/_components/note-tag";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { NoteFrontmatter } from "@/types/note";
import * as React from "react";
import type { TocItem } from "remark-flexible-toc";

type NoteLayoutProps = {
  frontmatter?: Partial<NoteFrontmatter>;
  title?: string;
  toc?: TocItem[];
  className?: string;
  children?: React.ReactNode;
};

export function NoteLayout({
  frontmatter,
  title,
  toc,
  className,
  children,
}: NoteLayoutProps) {
  const displayTitle = title ?? frontmatter?.title;

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-4">
        <ul className="not-prose flex justify-end gap-2 text-sm text-gray-400">
          <li>
            作成日:{" "}
            <span className={`${ubuntuSans.className}`}>
              {formatDateToYYYYMMDD(frontmatter?.date)}
            </span>
          </li>
          <li>/</li>
          <li>
            更新日:{" "}
            <span className={`${ubuntuSans.className}`}>
              {formatDateToYYYYMMDD(frontmatter?.lastmod)}
            </span>
          </li>
        </ul>
        <div className="flex flex-col gap-1">
          {displayTitle ? <h1 className="mb-2">{displayTitle}</h1> : null}

          {frontmatter?.tags ? (
            <TagBadgeList tags={frontmatter?.tags} className="text-base" />
          ) : null}
        </div>

        {/* スマホ用目次 */}
        {toc?.length ? (
          <details className="rounded-md bg-zinc-100 md:hidden">
            <summary className="cursor-pointer list-none px-4 py-2 font-bold">
              TOC
            </summary>
            <div className="px-4">
              <NoteToc toc={toc} />
            </div>
          </details>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default NoteLayout;
