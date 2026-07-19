import Link from "next/link";

import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { withSiteName } from "@/lib/seo";
import { getNotes } from "@/utils/server/notes.server";

export const metadata = {
  title: withSiteName("Notes"),
};

export default async function NotesPage() {
  const notes = await (await getNotes()).reverse();

  return (
    <article className="w-full rounded-md bg-white p-6">
      <div className="prose">
        <h1>Notes</h1>

        <ul className="not-prose flex flex-col gap-12">
          {notes.map((note) => (
            <li key={note.slug} className="bg-blue-20 flex flex-col gap-1">
              <span className={`${ubuntuSans.className} text-sm text-gray-400`}>
                {formatDateToYYYYMMDD(note.frontmatter.date)}
              </span>

              <div className="flex flex-col gap-0">
                <Link href={`/notes/${note.slug}`}>
                  <span className="text-lg font-bold hover:underline">
                    {note.frontmatter.title}
                  </span>
                </Link>

                {/* // TODO: 記事の本分プレビューを表示する */}
                {/* <p className="text-sm text-gray-400">
                  あああああああああああああああああああああああああああああああああああaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaあ
                </p> */}
              </div>

              {/* TODO: タグで絞り込み可能にする */}
              {/* {<Tags tags={note.frontmatter.tags}></Tags>} */}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
