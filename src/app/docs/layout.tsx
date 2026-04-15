import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex gap-10 py-12">
        <aside className="hidden w-60 flex-shrink-0 md:block">
          <div className="sticky top-24">
            <DocsSidebar />
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="prose-invert mx-auto max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
