"use client";

import Link from "next/link";

export default function ShopError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="container-page py-32 text-center">
      <h1 className="font-display text-display-lg">Couldn't load the shop.</h1>
      <p className="mt-2 text-muted-foreground">Hit refresh or browse the categories.</p>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/categories" className="btn-ghost">Browse categories</Link>
      </div>
    </section>
  );
}
