"use client";

import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type HomeLinkProps = React.ComponentProps<typeof Link>;

export function HomeLink({ className, children, ...props }: HomeLinkProps) {
  return (
    <Link className={cn("flex gap-2", className)} {...props}>
      {children} <ChevronRightIcon />
    </Link>
  );
}
