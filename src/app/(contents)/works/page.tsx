import { WorksGallery } from "@/app/(contents)/works/_components/works-gallery";
import { ArticleSurface } from "@/components/shared/article-surface";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { NavigationArea } from "@/components/shared/navigation-area";
import { BreadcrumbSegment } from "@/constants/breadcrumbs";
import { getWorks } from "@/lib/content/works";
import { withSiteName } from "@/lib/seo";

export const metadata = {
  title: withSiteName("Works"),
};

export default function WorksPage() {
  const works = getWorks();

  return (
    <>
      <NavigationArea>
        <Breadcrumbs segments={[BreadcrumbSegment.works]} />
      </NavigationArea>

      <ArticleSurface>
        <h1>Works</h1>

        <section className="mt-8">
          <WorksGallery works={works} />
        </section>
      </ArticleSurface>
    </>
  );
}
