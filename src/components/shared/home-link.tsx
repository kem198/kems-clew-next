"use client";

import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type HomeLinkProps = React.ComponentProps<typeof Link> & {
  description?: string;
};

export function HomeLink({
  className,
  children,
  description,
  ...props
}: HomeLinkProps) {
  return (
    <div className="not-prose flex flex-col gap-1">
      <Link
        className={cn("text-primary hover:text-primary/75 w-28", className)}
        {...props}
      >
        <h2 className="flex w-full items-center gap-1 border-b border-zinc-800 pb-1 text-2xl font-black">
          {children} <ChevronRightIcon />
        </h2>
      </Link>
      {description && <p className="text-sm text-zinc-500">{description}</p>}
    </div>
  );
}
