"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type HomeLinkProps = React.ComponentProps<typeof Link>;

export function HomeLink({ className, children, ...props }: HomeLinkProps) {
  return (
    <h2 className="not-prose">
      <Link
        className={cn(
          "inline-flex w-auto items-center justify-start gap-2 self-start",
          className,
        )}
        {...props}
      >
        <Button variant="link" size="lg">
          {children} <ChevronRightIcon />
        </Button>
      </Link>
    </h2>
  );
}
