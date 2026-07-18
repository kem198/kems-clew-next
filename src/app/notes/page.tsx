import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { MDXRemote } from "next-mdx-remote-client/rsc";

export default async function Page() {
  const source = await readFile(
    join(process.cwd(), "src/contents/notes/hello.md"),
    "utf-8",
  );

  return <MDXRemote source={source} />;
}
