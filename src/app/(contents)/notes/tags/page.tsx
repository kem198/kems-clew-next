import { NoteContent } from "@/features/notes/components/note-content";
import { NoteLayout } from "@/features/notes/components/note-layout";
import { NoteSidebar } from "@/features/notes/components/note-sidebar";
import {
  NoteTagCloud,
  NoteTagSummaryList,
} from "@/features/notes/components/note-tags";
import { NoteTitle } from "@/features/notes/components/note-typography";
import { getNotes } from "@/features/notes/repository";
import { getNoteTags } from "@/features/notes/selector";
import { ArticleSurface } from "@/shared/components/article-surface";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { NavigationArea } from "@/shared/components/navigation-area";
import { BreadcrumbSegment } from "@/shared/constants/breadcrumbs";
import { withSiteName } from "@/shared/lib/seo";
import Link from "next/link";

export const metadata = {
  title: withSiteName("Tags"),
};

export default async function NotesTagsPage() {
  const notes = await getNotes();
  const tags = getNoteTags(notes);

  return (
    <>
      <NavigationArea>
        <Breadcrumbs segments={[BreadcrumbSegment.notes]} current="Tags" />
      </NavigationArea>

      <NoteLayout>
        <NoteLayout.Main>
          <ArticleSurface>
            <NoteContent>
              <NoteContent.Header>
                <NoteTitle>Tags</NoteTitle>
              </NoteContent.Header>

              <NoteContent.Main>
                <NoteTagSummaryList tags={tags} />
              </NoteContent.Main>
            </NoteContent>
          </ArticleSurface>
        </NoteLayout.Main>

        <NoteLayout.Sidebar>
          <ArticleSurface>
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
          </ArticleSurface>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
