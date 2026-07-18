import { formatDateToYYYYMMDD } from "@/lib/date";
import { getLatestNotes } from "@/utils/server/notes.server";
import Link from "next/link";

export default async function Home() {
  const latest = await getLatestNotes(3);

  return (
    <main className="prose">
      <div className="flex flex-col gap-4">
        <Link href={"/notes"}>Notes</Link>
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
            <Link href="/notes">More</Link>
          </li>
        </ul>

        <Link href={"/works"}>Works</Link>
        <Link href={"/about"}>About</Link>
      </div>
    </main>
  );
}
