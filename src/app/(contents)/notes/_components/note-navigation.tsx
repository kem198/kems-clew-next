import { Tag } from "@/app/(contents)/notes/_components/note-tag";
import { buttonVariants } from "@/components/ui/button";
import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/cn";
import type { Note } from "@/types/note";
import { NoteTagSummary } from "@/types/note";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type { TocItem } from "remark-flexible-toc";

export type NoteTocProps = {
  toc?: TocItem[];
  className?: string;
};

function getIndent(depth: number) {
  return Math.max(0, (depth - 1) * 16);
}

/**
 * Table of contents
 */
export function NoteToc({ toc = [], className }: NoteTocProps) {
  if (toc.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className={className}>
      <ul className="mt-0 p-2">
        {toc.map((item) => (
          <li
            key={item.href}
            style={{
              marginTop: 2,
              marginBottom: 2,
              marginLeft: `${getIndent(item.depth)}px`,
            }}
          >
            <Link href={item.href} className="text-zinc-600">
              {item.value}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export type NotePagerProps = {
  prev: Note | null;
  next: Note | null;
  className?: string;
};

type PagerLinkProps = {
  note: Note;
  direction: "newer" | "older";
};

function PagerLink({ note, direction }: PagerLinkProps) {
  const isNewer = direction === "newer";

  return (
    <Link
      href={`/notes/${note.slug}`}
      className={cn(
        buttonVariants({
          variant: "secondary",
          size: "lg",
        }),
        "min-w-0 flex-1",
      )}
    >
      {isNewer ? <ChevronLeftIcon /> : null}

      {isNewer ? "新しい記事へ" : "古い記事へ"}

      {!isNewer ? <ChevronRightIcon /> : null}
    </Link>
  );
}

/**
 * 前後記事ナビゲーション
 */
export function NotePager({ prev, next, className }: NotePagerProps) {
  return (
    <nav aria-label="Note navigation" className={cn("not-prose", className)}>
      <hr />
      <div className="flex justify-between gap-4 pt-9 pb-3 max-md:pb-6">
        {next ? (
          <PagerLink note={next} direction="newer" />
        ) : (
          <div className="flex-1" />
        )}

        {prev ? (
          <PagerLink note={prev} direction="older" />
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}

type NoteContentTocProps = {
  toc?: TocItem[];
};

/**
 * モバイル用記事 TOC
 */
export function NoteContentToc({ toc }: NoteContentTocProps) {
  if (!toc?.length) {
    return null;
  }

  return (
    <details className="rounded-md bg-zinc-100">
      <summary className="cursor-pointer list-none px-4 py-2 font-bold">
        TOC
      </summary>

      <div className="px-4">
        <NoteToc toc={toc} />
      </div>
    </details>
  );
}

type NoteContentTagCloudProps = {
  tags?: NoteTagSummary[];
  className?: string;
};

/**
 * 記事内用タグクラウド
 */
export function NoteContentTagCloud({
  tags,
  className,
}: NoteContentTagCloudProps) {
  if (!tags?.length) {
    return null;
  }

  return (
    <div className={cn(`rounded-md bg-zinc-100 p-4`, className)}>
      <TagCloud tags={tags} />
    </div>
  );
}

type TagListProps = {
  children: React.ReactNode;
  className?: string;
};

function TagList({ children, className }: TagListProps) {
  return (
    <div className={cn("not-prose text-sm", className)}>
      <ul
        className={cn(
          ubuntuSans.className,
          "flex flex-wrap gap-2 text-cyan-600",
        )}
      >
        {children}
      </ul>
    </div>
  );
}

export type TagBadgeListProps = {
  tags?: string[];
  className?: string;
};

export function TagBadgeList({ tags = [], className }: TagBadgeListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <TagList className={className}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag tag={tag} />
        </li>
      ))}
    </TagList>
  );
}

export type TagCloudProps = {
  tags?: NoteTagSummary[];
  className?: string;
};

export function TagCloud({ tags = [], className }: TagCloudProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <TagList className={className}>
      {tags.map((tag) => (
        <li key={tag.name}>
          <Tag tag={tag.name} />

          <span className="ml-1 text-zinc-400">({tag.count})</span>
        </li>
      ))}
    </TagList>
  );
}
