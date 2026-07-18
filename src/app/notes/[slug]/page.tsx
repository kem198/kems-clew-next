import { TableOfContents } from "@/components/shared/table-of-contents";
import { ubuntuSans } from "@/constants/fonts";
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
      <div>
        <ul>
          <li>作成日: {frontmatter.date}</li>
          <li>更新日: {frontmatter.lastmod}</li>
        </ul>
        <h1>{frontmatter.title}</h1>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <ul className={`${ubuntuSans.className} flex gap-2`}>
            {frontmatter.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        <article className="prose bg-blue-200">{content}</article>
      </div>

      <aside>
        <div className="bg-card sticky top-20 rounded-xl border p-6 shadow-sm">
          <h2>目次</h2>
          <TableOfContents toc={scope.toc} />
        </div>
      </aside>
    </div>
  );
}
