import { NoteNavigation } from "@/components/shared/note-navigation";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { Tags } from "@/components/shared/tags";
import { formatDateToYYYYMMDD } from "@/lib/date";
import type { NoteFrontmatter } from "@/types/note";
import { getNoteSource, getPrevNextNote } from "@/utils/server/notes.server";
import { evaluate } from "next-mdx-remote-client/rsc";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  const source = await getNoteSource(slug);

  // 記事一覧を取得して 次の記事へ / 前の記事へ 用に加工する
  const { prev, next } = await getPrevNextNote(slug);

  const { content, frontmatter, scope } = await evaluate<
    NoteFrontmatter,
    { toc: TocItem[] }
  >({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkFlexibleToc],
        rehypePlugins: [rehypeSlug],
      },
      vfileDataIntoScope: "toc",
    },
  });

  return (
    <main>
      <div className="flex gap-4">
        <article className="prose bg-red-200">
          <ul className="not-prose text-right">
            <li>作成日: {formatDateToYYYYMMDD(frontmatter.date)}</li>
            <li>更新日: {formatDateToYYYYMMDD(frontmatter.lastmod)}</li>
          </ul>

          <h1>{frontmatter.title}</h1>

          <Tags tags={frontmatter.tags}></Tags>

          {content}

          <NoteNavigation prev={prev} next={next} />
        </article>

        <aside>
          <div className="bg-card sticky top-20 rounded-xl border p-6 shadow-sm">
            <h2>目次</h2>
            <TableOfContents toc={scope.toc} />
          </div>
        </aside>
      </div>
    </main>
  );
}
