import type { TocItem } from "remark-flexible-toc";

type Props = {
  toc?: TocItem[];
};

export function TableOfContents({ toc }: Props) {
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
