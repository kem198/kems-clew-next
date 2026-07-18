import { buttonVariants } from "@/components/ui/button";
import type { Note } from "@/types/note";
import Link from "next/link";
import type { TocItem } from "remark-flexible-toc";

type NoteNavigationProps = {
  prev: Note | null;
  next: Note | null;
};

export function NoteNavigation({ prev, next }: NoteNavigationProps) {
  return (
    <div className="not-prose mt-8 flex justify-between">
      {prev ? (
        <Link
          href={`/notes/${prev.slug}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          前の記事
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/notes/${next.slug}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          次の記事
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

type NoteTocProps = {
  toc?: TocItem[];
};

export function NoteToc({ toc }: NoteTocProps) {
  const list = Array.isArray(toc) ? toc : [];

  if (list.length === 0) return null;

  return (
    <nav className="prose" aria-label="Table of contents">
      <ul>
        {list.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.value}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
