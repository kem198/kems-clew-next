import { TagCloud } from "@/app/(contents)/notes/_components/note-tag";
import { NoteToc } from "@/app/(contents)/notes/_components/note-toc";
import ContentArea from "@/components/shared/content-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NoteTag } from "@/types/note";
import Link from "next/link";
import type { TocItem } from "remark-flexible-toc";

export type NoteSidebarProps = {
  tags?: NoteTag[];
  toc?: TocItem[];
};

export function NoteSidebar({ tags, toc }: NoteSidebarProps) {
  if (!tags?.length && !toc?.length) {
    return null;
  }

  return (
    <aside className="w-72 shrink-0 max-md:hidden">
      <ContentArea className="sticky top-6 flex max-h-[calc(100vh-6rem)] min-h-0 flex-col">
        {tags?.length ? (
          <div>
            <Link href="/notes/tags" className="pb-0 no-underline">
              <h2 className="mt-0 pb-2 text-xl font-bold">Tags</h2>
            </Link>
            <TagCloud tags={tags} />
          </div>
        ) : null}

        {toc?.length ? (
          <div>
            <Link
              href="#top"
              aria-label="Back to top"
              className="pb-0 no-underline"
            >
              <h2 className="mt-0 mb-0 pb-2 text-xl font-bold">TOC</h2>
            </Link>
            <ScrollArea className="min-h-0 flex-1 overflow-auto">
              <NoteToc toc={toc} />
            </ScrollArea>
          </div>
        ) : null}
      </ContentArea>
    </aside>
  );
}
