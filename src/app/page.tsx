import { HomeLink } from "@/components/shared/home-link";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { getLatestNotes } from "@/utils/server/notes.server";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const latest = await getLatestNotes(3);

  return (
    <main className="prose">
      <div className="flex flex-col gap-4">
        <HomeLink href={"/notes"} description="雑記いろいろ">
          Notes
        </HomeLink>

        <ul>
          {latest.map((n) => (
            <li key={n.slug}>
              <Link href={`/notes/${n.slug}`}>
                {formatDateToYYYYMMDD(n.frontmatter.date)} |{" "}
                {n.frontmatter.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/notes" className="flex gap-2">
              More <ChevronRightIcon />
            </Link>
          </li>
        </ul>

        <HomeLink href={"/works"} description="制作物のページ">
          Works
        </HomeLink>

        <HomeLink href={"/about"} description="当サイトについて">
          About
        </HomeLink>
      </div>
    </main>
  );
}
