import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function NotesLayout({ children }: Props) {
  return <main className="mx-auto max-w-6xl px-8 py-8">{children}</main>;
}
