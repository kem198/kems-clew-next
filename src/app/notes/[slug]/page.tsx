import { notFound } from "next/navigation";

import { evaluate } from "next-mdx-remote-client/rsc";
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

import { TableOfContents } from "@/components/shared/table-of-contents";
import { getNoteSource } from "@/lib/notes";
import type { NoteFrontmatter } from "@/types/note";

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
      },
      vfileDataIntoScope: "toc",
    },
  }).catch(() => {
    notFound();
  });

  return (
    <div className="grid grid-cols-[240px_1fr] gap-8">
      <aside>
        <TableOfContents toc={scope.toc} />
      </aside>

      <article className="prose">
        <h1>{frontmatter.title}</h1>

        <p>{frontmatter.date}</p>

        {content}
      </article>
    </div>
  );
}
