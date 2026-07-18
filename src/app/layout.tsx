import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { notoSansJp } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

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
      className={cn("h-full", "antialiased", notoSansJp.className, "font-sans")}
    >
      <body>
        <div>
          <Breadcrumbs />
          {children}
        </div>
      </body>
    </html>
  );
}
