import { HomeLink } from "@/components/shared/home-link";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { getLatestNotes } from "@/utils/server/notes.server";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const latest = await getLatestNotes(3);

  return (
    <main className="prose">
      <div className="flex flex-col gap-8">
        <section>
          <HomeLink href={"/notes"} description="雑記いろいろ">
            Notes
          </HomeLink>

          <ul className="mt-0">
            {latest.map((n) => (
              <li key={n.slug}>
                <Link href={`/notes/${n.slug}`}>
                  <span className={`${ubuntuSans.className} text-gray-400`}>
                    {formatDateToYYYYMMDD(n.frontmatter.date)} |{" "}
                  </span>{" "}
                  {n.frontmatter.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/notes"
                className="inline-flex w-auto items-center gap-2"
              >
                More <ChevronRightIcon />
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
    </main>
  );
}
