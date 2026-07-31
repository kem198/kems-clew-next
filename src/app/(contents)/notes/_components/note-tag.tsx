import { ubuntuSans } from "@/constants/fonts";
import { cn } from "@/lib/cn";
import Link from "next/link";

export type NoteTagProps = {
  tag: string;
  className?: string;
};

export function NoteTag({ tag, className }: NoteTagProps) {
  return (
    <Link
      href={`/notes/tags/${tag}`}
      prefetch={false}
      className={cn(ubuntuSans.className, "hover:underline", className)}
    >
      #{tag}
    </Link>
  );
}
