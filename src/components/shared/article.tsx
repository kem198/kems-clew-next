import { cn } from "@/lib/utils";
import * as React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  full?: boolean;
  innerClassName?: string;
};

export function Article({ children, className, full, ...props }: Props) {
  const innerBase = full ? "prose max-w-none" : "prose";

  return (
    <article
      className={cn(innerBase, "w-full rounded-md bg-white p-6", className)}
      {...props}
    >
      {children}
    </article>
  );
}

export default Article;
