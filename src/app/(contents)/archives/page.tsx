import { ArchivesGallery } from "@/features/archives/components/archives-gallery";
import { getArchives } from "@/features/archives/repository";
import { ArticleSurface } from "@/shared/components/article-surface";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { NavigationArea } from "@/shared/components/navigation-area";
import { BreadcrumbSegment } from "@/shared/constants/breadcrumbs";
import { withSiteName } from "@/shared/lib/seo";

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
