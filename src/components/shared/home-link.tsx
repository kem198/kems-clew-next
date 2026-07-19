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
    <Link className={cn("not-prose", className)} {...props}>
      <h2 className="flex w-28 items-center gap-1 border-b border-gray-800 text-2xl font-black">
        {children} <ChevronRightIcon />
      </h2>
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </Link>
  );
}
