import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { notoSansJp } from "@/constants/fonts";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,

  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/assets/icons/kems-clew-512x512.png",
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/assets/icons/kems-clew-512x512.png"],
  },

  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/rss.xml",
          title: `${SITE_NAME} RSS Feed`,
        },
      ],
    },
  },
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
      <body id="top" className="min-h-screen overflow-x-hidden">
        <div className="flex min-h-screen flex-col">
          <AppHeader />
          <main className="flex flex-1 flex-col bg-zinc-100">{children}</main>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
