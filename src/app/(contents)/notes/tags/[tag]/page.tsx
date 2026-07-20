import { NoteCard } from "@/app/(contents)/notes/_components/note-card";
import { NoteLayout } from "@/app/(contents)/notes/_components/note-layout";
import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import { TagCloud } from "@/app/(contents)/notes/_components/note-tag";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import ContentArea from "@/components/shared/content-area";
import { NavigationArea } from "@/components/shared/navigation-area";
import { SidebarArea } from "@/components/shared/sidebar-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { getNotes, getNoteTags } from "@/utils/server/notes.server";

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

  const notes = await getNotes();

  const filteredNotes = notes.filter((note) =>
    note.frontmatter.tags?.includes(tag),
  );

  const tags = getNoteTags(notes);

  return (
    <>
      <NavigationArea>
        <Breadcrumbs
          segments={[BreadcrumbSegment.notes, BreadcrumbSegment.tags]}
          title={`#${tag}`}
        />
      </NavigationArea>

      <NoteLayout>
        <NoteLayout.Main>
          <ContentArea>
            <h1>#{tag}</h1>

            <ul className="not-prose flex flex-col gap-12">
              {filteredNotes.map((note) => (
                <li key={note.slug}>
                  <NoteCard note={note} />
                </li>
              ))}
            </ul>
          </ContentArea>
        </NoteLayout.Main>

        <NoteLayout.Sidebar>
          <SidebarArea>
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
