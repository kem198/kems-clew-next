import { NoteCard } from "@/features/notes/components/note-card";
import { NoteContent } from "@/features/notes/components/note-content";
import { NoteLayout } from "@/features/notes/components/note-layout";
import { NoteSidebar } from "@/features/notes/components/note-sidebar";
import { NoteTagCloud } from "@/features/notes/components/note-tags";
import { NoteTitle } from "@/features/notes/components/note-typography";
import { getNotes } from "@/features/notes/repository";
import { getNoteTags, getSortedNotes } from "@/features/notes/selector";
import { ArticleSurface } from "@/shared/components/article-surface";
import { AsideSurface } from "@/shared/components/aside-surface";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { NavigationArea } from "@/shared/components/navigation-area";
import { BreadcrumbSegment } from "@/shared/constants/breadcrumbs";
import { withSiteName } from "@/shared/lib/seo";
import Link from "next/link";

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
          <ArticleSurface>
            <NoteContent>
              <NoteContent.Header>
                <NoteTitle>Notes</NoteTitle>
                <NoteContent.Navigation>
                  <NoteTagCloud tags={tags} />
                </NoteContent.Navigation>
              </NoteContent.Header>

              <NoteContent.Main>
                <ul className="not-prose flex flex-col gap-12">
                  {notes.map((note) => (
                    <li key={note.slug}>
                      <NoteCard note={note} />
                    </li>
                  ))}
                </ul>
              </NoteContent.Main>
            </NoteContent>
          </ArticleSurface>
        </NoteLayout.Main>

        <NoteLayout.Sidebar>
          <AsideSurface className="min-h-0 flex-1">
            <NoteSidebar>
              <NoteSidebar.Section
                heading={
                  <Link href="/notes/tags" className="not-prose">
                    Tags
                  </Link>
                }
              >
                <NoteTagCloud tags={tags} />
              </NoteSidebar.Section>
            </NoteSidebar>
          </AsideSurface>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
