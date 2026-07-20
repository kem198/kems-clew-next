import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

type TagProps = {
  tag: string;
};

export function Tag({ tag }: TagProps) {
  return (
    <Link href={`/notes/tags/${tag}`} className="hover:underline">
      #{tag}
    </Link>
  );
}

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
      <ul
        className={`${ubuntuSans.className} flex flex-wrap gap-2 text-cyan-600`}
      >
        {list.map((tag) => (
          <li key={tag}>
            <Tag tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}
