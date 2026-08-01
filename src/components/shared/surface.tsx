import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type SurfaceProps = HTMLAttributes<HTMLDivElement>;

export function Surface({ children, className, ...props }: SurfaceProps) {
  return (
    <div
      className={cn(
        "w-full rounded-md bg-white p-6 max-md:rounded-none max-md:p-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
