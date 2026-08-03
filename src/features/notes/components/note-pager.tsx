import { Note } from "@/features/notes/note";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type PagerLinkProps = {
  note: Note;
  direction: "newer" | "older";
};

function PagerLink({ note, direction }: PagerLinkProps) {
  const isNewer = direction === "newer";

  return (
    <Link
      href={`/notes/${note.slug}`}
      className={cn(
        buttonVariants({
          variant: "secondary",
          size: "lg",
        }),
        "min-w-0 flex-1",
      )}
    >
      {isNewer ? <ChevronLeftIcon /> : null}

      {isNewer ? "新しい記事へ" : "古い記事へ"}

      {!isNewer ? <ChevronRightIcon /> : null}
    </Link>
  );
}

export type NotePagerProps = {
  prev: Note | null;
  next: Note | null;
  className?: string;
};

/**
 * 前後記事ナビゲーション
 */
export function NotePager({ prev, next, className }: NotePagerProps) {
  return (
    <nav aria-label="Note navigation" className={cn("not-prose", className)}>
      <hr />
      <div className="flex justify-between gap-4 pt-9 pb-3 max-md:pb-6">
        {next ? (
          <PagerLink note={next} direction="newer" />
        ) : (
          <div className="flex-1" />
        )}

        {prev ? (
          <PagerLink note={prev} direction="older" />
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}
