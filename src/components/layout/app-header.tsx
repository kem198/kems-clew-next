"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export type AppHeaderProps = React.HTMLAttributes<HTMLElement>;

export function AppHeader({ className, children, ...props }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-12 w-full items-center gap-2 bg-gray-800 p-2 text-white",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}
