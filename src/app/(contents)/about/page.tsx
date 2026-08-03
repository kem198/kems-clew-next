import { NoteContent } from "@/features/notes/components/note-content";
import { NoteHeader } from "@/features/notes/components/note-header";
import { NoteLayout } from "@/features/notes/components/note-layout";
import { NoteFrontmatter } from "@/features/notes/note";
import { ArticleSurface } from "@/shared/components/article-surface";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { NavigationArea } from "@/shared/components/navigation-area";
import { BreadcrumbSegment } from "@/shared/constants/breadcrumbs";
import { withSiteName } from "@/shared/lib/seo";
import { evaluate } from "next-mdx-remote-client/rsc";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const metadata = {
  title: withSiteName("About"),
};

export default async function Page() {
  const filePath = path.join(process.cwd(), "contents/about/about.md");

  const source = await readFile(filePath, "utf-8");

  const { frontmatter, content } = (await evaluate({
    source,
    options: {
      parseFrontmatter: true,
    },
  })) as {
    frontmatter: NoteFrontmatter;
    content: React.ReactNode;
  };

  return (
    <>
      <NavigationArea>
        <Breadcrumbs segments={[BreadcrumbSegment.about]} />
      </NavigationArea>

      <NoteLayout>
        <NoteLayout.Main>
          <ArticleSurface>
            <NoteContent>
              <NoteContent.Header>
                <NoteHeader frontmatter={frontmatter} />
              </NoteContent.Header>

              <NoteContent.Main>{content}</NoteContent.Main>
            </NoteContent>
          </ArticleSurface>
        </NoteLayout.Main>
      </NoteLayout>
    </>
  );
}
