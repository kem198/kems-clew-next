import type { TocItem } from "remark-flexible-toc";

type Props = {
  toc: TocItem[];
};

export function TableOfContents({ toc }: Props) {
  return (
    <nav>
      <ul>
        {toc.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.value}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
