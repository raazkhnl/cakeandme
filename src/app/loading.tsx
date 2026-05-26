export default function GlobalLoading() {
  return (
    <section className="container-page py-32" aria-busy="true" aria-live="polite">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="h-3 w-32 animate-pulse rounded-full bg-surface-container" />
        <div className="h-12 w-3/4 animate-pulse rounded-2xl bg-surface-container" />
        <div className="h-12 w-2/3 animate-pulse rounded-2xl bg-surface-container" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-3xl bg-surface-container" />
          ))}
        </div>
      </div>
    </section>
  );
}
