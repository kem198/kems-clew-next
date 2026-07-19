import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { notoSansJp } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <AppHeader>
            <Link href="/" className="flex gap-2">
              <Image
                src="/icons/icon-192x192.png"
                alt="icon"
                width={24}
                height={24}
              />
              KeM&apos;s Clew
            </Link>
          </AppHeader>
          <main className="flex-1 p-4">{children}</main>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
