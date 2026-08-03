import { NoteTagList } from "@/features/notes/components/note-tags";
import { NoteTitle } from "@/features/notes/components/note-typography";
import type { NoteFrontmatter } from "@/features/notes/note";
import { ubuntuSans } from "@/shared/constants/fonts";
import { formatDateToYYYYMMDD } from "@/shared/lib/date";

type NoteHeaderProps = {
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
export function NoteHeader({ frontmatter }: NoteHeaderProps) {
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
        <NoteTitle>{frontmatter.title}</NoteTitle>

        {frontmatter.tags ? (
          <NoteTagList tags={frontmatter.tags} className="text-base" />
        ) : null}
      </div>
    </div>
  );
}
