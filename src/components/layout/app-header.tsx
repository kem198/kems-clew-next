import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export type AppHeaderProps = React.HTMLAttributes<HTMLElement>;

export function AppHeader({ className, ...props }: AppHeaderProps) {
  // TODO: 現在パスが HOME のときは色々表示する
  // const pathname = usePathname();
  // const resolvedIsHome = pathname === "/";

  return (
    <header
      className={cn(
        `h-12 w-full items-center gap-2 bg-gray-800 p-2 font-normal text-white`,
        className,
      )}
      {...props}
    >
      <Link
        href="/"
        className={cn(
          "flex gap-2",
          // resolvedIsHome && "text-4xl"
        )}
      >
        <Image
          src="/icons/icon-192x192.png"
          alt="icon"
          width={24}
          height={24}
        />
        KeM&apos;s Clew
      </Link>
    </header>
  );
}
