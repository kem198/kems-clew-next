import { NoteNavigation } from "@/app/(contents)/notes/_components";
import { NoteContentLayout } from "@/app/(contents)/notes/_components/note-content-layout";
import NoteLayout from "@/app/(contents)/notes/_components/note-layout";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CodeBlock } from "@/components/shared/code-block";
import ContentArea from "@/components/shared/content-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { rehypePrettyCodeOptions } from "@/lib/rehype-pretty-code";
import { withSiteName } from "@/lib/seo";
import type { NoteFrontmatter } from "@/types/note";
import {
  getNotes,
  getNoteSource,
  getPrevNextNote,
} from "@/utils/server/notes.server";
import { evaluate } from "next-mdx-remote-client/rsc";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// 事前生成する slug 一覧
export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: NotePageProps) {
  const { slug } = await params;

  const source = await getNoteSource(slug);
  const { frontmatter } = getFrontmatter<NoteFrontmatter>(source);

  return {
    title: withSiteName(frontmatter?.title ?? slug),
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;

  const source = await getNoteSource(slug);

  // 記事一覧を取得して 次の記事へ / 前の記事へ 用に加工する
  const notes = await getNotes();
  const { prev, next } = getPrevNextNote(notes, slug);

  const { content, frontmatter, scope } = await evaluate<
    NoteFrontmatter,
    { toc: TocItem[] }
  >({
    source,
    components: {
      pre: CodeBlock,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkFlexibleToc],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
      vfileDataIntoScope: "toc",
    },
  });

  return (
    <>
      <Breadcrumbs
        segments={[BreadcrumbSegment.notes]}
        title={frontmatter.title}
      />

      <NoteContentLayout toc={scope.toc}>
        <ContentArea className="min-w-0 flex-1">
          <NoteLayout frontmatter={frontmatter} toc={scope.toc}>
            {content}
            <hr className="not-prose mt-24 mb-6" />
            <NoteNavigation prev={prev} next={next} />
          </NoteLayout>
        </ContentArea>
      </NoteContentLayout>
    </>
  );
}
