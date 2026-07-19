import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTitleProvider } from "@/components/shared/page-title-context";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageTitleProvider>
      <div className="w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-6">
          <Breadcrumbs />
          {children}
        </div>
      </div>
    </PageTitleProvider>
  );
}
