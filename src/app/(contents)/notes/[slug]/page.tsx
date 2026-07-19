import ContentArea from "@/components/shared/content-area";
import { SetPageTitle } from "@/components/shared/page-title-context";
import { Tags } from "@/components/shared/tags";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { withSiteName } from "@/lib/seo";
import type { NoteFrontmatter } from "@/types/note";
import {
  getNoteSource as getNoteSourceUncached,
  getPrevNextNote,
} from "@/utils/server/notes.server";
import { evaluate } from "next-mdx-remote-client/rsc";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { cache } from "react";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import { NoteNavigation, NoteToc } from "../_components";

const getNoteSource = cache(getNoteSourceUncached);

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const src = await getNoteSource(slug);
    const { frontmatter } = getFrontmatter<NoteFrontmatter>(src);
    const title = frontmatter?.title ?? slug;
    return { title: withSiteName(title) };
  } catch {
    return { title: withSiteName() };
  }
}

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
    <div className="flex gap-6">
      <ContentArea full>
        <SetPageTitle title={frontmatter?.title ?? slug} />
        <ul className="not-prose text-right text-gray-400">
          <li>
            作成日:{" "}
            <span className={`${ubuntuSans.className}`}>
              {formatDateToYYYYMMDD(frontmatter.date)}
            </span>
          </li>
          <li>
            更新日:{" "}
            <span className={`${ubuntuSans.className}`}>
              {formatDateToYYYYMMDD(frontmatter.lastmod)}
            </span>
          </li>
        </ul>

        <h1>{frontmatter.title}</h1>

        <Tags tags={frontmatter.tags}></Tags>

        {content}

        <NoteNavigation prev={prev} next={next} />
      </ContentArea>

      <aside>
        <ContentArea className="sticky top-6 min-w-72">
          <h2>目次</h2>
          <NoteToc toc={scope.toc} />
        </ContentArea>
      </aside>
    </div>
  );
}
