import Link from "next/link";
import { TocItem } from "remark-flexible-toc";

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
