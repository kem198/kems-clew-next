import { WorksGallery } from "@/app/(contents)/works/_components";
import { ContentArea } from "@/components/shared/content-area";
import { withSiteName } from "@/lib/seo";
import { getWorks } from "@/utils/server/works.server";

export const metadata = {
  title: withSiteName("Works"),
};

export default async function WorksPage() {
  const items = await getWorks();

  return (
    <ContentArea full>
      <h1>Works</h1>

      <section className="mt-8">
        <WorksGallery items={items} />
      </section>
    </ContentArea>
  );
}
