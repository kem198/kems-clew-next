import { WorksGallery } from "@/app/(contents)/works/_components";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
import { withSiteName } from "@/lib/seo";
import { getWorks } from "@/utils/server/works.server";

export const metadata = {
  title: withSiteName("Works"),
};

export default async function WorksPage() {
  const items = await getWorks();

  return (
    <>
      <Breadcrumbs segments={["works"]} />
      <ContentArea>
        <h1>Works</h1>

        <section className="mt-8">
          <WorksGallery items={items} />
        </section>
      </ContentArea>
    </>
  );
}
