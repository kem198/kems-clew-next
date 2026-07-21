import { NoteArticle } from "@/app/(contents)/notes/_components/note-article";
import { NoteArticleTagCloud } from "@/app/(contents)/notes/_components/note-article-tag-cloud";
import { NoteCard } from "@/app/(contents)/notes/_components/note-card";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { TagCloud } from "@/app/(contents)/notes/_components/note-tag";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
import { NavigationArea } from "@/components/shared/navigation-area";
import { SidebarArea } from "@/components/shared/sidebar-area";
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
  const notes = getSortedNotes(await getNotes(), "desc");
  const tags = getNoteTags(notes);

  return (
    <>
      <NavigationArea>
        <Breadcrumbs segments={[BreadcrumbSegment.notes]} />
      </NavigationArea>

      <NoteLayout>
        <NoteLayout.Main>
          <ContentArea>
            <h1>Notes</h1>

            <NoteArticle.Toc className="mb-8">
              <NoteArticleTagCloud tags={tags} />
            </NoteArticle.Toc>

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
          <SidebarArea className="min-h-0 flex-1">
            <NoteSidebar>
              <NoteSidebar.Section title="Tags">
                <TagCloud tags={tags} />
              </NoteSidebar.Section>
            </NoteSidebar>
          </SidebarArea>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
