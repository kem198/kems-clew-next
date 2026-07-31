import { NoteTag } from "@/app/(contents)/notes/_components/note-tag";
import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/cn";
import type { NoteTagSummary } from "@/types/note";

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

export type NoteTagCloudProps = {
  tags?: NoteTagSummary[];
  className?: string;
};

export function NoteTagCloud({ tags = [], className }: NoteTagCloudProps) {
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
