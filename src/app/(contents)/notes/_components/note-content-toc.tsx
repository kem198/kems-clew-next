import { NoteToc } from "@/app/(contents)/notes/_components/note-toc";
import type { TocItem } from "remark-flexible-toc";

type NoteContentTocProps = {
  toc?: TocItem[];
};

/**
 * モバイル用記事 TOC
 */
export function NoteContentToc({ toc }: NoteContentTocProps) {
  if (!toc?.length) {
    return null;
  }

  return (
    <details className="rounded-md bg-zinc-100">
      <summary className="cursor-pointer list-none px-4 py-2 font-bold">
        TOC
      </summary>

      <div className="px-4">
        <NoteToc toc={toc} />
      </div>
    </details>
  );
}
