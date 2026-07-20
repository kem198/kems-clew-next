import { NoteSidebar } from "@/app/(contents)/notes/_components/note-sidebar";
import type { NoteTag } from "@/types/note";
import type { ReactNode } from "react";
import type { TocItem } from "remark-flexible-toc";

type NotePageLayoutProps = {
  children: ReactNode;
  tagCloud?: NoteTag[];
  toc?: TocItem[];
};

export function NotePageLayout({
  children,
  tagCloud,
  toc,
}: NotePageLayoutProps) {
  return (
    <div className="flex gap-6">
      {children}
      <NoteSidebar tags={tagCloud} toc={toc} />
    </div>
  );
}
