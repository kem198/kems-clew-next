import { buttonVariants } from "@/components/ui/button";
import type { Note } from "@/types/note";
import Link from "next/link";

type Props = {
  prev: Note | null;
  next: Note | null;
};

export function NoteNavigation({ prev, next }: Props) {
  return (
    <div className="not-prose mt-8 flex justify-between">
      {prev ? (
        <Link
          href={`/notes/${prev.slug}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          前の記事
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/notes/${next.slug}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          次の記事
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
