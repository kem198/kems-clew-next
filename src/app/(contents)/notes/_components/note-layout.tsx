import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type NoteLayoutProps = {
  children: ReactNode;
  className?: string;
};

type NoteLayoutSectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Notes ページ全体のレイアウト
 *
 * 使用例:
 *
 * <NoteLayout>
 *   <NoteLayout.Main>
 *     ...
 *   </NoteLayout.Main>
 *
 *   <NoteLayout.Sidebar>
 *     ...
 *   </NoteLayout.Sidebar>
 * </NoteLayout>
 */
function NoteLayout({ children, className }: NoteLayoutProps) {
  return <div className={cn("flex gap-6", className)}>{children}</div>;
}

/**
 * メインコンテンツ領域
 */
function Main({ children, className }: NoteLayoutSectionProps) {
  return <div className={cn("min-w-0 flex-1", className)}>{children}</div>;
}

/**
 * サイドバー領域
 */
function Sidebar({ children, className }: NoteLayoutSectionProps) {
  return (
    <aside className={cn("w-72 shrink-0 max-md:hidden", className)}>
      {children}
    </aside>
  );
}

NoteLayout.Main = Main;
NoteLayout.Sidebar = Sidebar;

export { NoteLayout };
