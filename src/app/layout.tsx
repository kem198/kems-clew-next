import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { notoSansJp } from "@/constants/fonts";
import { SITE_NAME } from "@/constants/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
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
      className={cn("h-full", "antialiased", notoSansJp.className, "font-sans")}
    >
      <body id="top" className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <AppHeader />
          <main className="flex-1 p-4">{children}</main>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
