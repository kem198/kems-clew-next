import MasonryWorks from "@/components/shared/masonry-works";
import { getWorks } from "@/lib/works";

export default async function WorksPage() {
  const items = await getWorks();

  return (
    <main>
      <article className="prose">
        <h1>Works</h1>
      </article>

      <section className="mt-8">
        <MasonryWorks items={items} />
      </section>
    </main>
  );
}
