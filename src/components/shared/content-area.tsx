import { cn } from "@/lib/utils";
import * as React from "react";

type ContentAreaProps = React.HTMLAttributes<HTMLElement>;

export function ContentArea({
  children,
  className,
  ...props
}: ContentAreaProps) {
  return (
    <article
      className={cn(
        "prose w-full max-w-none rounded-md bg-white p-6 max-md:rounded-none max-md:p-3",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}

export default ContentArea;
