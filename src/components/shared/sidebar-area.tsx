import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type SidebarAreaProps = HTMLAttributes<HTMLElement>;

export function SidebarArea({
  children,
  className,
  ...props
}: SidebarAreaProps) {
  return (
    <aside
      className={cn(
        "prose sticky top-6 flex max-h-[calc(100vh-12rem)] flex-col rounded-md bg-white p-6",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}
