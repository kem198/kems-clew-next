import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import type { NoteTag } from "@/types/note";
import Link from "next/link";

type TagProps = {
  tag: string;
};

export function Tag({ tag }: TagProps) {
  return (
    <Link
      href={`/notes/tags/${tag}`}
      className={`hover:underline ${ubuntuSans.className}`}
    >
      #{tag}
    </Link>
  );
}

type TagsProps = {
  tags?: string | string[] | NoteTag[];
  className?: string;
  showCount?: boolean;
};

export function Tags({ tags, className, showCount = false }: TagsProps) {
  const list = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
      ? [tags]
      : [];

  if (list.length === 0) {
    return <div className={cn("not-prose text-sm", className)} />;
  }

  return (
    <div className={cn("not-prose text-sm", className)}>
      <ul
        className={`${ubuntuSans.className} flex flex-wrap gap-2 text-cyan-600`}
      >
        {list.map((tag) => (
          <li key={typeof tag === "string" ? tag : tag.name}>
            <Tag tag={typeof tag === "string" ? tag : tag.name} />

            {showCount && typeof tag !== "string" ? (
              <span className="ml-1 text-zinc-400">({tag.count})</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
