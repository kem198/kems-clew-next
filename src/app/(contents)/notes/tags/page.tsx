import { NoteContent } from "@/app/(contents)/notes/_components/note-content";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { NoteTag } from "@/app/(contents)/notes/_components/note-tag";
import { NoteTagCloud } from "@/app/(contents)/notes/_components/note-tags";
import { NoteTitle } from "@/app/(contents)/notes/_components/note-typography";
import { ArticleSurface } from "@/components/shared/article-surface";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { NavigationArea } from "@/components/shared/navigation-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { getNotes, getNoteTags } from "@/lib/content/notes.server";

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
                <ul>
                  {tags.map((tag) => (
                    <li key={tag.name}>
                      <NoteTag tag={tag.name} />{" "}
                      <span className="text-zinc-400">({tag.count})</span>
                    </li>
                  ))}
                </ul>
              </NoteContent.Main>
            </NoteContent>
          </ArticleSurface>
        </NoteLayout.Main>

        <NoteLayout.Sidebar>
          <ArticleSurface>
            <NoteSidebar>
              <NoteSidebar.Section title="Tags">
                <NoteTagCloud tags={tags} />
              </NoteSidebar.Section>
            </NoteSidebar>
          </ArticleSurface>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
