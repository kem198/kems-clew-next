import { NoteContentLayout } from "@/app/(contents)/notes/_components/note-content-layout";
import { Tag } from "@/app/(contents)/notes/_components/note-tag";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { getNotes, getNoteTags } from "@/utils/server/notes.server";

export default async function NotesTagsPage() {
  const notes = await getNotes();
  const tags = getNoteTags(notes);

  return (
    <>
      <Breadcrumbs segments={[BreadcrumbSegment.notes]} title="Tags" />
      <NoteContentLayout tagCloud={tags}>
        <ContentArea>
          <h1>Tags</h1>

          <ul>
            {tags.map((tag) => (
              <li key={tag.name}>
                <Tag tag={tag.name} />{" "}
                <span className="text-zinc-400">({tag.count})</span>
              </li>
            ))}
          </ul>
        </ContentArea>
      </NoteContentLayout>
    </>
  );
}
