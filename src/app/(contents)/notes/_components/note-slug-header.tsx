import { NoteH1 } from "@/app/(contents)/notes/_components/note-h1";
import { TagBadgeList } from "@/app/(contents)/notes/_components/note-tag";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import type { NoteFrontmatter } from "@/types/note";

type NoteSlugHeaderProps = {
  frontmatter: Partial<NoteFrontmatter>;
};

/**
 * 記事ヘッダー
 *
 * 表示内容:
 * - 作成日
 * - 更新日
 * - タイトル
 * - タグ
 */
export function NoteSlugHeader({ frontmatter }: NoteSlugHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <ul className="not-prose flex justify-end gap-2 text-sm text-zinc-400">
        <li>
          作成日:{" "}
          <span className={ubuntuSans.className}>
            {formatDateToYYYYMMDD(frontmatter.date)}
          </span>
        </li>

        <li>/</li>

        <li>
          更新日:{" "}
          <span className={ubuntuSans.className}>
            {formatDateToYYYYMMDD(frontmatter.lastmod)}
          </span>
        </li>
      </ul>

      <div className="flex flex-col gap-1">
        <NoteH1>{frontmatter.title}</NoteH1>

        {frontmatter.tags ? (
          <TagBadgeList tags={frontmatter.tags} className="text-base" />
        ) : null}
      </div>
    </div>
  );
}
