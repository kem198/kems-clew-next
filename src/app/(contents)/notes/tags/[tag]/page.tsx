import { NoteCard } from "@/app/(contents)/notes/_components/note-card";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { NoteContent } from "@/app/(contents)/notes/_components/note-slug-content";
import { TagCloud } from "@/app/(contents)/notes/_components/note-tags";
import { NoteH1 } from "@/app/(contents)/notes/_components/note-typography";
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

type NoteTagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateStaticParams() {
  const notes = await getNotes();
  const tags = getNoteTags(notes);

  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

export default async function NoteTagPage({ params }: NoteTagPageProps) {
  const { tag } = await params;
  const notes = getSortedNotes(await getNotes(), "desc");

  const filteredNotes = notes.filter((note) =>
    note.frontmatter.tags?.includes(tag),
  );

  const tags = getNoteTags(notes);

  return (
    <>
      <NavigationArea>
        <Breadcrumbs
          segments={[BreadcrumbSegment.notes, BreadcrumbSegment.tags]}
          current={`#${tag}`}
        />
      </NavigationArea>

      <NoteLayout>
        <NoteLayout.Main>
          <ArticleSurface>
            <NoteContent>
              <NoteContent.Header>
                <NoteH1>#{tag}</NoteH1>
              </NoteContent.Header>

              <NoteContent.Main>
                <ul className="not-prose flex flex-col gap-12">
                  {filteredNotes.map((note) => (
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
          <AsideSurface>
            <NoteSidebar>
              <NoteSidebar.Section title="Tags">
                <TagCloud tags={tags} />
              </NoteSidebar.Section>
            </NoteSidebar>
          </AsideSurface>
        </NoteLayout.Sidebar>
      </NoteLayout>
    </>
  );
}
