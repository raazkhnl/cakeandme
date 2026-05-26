import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80vh] flex-col items-center justify-center py-32 text-center">
      <span className="chip-secondary">404</span>
      <h1 className="mt-6 font-display text-display-2xl text-balance">
        This page is still in the oven.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        We couldn't find what you were looking for. Wander back to the shop or our story.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/shop" className="btn-ghost">Browse cakes</Link>
      </div>
    </section>
  );
}
