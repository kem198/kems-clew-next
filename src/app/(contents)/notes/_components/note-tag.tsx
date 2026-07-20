import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import type { NoteTag } from "@/types/note";
import Link from "next/link";

export type TagProps = {
  tag: string;
  className?: string;
};

export function Tag({ tag, className }: TagProps) {
  return (
    <Link
      href={`/notes/tags/${tag}`}
      prefetch={false}
      className={cn(ubuntuSans.className, "hover:underline", className)}
    >
      #{tag}
    </Link>
  );
}

type TagListProps = {
  children: React.ReactNode;
  className?: string;
};

function TagList({ children, className }: TagListProps) {
  return (
    <div className={cn("not-prose text-sm", className)}>
      <ul
        className={cn(
          ubuntuSans.className,
          "flex flex-wrap gap-2 text-cyan-600",
        )}
      >
        {children}
      </ul>
    </div>
  );
}

export type TagBadgeListProps = {
  tags?: string[];
  className?: string;
};

export function TagBadgeList({ tags = [], className }: TagBadgeListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <TagList className={className}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag tag={tag} />
        </li>
      ))}
    </TagList>
  );
}

export type TagCloudProps = {
  tags?: NoteTag[];
  className?: string;
};

export function TagCloud({ tags = [], className }: TagCloudProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <TagList className={className}>
      {tags.map((tag) => (
        <li key={tag.name}>
          <Tag tag={tag.name} />

          <span className="ml-1 text-zinc-400">({tag.count})</span>
        </li>
      ))}
    </TagList>
  );
}
