import { TagBadgeList } from "@/app/(contents)/notes/_components/note-tag";
import { NoteToc } from "@/app/(contents)/notes/_components/note-toc";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { NoteFrontmatter } from "@/types/note";
import * as React from "react";
import type { TocItem } from "remark-flexible-toc";

export type NoteArticleHeaderProps = {
  frontmatter: Partial<NoteFrontmatter>;
};

/**
 * 記事内ヘッダ
 */
export function NoteArticleHeader({ frontmatter }: NoteArticleHeaderProps) {
  return (
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
        <h1 className="mb-2">{frontmatter?.title}</h1>

        {frontmatter?.tags ? (
          <TagBadgeList tags={frontmatter?.tags} className="text-base" />
        ) : null}
      </div>
    </div>
  );
}

type NoteArticleTocProps = {
  toc: TocItem[];
};

/**
 * 記事内目次
 */
export function NoteArticleToc({ toc }: NoteArticleTocProps) {
  return (
    <details className="rounded-md bg-zinc-100 md:hidden">
      <summary className="cursor-pointer list-none px-4 py-2 font-bold">
        TOC
      </summary>
      <div className="px-4">
        <NoteToc toc={toc} />
      </div>
    </details>
  );
}

type NoteArticleLayoutProps = {
  frontmatter: Partial<NoteFrontmatter>;
  toc?: TocItem[];
  className?: string;
  children?: React.ReactNode;
};

/**
 * 記事レイアウト
 */
export function NoteArticleLayout({
  frontmatter,
  toc,
  className,
  children,
}: NoteArticleLayoutProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-4">
        <NoteArticleHeader frontmatter={frontmatter} />

        {toc?.length ? <NoteArticleToc toc={toc} /> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default NoteArticleLayout;
