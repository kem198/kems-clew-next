import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { TagCloud } from "@/app/(contents)/notes/_components/note-navigation";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { NoteContent } from "@/app/(contents)/notes/_components/note-slug-content";
import { Tag } from "@/app/(contents)/notes/_components/note-tag";
import { NoteH1 } from "@/app/(contents)/notes/_components/note-typography";
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
                <NoteH1>Tags</NoteH1>
              </NoteContent.Header>

              <NoteContent.Main>
                <ul>
                  {tags.map((tag) => (
                    <li key={tag.name}>
                      <Tag tag={tag.name} />{" "}
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
                <TagCloud tags={tags} />
              </NoteSidebar.Section>
            </NoteSidebar>
          </ArticleSurface>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
