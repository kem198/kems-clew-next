import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type NoteLayoutProps = {
  children: ReactNode;
  className?: string;
};

type NoteLayoutItemProps = {
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
function Main({ children, className }: NoteLayoutItemProps) {
  return <div className={cn("min-w-0 flex-1", className)}>{children}</div>;
}

/**
 * サイドバー領域
 */
function Sidebar({ children, className }: NoteLayoutItemProps) {
  return (
    <aside className={cn("w-80 shrink-0 max-lg:w-72 max-md:hidden", className)}>
      {children}
    </aside>
  );
}

NoteLayout.Main = Main;
NoteLayout.Sidebar = Sidebar;

export { NoteLayout };
