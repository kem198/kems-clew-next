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
      <body>
        <div className="flex flex-col gap-2">
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
          {children}
        </div>
      </body>
    </html>
  );
}
