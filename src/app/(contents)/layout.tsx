export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 max-md:px-0! max-md:pb-0">
        {children}
      </div>
    </div>
  );
}
