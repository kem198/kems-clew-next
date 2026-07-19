import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 max-md:p-3">
        <Breadcrumbs segments={[]} />
        {children}
      </div>
    </div>
  );
}
