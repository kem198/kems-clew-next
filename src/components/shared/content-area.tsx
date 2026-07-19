import { cn } from "@/lib/utils";
import * as React from "react";

type ContentAreaProps = React.HTMLAttributes<HTMLElement> & {
  full?: boolean;
};

export function ContentArea({
  children,
  className,
  full,
  ...props
}: ContentAreaProps) {
  const innerBase = full ? "prose max-w-none" : "prose max-w-4xl";

  return (
    <article
      className={cn(innerBase, "w-full rounded-md bg-white p-6", className)}
      {...props}
    >
      {children}
    </article>
  );
}

export default ContentArea;
