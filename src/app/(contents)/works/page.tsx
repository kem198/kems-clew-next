import WorksGallery from "@/app/(contents)/works/_components/works-gallery";
import { getWorks } from "@/utils/server/works.server";

export default async function WorksPage() {
  const items = await getWorks();

  return (
    <main>
      <article className="prose">
        <h1>Works</h1>
      </article>

      <section className="mt-8">
        <WorksGallery items={items} />
      </section>
    </main>
  );
}
