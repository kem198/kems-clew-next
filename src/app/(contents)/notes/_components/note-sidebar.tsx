import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type NoteSidebarProps = {
  children: ReactNode;
  className?: string;
};

type SidebarSectionProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

function NoteSidebar({ children, className }: NoteSidebarProps) {
  return (
    <div
      className={cn(
        "sticky top-6 flex max-h-[calc(100vh-6rem)] min-h-0 flex-col gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Section({ title, children, className }: SidebarSectionProps) {
  return (
    <section className={cn(className)}>
      {title ? <h2 className="mt-0 mb-2 text-xl font-bold">{title}</h2> : null}

      {children}
    </section>
  );
}

NoteSidebar.Section = Section;

export { NoteSidebar };
