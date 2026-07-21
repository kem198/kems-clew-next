import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type NoteH1Props = {
  children: ReactNode;
  className?: string;
};

export function NoteH1({ children, className }: NoteH1Props) {
  return <h1 className={cn("mb-0", className)}>{children}</h1>;
}
