"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/store/wishlist";
import { ProductCard } from "@/components/ProductCard";
import { SEED_PRODUCTS } from "@/lib/data/seed";

export default function WishlistPage() {
  const { items, clear } = useWishlist();
  const products = SEED_PRODUCTS.filter((p) => items.includes(p.id));
  return (
    <section className="container-page py-32">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip-secondary">Saved</span>
          <h1 className="mt-4 font-display text-display-xl">Wishlist</h1>
          <p className="mt-2 text-muted-foreground">Tap the heart on any cake to add it here.</p>
        </div>
        {items.length > 0 && (
          <button onClick={clear} className="btn-ghost">Clear wishlist</button>
        )}
      </header>
      {products.length === 0 ? (
        <div className="rounded-3xl border border-border bg-surface/60 p-10 text-center text-muted-foreground">
          Nothing saved yet. <Link href="/shop" className="underline">Browse the shop</Link>.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </section>
  );
}
