import { Button } from "@/components/ui/button";
import type { Note } from "@/types/note";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type { TocItem } from "remark-flexible-toc";

type NoteNavigationProps = {
  prev: Note | null;
  next: Note | null;
};

export function NoteNavigation({ prev, next }: NoteNavigationProps) {
  return (
    <div className="not-prose mt-8 flex justify-between">
      {next ? (
        <Link href={`/notes/${next.slug}`}>
          <Button variant="secondary" size="lg">
            <ChevronLeftIcon /> Previous: {next.frontmatter.title}
          </Button>
        </Link>
      ) : (
        <div />
      )}
      {prev ? (
        <Link href={`/notes/${prev.slug}`}>
          <Button variant="secondary" size="lg">
            Next: {prev.frontmatter.title} <ChevronRightIcon />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

type NoteTocProps = {
  toc?: TocItem[];
  className?: string;
};

export function NoteToc({ toc, className }: NoteTocProps) {
  const list = Array.isArray(toc) ? toc : [];

  if (list.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={className}>
      <ul className="mt-0 p-2">
        {list.map((item) => (
          <li
            key={item.href}
            style={{
              marginTop: 2,
              marginBottom: 2,
              marginLeft: `${Math.max(0, (item.depth - 1) * 16)}px`,
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
