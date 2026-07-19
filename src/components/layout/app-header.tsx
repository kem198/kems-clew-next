import { SITE_NAME } from "@/constants/site";
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
        `flex items-center gap-2 bg-gray-800 py-2 font-normal text-white`,
        className,
      )}
      {...props}
    >
      <Link
        href="/"
        className={cn(
          "inline-flex w-auto items-center gap-2 px-4 py-1",
          // resolvedIsHome && "text-4xl"
        )}
      >
        <Image
          src="/assets/icons/kems-clew-192x192.png"
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
        />
        {SITE_NAME}
      </Link>
    </header>
  );
}
