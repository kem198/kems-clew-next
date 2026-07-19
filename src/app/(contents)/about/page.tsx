import { ContentArea } from "@/components/shared/content-area";
import { withSiteName } from "@/lib/seo";

export const metadata = {
  title: withSiteName("About"),
};

export default async function AboutPage() {
  return (
    <ContentArea full>
      <h1>About</h1>
      <p>test</p>
    </ContentArea>
  );
}
