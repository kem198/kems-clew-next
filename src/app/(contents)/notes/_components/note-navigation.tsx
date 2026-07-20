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

export function NoteNavigation({ prev, next, className }: NoteNavigationProps) {
  return (
    <div className={cn("not-prose flex justify-between gap-4", className)}>
      {next ? (
        <Link
          href={`/notes/${next.slug}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "min-w-0 flex-1",
          )}
        >
          <ChevronLeftIcon />
          新しい記事へ
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {prev ? (
        <Link
          href={`/notes/${prev.slug}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "min-w-0 flex-1",
          )}
        >
          古い記事へ
          <ChevronRightIcon />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
