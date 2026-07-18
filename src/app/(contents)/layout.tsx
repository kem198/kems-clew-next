import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      {children}
    </div>
  );
}
