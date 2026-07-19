import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/utils";

// Accept either a single tag string or an array from frontmatter
type Props = {
  tags?: string | string[];
  className?: string;
};

export function Tags({ tags, className }: Props) {
  const list = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
      ? [tags]
      : [];

  if (!list || list.length === 0)
    return <div className={cn("not-prose text-sm", className)} />;

  return (
    <div className={cn("not-prose text-sm", className)}>
      <ul className={`${ubuntuSans.className} flex gap-2 text-cyan-600`}>
        {list.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>
    </div>
  );
}
