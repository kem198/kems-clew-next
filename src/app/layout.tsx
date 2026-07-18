import { notoSansJp } from "@/constants/fonts";
import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "KeM's Clew",
  description: "@KeM198 のホームページ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      data-google-analytics-opt-out=""
      className={cn("h-full", "antialiased", notoSansJp.className, "font-sans", geist.variable)}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
