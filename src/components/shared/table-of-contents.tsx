import type { TocItem } from "remark-flexible-toc";

type Props = {
  toc: TocItem[];
};

export function TableOfContents({ toc }: Props) {
  return (
    <nav>
      <h2>目次</h2>

      <ul>
        {toc.map((item) => {
          const href = item.href || "";
          const id = href.startsWith("#") ? href.slice(1) : href;

          return (
            <li
              key={id || item.value}
              style={{
                marginLeft: `${(item.depth - 2) * 16}px`,
              }}
            >
              <a href={href.startsWith("#") ? href : `#${id}`}>{item.value}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
