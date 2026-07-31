import { cn } from "@/lib/cn";
import { Surface } from "./surface";

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
