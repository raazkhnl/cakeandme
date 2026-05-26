export default function AdminLoading() {
  return (
    <section className="container-page py-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="h-64 animate-pulse rounded-3xl bg-surface-container" />
        </aside>
        <div className="lg:col-span-9 space-y-4">
          <div className="h-12 w-1/2 animate-pulse rounded-2xl bg-surface-container" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-3xl bg-surface-container" />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-3xl bg-surface-container" />
        </div>
      </div>
    </section>
  );
}
