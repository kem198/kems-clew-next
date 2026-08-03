import { cn } from "@/shared/lib/cn";
import { Surface } from "./surface";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function AsideSurface({ children, className }: Props) {
  return (
    <aside
      className={cn(
        "prose sticky top-6 flex max-h-[calc(100vh-12rem)] flex-col",
        className,
      )}
    >
      <Surface>{children}</Surface>
    </aside>
  );
}
