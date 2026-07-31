import { WorksGallery } from "@/app/(contents)/works/_components/works-gallery";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ContentArea } from "@/components/shared/content-area";
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

      <ContentArea>
        <h1>Works</h1>

        <section className="mt-8">
          <WorksGallery works={works} />
        </section>
      </ContentArea>
    </>
  );
}
