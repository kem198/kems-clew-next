import { WorksGallery } from "@/app/(contents)/works/_components/works-gallery";
import { withSiteName } from "@/lib/seo";
import { getWorks } from "@/utils/server/works.server";

export const metadata = {
  title: withSiteName("Works"),
};

export default async function WorksPage() {
  const items = await getWorks();

  return (
    <article>
      <div className="prose">
        <h1>Works</h1>
      </div>

      <section className="mt-8">
        <WorksGallery items={items} />
      </section>
    </article>
  );
}
