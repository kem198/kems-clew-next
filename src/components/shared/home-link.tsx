"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type HomeLinkProps = React.ComponentProps<typeof Link>;

export function HomeLink({ className, children, ...props }: HomeLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex w-auto items-center justify-start gap-2 self-start",
        buttonVariants({ variant: "link", size: "lg" }),
        className,
      )}
      {...props}
    >
      {children} <ChevronRightIcon />
    </Link>
  );
}
