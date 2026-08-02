import { ArchivesGallery } from "@/app/(contents)/archives/_components/archives-gallery";
import { ArticleSurface } from "@/components/shared/article-surface";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { NavigationArea } from "@/components/shared/navigation-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { getArchives } from "@/lib/content/archives";
import { withSiteName } from "@/lib/seo";

export const metadata = {
  title: withSiteName("Archives"),
};

export default function ArchivesPage() {
  const archives = getArchives();

  return (
    <>
      <NavigationArea>
        <Breadcrumbs segments={[BreadcrumbSegment.archives]} />
      </NavigationArea>

      <ArticleSurface>
        <h1>Archives</h1>

        <section className="mt-8">
          <ArchivesGallery archives={archives} />
        </section>
      </ArticleSurface>
    </>
  );
}
