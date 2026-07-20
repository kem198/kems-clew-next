import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Note } from "@/types/note";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type NoteNavigationProps = {
  prev: Note | null;
  next: Note | null;
  className?: string;
};

type NavigationLinkProps = {
  note: Note;
  direction: "prev" | "next";
};

function NavigationLink({ note, direction }: NavigationLinkProps) {
  const isPrev = direction === "prev";

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
      {isPrev ? <ChevronLeftIcon /> : null}

      {isPrev ? "新しい記事へ" : "古い記事へ"}

      {!isPrev ? <ChevronRightIcon /> : null}
    </Link>
  );
}

/**
 * 前後記事ナビゲーション
 */
export function NoteNavigation({ prev, next, className }: NoteNavigationProps) {
  return (
    <nav
      className={cn("not-prose flex justify-between gap-4", className)}
      aria-label="Note navigation"
    >
      {next ? (
        <NavigationLink note={next} direction="prev" />
      ) : (
        <div className="flex-1" />
      )}

      {prev ? (
        <NavigationLink note={prev} direction="next" />
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
