import { NoteCard } from "@/app/(contents)/notes/_components/note-card";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";

import { NoteContent } from "@/app/(contents)/notes/_components/note-content";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { NoteTagCloud } from "@/app/(contents)/notes/_components/note-tags";
import { NoteTitle } from "@/app/(contents)/notes/_components/note-typography";
import { ArticleSurface } from "@/components/shared/article-surface";
import { AsideSurface } from "@/components/shared/aside-surface";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { NavigationArea } from "@/components/shared/navigation-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import {
  getNotes,
  getNoteTags,
  getSortedNotes,
} from "@/lib/content/notes.server";
import { withSiteName } from "@/lib/seo";
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
