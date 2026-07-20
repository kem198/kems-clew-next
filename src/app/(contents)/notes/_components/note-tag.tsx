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

type TagBadgeListProps = {
  tags?: string[];
  className?: string;
};

export function TagBadgeList({ tags = [], className }: TagBadgeListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={cn("not-prose text-sm", className)}>
      <ul
        className={`${ubuntuSans.className} flex flex-wrap gap-2 text-cyan-600`}
      >
        {tags.map((tag) => (
          <li key={tag}>
            <Tag tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type TagCloudProps = {
  tags?: NoteTag[];
  className?: string;
};

export function TagCloud({ tags = [], className }: TagCloudProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={cn("not-prose text-sm", className)}>
      <ul
        className={`${ubuntuSans.className} flex flex-wrap gap-2 text-cyan-600`}
      >
        {tags.map((tag) => (
          <li key={tag.name}>
            <Tag tag={tag.name} />
            <span className="ml-1 text-zinc-400">({tag.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
