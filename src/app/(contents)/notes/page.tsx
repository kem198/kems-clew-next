import { NoteCard } from "@/app/(contents)/notes/_components/note-card";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { TagCloud } from "@/app/(contents)/notes/_components/note-tag";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { withSiteName } from "@/lib/seo";
import {
  getNotes,
  getNoteTags,
  getSortedNotes,
} from "@/utils/server/notes.server";

export const metadata = {
  title: withSiteName("Notes"),
};

export default async function NotesPage() {
  const allNotes = await getNotes();
  const notes = getSortedNotes(allNotes, "desc");
  const tags = getNoteTags(notes);

  return (
    <>
      <Breadcrumbs segments={[BreadcrumbSegment.notes]} />

      <NoteLayout>
        <NoteLayout.Main>
          <ContentArea>
            <h1>Notes</h1>

            <ul className="not-prose flex flex-col gap-12">
              {notes.map((note) => (
                <li key={note.slug}>
                  <NoteCard note={note} />
                </li>
              ))}
            </ul>
          </ContentArea>
        </NoteLayout.Main>

        <NoteLayout.Sidebar>
          <ContentArea>
            <NoteSidebar>
              <NoteSidebar.Section title="Tags">
                <TagCloud tags={tags} />
              </NoteSidebar.Section>
            </NoteSidebar>
          </ContentArea>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
