import { withSiteName } from "@/lib/seo";

export const metadata = {
  title: withSiteName("About"),
};

export default async function AboutPage() {
  return (
    <article className="prose">
      <h1>About</h1>
      <p>test</p>
    </article>
  );
}
