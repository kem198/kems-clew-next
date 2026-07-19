import Link from "next/link";

type BreadcrumbsProps = {
  segments: string[];
  title?: string;
};

const labels: Record<string, string> = {
  notes: "Notes",
  works: "Works",
  about: "About",
};

export function Breadcrumbs({ segments, title }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/">Home</Link>
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          const label = isLast && title ? title : (labels[segment] ?? segment);

          return (
            <li key={segment} className="flex items-center gap-2">
              <span>/</span>

              {isLast ? (
                <span className="text-stone-400">{label}</span>
              ) : (
                <Link href={`/${segments.slice(0, index + 1).join("/")}`}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
