import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
import { Tag } from "@/components/shared/note-tag";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { getNotes } from "@/utils/server/notes.server";

export const dynamic = "force-static";

export default async function NotesTagsPage() {
  const notes = await getNotes();

  const tagCounts = new Map<string, number>();

  for (const note of notes) {
    for (const tag of note.frontmatter.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const tags = Array.from(tagCounts.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <>
      <Breadcrumbs segments={[BreadcrumbSegment.notes]} title="Tags" />

      <ContentArea>
        <h1>Tags</h1>

        <ul>
          {tags.map(([tag, count]) => (
            <li key={tag}>
              <Tag tag={tag} /> <span className="text-zinc-400">({count})</span>
            </li>
          ))}
        </ul>
      </ContentArea>
    </>
  );
}
