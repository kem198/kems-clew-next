import { TagCloud } from "@/app/(contents)/notes/_components/note-tag";
import { cn } from "@/lib/utils";
import { NoteTag } from "@/types/note";

type NoteContentTagCloudProps = {
  tags?: NoteTag[];
  className?: string;
};

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
    <div className={cn(`bg-zinc-100 p-4`, className)}>
      <TagCloud tags={tags} />
    </div>
  );
}
