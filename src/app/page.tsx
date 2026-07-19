import { Article } from "@/components/shared/article";
import { HomeLink } from "@/components/shared/home-link";
import { ubuntuSans } from "@/constants/fonts";
import { SITE_NAME } from "@/constants/site";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { getLatestNotes } from "@/utils/server/notes.server";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: SITE_NAME,
};

export default async function Home() {
  const latest = await getLatestNotes(3);

  return (
    <Article full>
      <div className="flex flex-col gap-8 p-6">
        <section>
          <HomeLink href={"/notes"} description="雑記いろいろ">
            Notes
          </HomeLink>

          <ul className="not-prose mt-2">
            {latest.map((n) => (
              <li key={n.slug} className="mb-0 ml-8 list-disc">
                <Link href={`/notes/${n.slug}`} className="hover:underline">
                  <span className={`${ubuntuSans.className} text-gray-400`}>
                    {formatDateToYYYYMMDD(n.frontmatter.date)} |{" "}
                  </span>
                  {n.frontmatter.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/notes"
                className="mb-0 ml-2 inline-flex w-auto items-center gap-0 hover:underline"
              >
                More
                <ChevronRightIcon height={16} width={16} />
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <HomeLink href={"/works"} description="制作物のページ">
            Works
          </HomeLink>
        </section>

        <section>
          <HomeLink href={"/about"} description="当サイトについて">
            About
          </HomeLink>
        </section>
      </div>
    </Article>
  );
}
