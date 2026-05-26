export default function ShopLoading() {
  return (
    <section className="container-page py-32">
      <div className="h-3 w-32 animate-pulse rounded-full bg-surface-container" />
      <div className="mt-4 h-12 w-3/4 animate-pulse rounded-2xl bg-surface-container md:w-1/2" />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-border bg-surface/60">
            <div className="aspect-[4/5] animate-pulse bg-surface-container" />
            <div className="space-y-2 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded-full bg-surface-container" />
              <div className="h-3 w-full animate-pulse rounded-full bg-surface-container" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
