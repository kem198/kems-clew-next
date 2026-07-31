import { Tag } from "@/app/(contents)/notes/_components/note-tag";
import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/cn";
import { NoteTagSummary } from "@/types/note";

type NoteContentTagCloudProps = {
  tags?: NoteTagSummary[];
  className?: string;
};

export type TagCloudProps = {
  tags?: NoteTagSummary[];
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

/**
 * 記事内用タグクラウド
 */
export function NoteContentTagCloud({
  tags,
  className,
}: NoteContentTagCloudProps) {
  if (!tags?.length) {
    return null;
  }

  return (
    <div className={cn(`rounded-md bg-zinc-100 p-4`, className)}>
      <TagCloud tags={tags} />
    </div>
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
