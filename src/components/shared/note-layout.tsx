import { NoteToc } from "@/app/(contents)/notes/_components";
import { SetPageTitle } from "@/components/shared/page-title-context";
import { Tags } from "@/components/shared/tags";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import type { NoteFrontmatter } from "@/types/note";
import * as React from "react";
import { TocItem } from "remark-flexible-toc";

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
  children,
}: NoteLayoutProps) {
  const displayTitle = title ?? frontmatter?.title;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {displayTitle ? <SetPageTitle title={displayTitle} /> : null}

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
            <Tags tags={frontmatter?.tags} className="text-base" />
          ) : null}
        </div>

        {toc && (
          <div className="rounded-md bg-zinc-100 p-4 md:hidden">
            <h2 className="mt-0 mb-2 border-none">TOC</h2>
            <NoteToc toc={toc} />
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default NoteLayout;
