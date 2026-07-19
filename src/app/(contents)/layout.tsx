import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTitleProvider } from "@/components/shared/page-title-context";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageTitleProvider>
      <div className="flex flex-col gap-4">
        <Breadcrumbs />
        {children}
      </div>
    </PageTitleProvider>
  );
}
