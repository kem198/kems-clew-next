import { NoteToc } from "@/app/(contents)/notes/_components";
import ContentArea from "@/components/shared/content-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import type { TocItem } from "remark-flexible-toc";

type NoteSidebarProps = {
  toc?: TocItem[];
};

export function NoteSidebar({ toc }: NoteSidebarProps) {
  if (!toc?.length) {
    return null;
  }

  return (
    <aside className="w-72 shrink-0 max-md:hidden">
      <ContentArea className="sticky top-6 flex max-h-[calc(100vh-6rem)] min-h-0 flex-col">
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
      </ContentArea>
    </aside>
  );
}
