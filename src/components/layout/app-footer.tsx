import {
  ChevronUpIcon,
  ComputerIcon,
  PaletteIcon,
  RssIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type AppFooterProps = React.HTMLAttributes<HTMLElement>;

export function AppFooter({ className, children, ...props }: AppFooterProps) {
  return (
    <footer className={"site-footer h-card " + (className ?? "")} {...props}>
      <ul className="footer-sns">
        <li>
          <Link href="https://github.com/kem198" aria-label="GitHub">
            <ComputerIcon className="h-5 w-5" />
          </Link>
        </li>
        <li>
          <Link href="https://www.pixiv.net/users/7791923" aria-label="Pixiv">
            <PaletteIcon className="h-5 w-5" />
          </Link>
        </li>
        <li>
          <Link href="#" aria-label="Feed">
            <RssIcon className="h-5 w-5" />
          </Link>
        </li>
      </ul>
      <p className="footer-copy">&copy; 2022 KeM198</p>
      <div className="footer-jump">
        <Link href="#" aria-label="Back to top">
          <ChevronUpIcon className="h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
}
