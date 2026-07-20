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
        `bg-primary flex items-center gap-2 px-6 py-3 font-normal text-white max-md:px-2`,
        className,
      )}
      {...props}
    >
      <Link href="/" className={cn("inline-flex w-auto items-center gap-2")}>
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
