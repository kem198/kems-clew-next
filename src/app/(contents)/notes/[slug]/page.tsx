import { NoteNavigation } from "@/app/(contents)/notes/_components";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CodeBlock } from "@/components/shared/code-block";
import ContentArea from "@/components/shared/content-area";
import NoteLayout from "@/components/shared/note-layout";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { rehypePrettyCodeOptions } from "@/lib/rehype-pretty-code";
import { withSiteName } from "@/lib/seo";
import type { NoteFrontmatter } from "@/types/note";
import {
  getAllNotes,
  getNoteSource as getNoteSourceUncached,
  getPrevNextNote,
} from "@/utils/server/notes.server";
import { evaluate } from "next-mdx-remote-client/rsc";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { unstable_cache } from "next/cache";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-static";
export const revalidate = 3600;

const getNoteSource = unstable_cache(getNoteSourceUncached, ["note-source"]);

// 事前生成する slug 一覧
export async function generateStaticParams() {
  const notes = await getAllNotes();
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
  const { prev, next } = await getPrevNextNote(slug);

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

      <div className="flex gap-6">
        <ContentArea className="min-w-0 flex-1">
          <NoteLayout frontmatter={frontmatter} toc={scope.toc}>
            {content}
            <hr className="not-prose mt-24 mb-6" />
            <NoteNavigation prev={prev} next={next} />
          </NoteLayout>
        </ContentArea>

        {/* PC 用目次  */}
        <NoteSidebar toc={scope.toc} />
      </div>
    </>
  );
}
