import { AppHeader } from "@/components/layout/app-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
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
      <body>
        <div className="flex flex-col gap-2">
          <AppHeader className="flex justify-center md:hidden">
            <Link href="/">
              <Image
                src="/icons/icon-192x192.png"
                alt="icon"
                width={24}
                height={24}
              />
            </Link>
          </AppHeader>
          <Breadcrumbs />
          {children}
        </div>
      </body>
    </html>
  );
}
