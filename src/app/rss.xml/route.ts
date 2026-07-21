import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/site";
import { getNotes, getSortedNotes } from "@/utils/server/notes.server";

export const dynamic = "force-static";

export async function GET() {
  const notes = getSortedNotes(await getNotes(), "desc");

  const items = notes
    .map((note) => {
      const { title, date } = note.frontmatter;
      const url = `${SITE_URL}/notes/${note.slug}`;

      return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description><![CDATA[
      <img src="${SITE_URL}/assets/icons/kems-clew-512x512.png" alt="${SITE_NAME}" />
      ${note.preview}
      ]]></description>
    </item>`;
    })
    .join("");

  const lastBuildDate =
    notes.length > 0
      ? new Date(notes[0].frontmatter.date).toUTCString()
      : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ja</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
