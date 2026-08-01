import { NoteHeader } from "@/app/(contents)/notes/_components/note-header";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { NotePager } from "@/app/(contents)/notes/_components/note-pager";

import { NoteContent } from "@/app/(contents)/notes/_components/note-content";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import {
  NoteMobileToc,
  NoteToc,
} from "@/app/(contents)/notes/_components/note-toc";
import { ArticleSurface } from "@/components/shared/article-surface";
import { AsideSurface } from "@/components/shared/aside-surface";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CodeBlock } from "@/components/shared/code-block";
import { ImageRow } from "@/components/shared/image-row";
import { NavigationArea } from "@/components/shared/navigation-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import {
  getNotes,
  getNoteSource,
  getPrevNextNote,
} from "@/lib/content/notes.server";
import { rehypePrettyCodeOptions } from "@/lib/rehype-pretty-code";
import type { NoteFrontmatter } from "@/types/note";
import { Metadata } from "next";
import { evaluate } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import remarkGfm from "remark-gfm";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const notes = await getNotes();

  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const notes = await getNotes();
  const note = notes.find((note) => note.slug === slug);

  if (!note) {
    return {};
  }

  const title = note.frontmatter.title;
  const description = note.preview;
  const url = `${SITE_URL}/notes/${slug}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: "article",
      images: [
        {
          url: "/assets/icons/kems-clew-512x512.png",
          width: 512,
          height: 512,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary",
      title,
      description,
      images: ["/assets/icons/kems-clew-512x512.png"],
    },
  };
}

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;

  const source = await getNoteSource(slug);

  const notes = await getNotes();
  const { prev, next } = getPrevNextNote(notes, slug);

  const { content, frontmatter, scope } = await evaluate<
    NoteFrontmatter,
    { toc: TocItem[] }
  >({
    source,
    components: {
      pre: CodeBlock,
      ImageRow,
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
      <NavigationArea>
        <Breadcrumbs
          segments={[BreadcrumbSegment.notes]}
          current={frontmatter.title}
        />
      </NavigationArea>

      <NoteLayout>
        <NoteLayout.Main>
          <ArticleSurface>
            <NoteContent>
              <NoteContent.Header>
                <NoteHeader frontmatter={frontmatter} />
                <NoteContent.Navigation>
                  <NoteMobileToc toc={scope.toc} />
                </NoteContent.Navigation>
              </NoteContent.Header>

              <NoteContent.Main>{content}</NoteContent.Main>

              <NoteContent.Footer>
                <NotePager prev={prev} next={next} />
              </NoteContent.Footer>
            </NoteContent>
          </ArticleSurface>
        </NoteLayout.Main>

        <NoteLayout.Sidebar>
          <AsideSurface>
            <NoteSidebar>
              {scope.toc?.length ? (
                <NoteSidebar.Section title="TOC">
                  <ScrollArea className="min-h-0 flex-1 overflow-auto">
                    <NoteToc toc={scope.toc} />
                  </ScrollArea>
                </NoteSidebar.Section>
              ) : null}
            </NoteSidebar>
          </AsideSurface>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
