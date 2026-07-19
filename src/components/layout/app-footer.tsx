import GitHubIcon from "@/components/icons/github-icon";
import { cn } from "@/lib/utils";
import { ChevronUpIcon, PaletteIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type AppFooterProps = React.HTMLAttributes<HTMLElement>;

export function AppFooter({ className, ...props }: AppFooterProps) {
  return (
    <footer
      className={cn(
        "bg-primary flex flex-col items-center gap-8 p-8 text-white",
        className,
      )}
      {...props}
    >
      <ul className="flex gap-4">
        <li>
          <Link href="https://github.com/kem198" aria-label="GitHub">
            <GitHubIcon className="h-6 w-6" />
          </Link>
        </li>
        <li>
          <Link href="https://www.pixiv.net/users/7791923" aria-label="Pixiv">
            <PaletteIcon className="h-6 w-6" />
          </Link>
        </li>
        {/* TODO: RSS の実装 */}
        {/* <li>
          <Link href="#" aria-label="Feed">
            <RssIcon className="h-6 w-6" />
          </Link>
        </li> */}
      </ul>

      <p>&copy; 2022 KeM198</p>

      <Link href="#top" aria-label="Back to top" className="self-end">
        <ChevronUpIcon className="h-6 w-6" />
      </Link>
    </footer>
  );
}
