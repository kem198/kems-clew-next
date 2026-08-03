import { cn } from "@/shared/lib/cn";
import type { ReactNode } from "react";

export type NoteSidebarProps = {
  children: ReactNode;
  className?: string;
};

function NoteSidebar({ children, className }: NoteSidebarProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col gap-6", className)}>
      {children}
    </div>
  );
}

type SidebarSectionProps = {
  heading?: ReactNode;
  children: ReactNode;
  className?: string;
};

function Section({ heading, children, className }: SidebarSectionProps) {
  return (
    <section className={cn("flex min-h-0 flex-1 flex-col", className)}>
      {heading ? (
        <h2 className="mt-0 mb-2 text-xl font-bold">{heading}</h2>
      ) : null}

      {children}
    </section>
  );
}

NoteSidebar.Section = Section;

export { NoteSidebar };
