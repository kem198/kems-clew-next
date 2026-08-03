import { NoteContent } from "@/features/notes/components/note-content";
import { NoteHeader } from "@/features/notes/components/note-header";
import { NoteLayout } from "@/features/notes/components/note-layout";
import { NotePager } from "@/features/notes/components/note-pager";
import { NoteSidebar } from "@/features/notes/components/note-sidebar";
import { NoteMobileToc, NoteToc } from "@/features/notes/components/note-toc";
import type { NoteFrontmatter } from "@/features/notes/note";
import { getNotes, getNoteSource } from "@/features/notes/repository";
import { getPrevNextNote } from "@/features/notes/selector";
import { ArticleSurface } from "@/shared/components/article-surface";
import { AsideSurface } from "@/shared/components/aside-surface";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { CodeBlock } from "@/shared/components/code-block";
import { ImageRow } from "@/shared/components/image-row";
import { NavigationArea } from "@/shared/components/navigation-area";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { BreadcrumbSegment } from "@/shared/constants/breadcrumbs";
import { SITE_NAME, SITE_URL } from "@/shared/constants/site";
import { rehypePrettyCodeOptions } from "@/shared/lib/rehype-pretty-code";
import { withSiteName } from "@/shared/lib/seo";
import { Metadata } from "next";
import { evaluate } from "next-mdx-remote-client/rsc";
import Image from "next/image";
import Link from "next/link";
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

  const title = withSiteName(note.frontmatter.title);
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
      img: ({ src, alt }) => (
        <Image src={src ?? ""} alt={alt ?? ""} width={1200} height={1600} />
      ),
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
                <NoteSidebar.Section
                  heading={
                    <Link href="#top" className="not-prose">
                      TOC
                    </Link>
                  }
                >
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
