import { NoteArticle } from "@/app/(contents)/notes/_components/note-article";
import { NoteArticleHeader } from "@/app/(contents)/notes/_components/note-article-header";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import ContentArea from "@/components/shared/content-area";
import { NavigationArea } from "@/components/shared/navigation-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { NoteFrontmatter } from "@/types/note";
import { evaluate } from "next-mdx-remote-client/rsc";
import { readFile } from "node:fs/promises";
import path from "node:path";

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
        <Breadcrumbs segments={[BreadcrumbSegment.about]} />{" "}
      </NavigationArea>

      <NoteLayout>
        <NoteLayout.Main>
          <ContentArea>
            <NoteArticle>
              <NoteArticle.Header>
                <NoteArticleHeader frontmatter={frontmatter} />
              </NoteArticle.Header>

              <NoteArticle.Content>{content}</NoteArticle.Content>
            </NoteArticle>
          </ContentArea>
        </NoteLayout.Main>
      </NoteLayout>
    </>
  );
}
