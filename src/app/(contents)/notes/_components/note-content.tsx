import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type NoteContentProps = {
  children: ReactNode;
  className?: string;
};

type NoteContentSectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Notes 記事レイアウト
 *
 * 使用例:
 *
 * <NoteContent>
 *   <NoteContent.Header>
 *     ...
 *   </NoteContent.Header>
 *
 *   <NoteContent.Content>
 *     ...
 *   </NoteContent.Content>
 *
 *   <NoteContent.Navigation>
 *     ...
 *   </NoteContent.Navigation>
 * </NoteContent>
 */
function NoteContent({ children, className }: NoteContentProps) {
  return (
    <article className={cn("flex flex-col gap-12", className)}>
      {children}
    </article>
  );
}

/**
 * 記事ヘッダー領域
 */
function Header({ children, className }: NoteContentSectionProps) {
  return (
    <header className={cn("flex flex-col gap-4", className)}>{children}</header>
  );
}

/**
 * 記事内ナビゲーション表示領域
 * モバイルでは非表示にする
 */
function Navigation({ children, className }: NoteContentSectionProps) {
  return <div className={cn("md:hidden", className)}>{children}</div>;
}

/**
 * 記事本文領域
 */
function Main({ children, className }: NoteContentSectionProps) {
  return <div className={cn(className)}>{children}</div>;
}

/**
 * 記事ナビゲーション領域
 */
function Footer({ children, className }: NoteContentSectionProps) {
  return (
    <section className={cn("not-prose mt-24", className)}>{children}</section>
  );
}

NoteContent.Header = Header;
NoteContent.Navigation = Navigation;
NoteContent.Main = Main;
NoteContent.Footer = Footer;

export { NoteContent };
