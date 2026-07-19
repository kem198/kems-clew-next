import { WorksGallery } from "@/app/(contents)/works/_components/works-gallery";
import { Article } from "@/components/shared/article";
import { withSiteName } from "@/lib/seo";
import { getWorks } from "@/utils/server/works.server";

export const metadata = {
  title: withSiteName("Works"),
};

export default async function WorksPage() {
  const items = await getWorks();

  return (
    <Article full>
      <h1>Works</h1>

      <section className="mt-8">
        <WorksGallery items={items} />
      </section>
    </Article>
  );
}
