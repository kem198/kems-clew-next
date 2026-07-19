"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type HomeLinkProps = React.ComponentProps<typeof Link>;

export function HomeLink({ className, children, ...props }: HomeLinkProps) {
  return (
    <h2 className={cn("not-prose", className)}>
      <Link {...props}>
        <Button variant="link" size="lg">
          {children} <ChevronRightIcon />
        </Button>
      </Link>
    </h2>
  );
}
