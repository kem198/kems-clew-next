import { TableOfContents } from "@/components/shared/table-of-contents";
import { Tags } from "@/components/shared/tags";
import { getNoteSource } from "@/lib/notes";
import type { NoteFrontmatter } from "@/types/note";
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
    <div className="flex gap-4">
      <article className="prose bg-red-200">
        <ul className="not-prose text-right">
          <li>作成日: {frontmatter.date}</li>
          <li>更新日: {frontmatter.lastmod}</li>
        </ul>

        <h1>{frontmatter.title}</h1>

        <Tags tags={frontmatter.tags}></Tags>

        {content}
      </article>

      <aside>
        <div className="bg-card sticky top-20 rounded-xl border p-6 shadow-sm">
          <h2>目次</h2>
          <TableOfContents toc={scope.toc} />
        </div>
      </aside>
    </div>
  );
}
