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

export type NoteTagListProps = {
  tags?: string[];
  className?: string;
};

export function NoteTagList({ tags = [], className }: NoteTagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={cn("not-prose text-sm", className)}>
      <ul
        className={cn(
          ubuntuSans.className,
          "flex flex-wrap gap-2 text-cyan-600",
        )}
      >
        {tags.map((tag) => (
          <li key={tag}>
            <NoteTag tag={tag} />
          </li>
        ))}
      </ul>
    </div>
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
    <ul className={className}>
      {tags.map((tag) => (
        <li key={tag.name}>
          <NoteTag tag={tag.name} />{" "}
          <span className="text-zinc-400">({tag.count})</span>
        </li>
      ))}
    </ul>
  );
}

export type NoteTagCloudProps = {
  tags?: NoteTagSummary[];
  className?: string;
};

export function NoteTagCloud({ tags = [], className }: NoteTagCloudProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={cn("not-prose text-sm", className)}>
      <ul
        className={cn(
          ubuntuSans.className,
          "flex flex-wrap gap-2 text-cyan-600",
        )}
      >
        {tags.map((tag) => (
          <li key={tag.name}>
            <NoteTag tag={tag.name} />

            <span className="ml-1 text-zinc-400">({tag.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
