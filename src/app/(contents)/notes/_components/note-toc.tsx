import Link from "next/link";
import { TocItem } from "remark-flexible-toc";

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
