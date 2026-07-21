import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Note } from "@/types/note";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export type NoteNavigationProps = {
  prev: Note | null;
  next: Note | null;
  className?: string;
};

type NavigationLinkProps = {
  note: Note;
  direction: "newer" | "older";
};

function NavigationLink({ note, direction }: NavigationLinkProps) {
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

/**
 * 前後記事ナビゲーション
 */
export function NoteNavigation({ prev, next, className }: NoteNavigationProps) {
  return (
    <nav aria-label="Note navigation" className={cn("not-prose", className)}>
      <hr />
      <div className="flex justify-between gap-4 pt-9 pb-3 max-md:pb-6">
        {next ? (
          <NavigationLink note={next} direction="newer" />
        ) : (
          <div className="flex-1" />
        )}

        {prev ? (
          <NavigationLink note={prev} direction="older" />
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}
