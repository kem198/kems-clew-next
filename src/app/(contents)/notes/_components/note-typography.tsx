import { cn } from "@/lib/cn";
import { ReactNode } from "react";

export type NoteTitleProps = {
  children: ReactNode;
  className?: string;
};

export function NoteTitle({ children, className }: NoteTitleProps) {
  return <h1 className={cn("mb-0", className)}>{children}</h1>;
}
