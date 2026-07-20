import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import type { NoteTag } from "@/types/note";
import type { ReactNode } from "react";
import type { TocItem } from "remark-flexible-toc";

type NoteContentLayoutProps = {
  children: ReactNode;
  tags?: NoteTag[];
  toc?: TocItem[];
};

export function NoteContentLayout({
  children,
  tags,
  toc,
}: NoteContentLayoutProps) {
  return (
    <div className="flex gap-6">
      {children}
      <NoteSidebar tags={tags} toc={toc} />
    </div>
  );
}
