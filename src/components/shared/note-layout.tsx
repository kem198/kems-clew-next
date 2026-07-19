import { SetPageTitle } from "@/components/shared/page-title-context";
import { Tags } from "@/components/shared/tags";
import { ubuntuSans } from "@/constants/fonts";
import { formatDateToYYYYMMDD } from "@/lib/date";
import type { NoteFrontmatter } from "@/types/note";
import * as React from "react";

type NoteLayoutProps = {
  frontmatter?: Partial<NoteFrontmatter>;
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

export function NoteLayout({ frontmatter, title, children }: NoteLayoutProps) {
  const displayTitle = title ?? frontmatter?.title;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {displayTitle ? <SetPageTitle title={displayTitle} /> : null}

        <ul className="not-prose text-right text-gray-400">
          <li>
            作成日:{" "}
            <span className={`${ubuntuSans.className}`}>
              {formatDateToYYYYMMDD(frontmatter?.date)}
            </span>
          </li>
          <li>
            更新日:{" "}
            <span className={`${ubuntuSans.className}`}>
              {formatDateToYYYYMMDD(frontmatter?.lastmod)}
            </span>
          </li>
        </ul>

        {displayTitle ? (
          <div className="flex flex-col gap-1">
            <h1 className="mb-2">{displayTitle}</h1>
            {frontmatter?.tags ? (
              <Tags tags={frontmatter?.tags} className="text-base" />
            ) : null}
          </div>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default NoteLayout;
