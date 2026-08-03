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
import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const notes = await getNotes();
  const tags = getNoteTags(notes);

  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

type NoteTagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateMetadata({
  params,
}: NoteTagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: tag,
  };
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
                <NoteTitle>#{tag}</NoteTitle>
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
