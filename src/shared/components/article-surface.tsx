import { Surface } from "@/shared/components/surface";
import { cn } from "@/shared/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ArticleSurface({ children, className }: Props) {
  return (
    <article className={cn("prose w-full max-w-none", className)}>
      <Surface>{children}</Surface>
    </article>
  );
}
