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
        <Link href={"/notes"}>
          <HomeLink href={"/notes"}>Notes</HomeLink>
        </Link>

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

        <HomeLink href={"/works"}>Works</HomeLink>

        <HomeLink href={"/about"}>About</HomeLink>
      </div>
    </main>
  );
}
