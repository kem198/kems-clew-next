import Link from "next/link";
import type { TocItem } from "remark-flexible-toc";

type NoteTocProps = {
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
