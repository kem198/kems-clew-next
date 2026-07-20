import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type NoteArticleProps = {
  children: ReactNode;
  className?: string;
};

type NoteArticleSectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Note 記事レイアウト
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
 * モバイル TOC 表示領域
 */
function MobileToc({ children, className }: NoteArticleSectionProps) {
  return <div className={cn("md:hidden", className)}>{children}</div>;
}

/**
 * 記事本文領域
 */
function Content({ children, className }: NoteArticleSectionProps) {
  return <div className={cn(className)}>{children}</div>;
}

/**
 * 記事下部ナビゲーション領域
 */
function Navigation({ children, className }: NoteArticleSectionProps) {
  return <div className={cn("not-prose mt-24", className)}>{children}</div>;
}

NoteArticle.Header = Header;
NoteArticle.MobileToc = MobileToc;
NoteArticle.Content = Content;
NoteArticle.Navigation = Navigation;

export { NoteArticle };
