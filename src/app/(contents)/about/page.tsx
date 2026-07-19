import ContentArea from "@/components/shared/content-area";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
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
    <ContentArea className="prose">
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
      <h1>{frontmatter?.title}</h1>
      {content}
    </ContentArea>
  );
}
