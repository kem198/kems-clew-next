import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type NavigationAreaProps = HTMLAttributes<HTMLElement>;

export function NavigationArea({
  children,
  className,
  ...props
}: NavigationAreaProps) {
  return (
    <section className={cn("max-md:px-3", className)} {...props}>
      {children}
    </section>
  );
}
