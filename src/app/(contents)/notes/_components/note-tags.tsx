import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/cn";
import type { NoteTagSummary } from "@/types/note";
import Link from "next/link";

export type NoteTagProps = {
  tag: string;
  className?: string;
};

export function NoteTag({ tag, className }: NoteTagProps) {
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

export type NoteTagListProps = {
  tags?: string[];
  className?: string;
};

export function NoteTagList({ tags = [], className }: NoteTagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <TagList className={className}>
      {tags.map((tag) => (
        <li key={tag}>
          <NoteTag tag={tag} />
        </li>
      ))}
    </TagList>
  );
}

export type NoteTagSummaryListProps = {
  tags?: NoteTagSummary[];
  className?: string;
};

export function NoteTagSummaryList({
  tags = [],
  className,
}: NoteTagSummaryListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <TagList className={className}>
      {tags.map((tag) => (
        <li key={tag.name}>
          <NoteTag tag={tag.name} />
          <span className="ml-1 text-zinc-400">({tag.count})</span>
        </li>
      ))}
    </TagList>
  );
}
