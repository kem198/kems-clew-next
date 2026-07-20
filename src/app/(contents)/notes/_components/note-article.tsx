import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type NoteArticleProps = {
  children: ReactNode;
  className?: string;
};

type NoteArticleSectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Notes 記事レイアウト
 *
 * 使用例:
 *
 * <NoteArticle>
 *   <NoteArticle.Header>
 *     ...
 *   </NoteArticle.Header>
 *
 *   <NoteArticle.Content>
 *     ...
 *   </NoteArticle.Content>
 *
 *   <NoteArticle.Navigation>
 *     ...
 *   </NoteArticle.Navigation>
 * </NoteArticle>
 */
function NoteArticle({ children, className }: NoteArticleProps) {
  return (
    <article className={cn("flex flex-col gap-8", className)}>
      {children}
    </article>
  );
}

/**
 * 記事ヘッダー領域
 */
function Header({ children, className }: NoteArticleSectionProps) {
  return (
    <header className={cn("flex flex-col gap-4", className)}>{children}</header>
  );
}

/**
 * 記事内 TOC 表示領域
 */
function Toc({ children, className }: NoteArticleSectionProps) {
  return <div className={cn("md:hidden", className)}>{children}</div>;
}

/**
 * 記事本文領域
 */
function Content({ children, className }: NoteArticleSectionProps) {
  return <div className={cn(className)}>{children}</div>;
}

/**
 * 記事ナビゲーション領域
 */
function Navigation({ children, className }: NoteArticleSectionProps) {
  return (
    <section className={cn("not-prose mt-24", className)}>{children}</section>
  );
}

NoteArticle.Header = Header;
NoteArticle.Toc = Toc;
NoteArticle.Content = Content;
NoteArticle.Navigation = Navigation;

export { NoteArticle };
