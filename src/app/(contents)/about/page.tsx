import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import ContentArea from "@/components/shared/content-area";
import NoteLayout from "@/components/shared/note-layout";
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
      <Breadcrumbs segments={[BreadcrumbSegment.about]} />
      <ContentArea>
        <NoteLayout frontmatter={frontmatter}>{content}</NoteLayout>
      </ContentArea>
    </>
  );
}
