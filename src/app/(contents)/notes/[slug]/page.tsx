import { NoteContent } from "@/app/(contents)/notes/_components/note-content";
import { NoteContentToc } from "@/app/(contents)/notes/_components/note-content-toc";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { NotePager } from "@/app/(contents)/notes/_components/note-pager";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { NoteSlugHeader } from "@/app/(contents)/notes/_components/note-slug-header";
import { NoteToc } from "@/app/(contents)/notes/_components/note-toc";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CodeBlock } from "@/components/shared/code-block";
import ContentArea from "@/components/shared/content-area";
import { NavigationArea } from "@/components/shared/navigation-area";
import { SidebarArea } from "@/components/shared/sidebar-area";
import { ScrollArea } from "@/components/ui/scroll-area";
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

type NoteContentProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const notes = await getNotes();

  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: NoteContentProps) {
  const { slug } = await params;

  const source = await getNoteSource(slug);
  const { frontmatter } = getFrontmatter<NoteFrontmatter>(source);

  return {
    title: withSiteName(frontmatter?.title ?? slug),
  };
}

export default async function NoteSlugPage({ params }: NoteContentProps) {
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
          <ContentArea>
            <NoteContent>
              <NoteContent.Header>
                <NoteSlugHeader frontmatter={frontmatter} />
              </NoteContent.Header>

              <NoteContent.Navigation>
                <NoteContentToc toc={scope.toc} />
              </NoteContent.Navigation>

              <NoteContent.Main>{content}</NoteContent.Main>

              <NoteContent.Footer>
                <NotePager prev={prev} next={next} />
              </NoteContent.Footer>
            </NoteContent>
          </ContentArea>
        </NoteLayout.Main>

        <NoteLayout.Sidebar>
          <SidebarArea>
            <NoteSidebar>
              {scope.toc?.length ? (
                <NoteSidebar.Section title="TOC">
                  <ScrollArea className="min-h-0 flex-1 overflow-auto">
                    <NoteToc toc={scope.toc} />
                  </ScrollArea>
                </NoteSidebar.Section>
              ) : null}
            </NoteSidebar>
          </SidebarArea>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
