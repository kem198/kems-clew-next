import { evaluate } from "next-mdx-remote-client/rsc";

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

  const { content, frontmatter } = await evaluate<NoteFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return (
    <main>
      <article className="prose lg:prose-xl">
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
        {content}
      </article>
    </main>
  );
}
