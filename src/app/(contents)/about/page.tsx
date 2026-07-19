import { Article } from "@/components/shared/article";
import { withSiteName } from "@/lib/seo";

export const metadata = {
  title: withSiteName("About"),
};

export default async function AboutPage() {
  return (
    <Article full>
      <h1>About</h1>
      <p>test</p>
    </Article>
  );
}
