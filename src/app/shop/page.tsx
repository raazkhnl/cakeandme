import { Suspense } from "react";
import { ShopClient } from "./ShopClient";
import { SEED_PRODUCTS, SEED_CATEGORIES } from "@/lib/data/seed";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopClient products={SEED_PRODUCTS.filter((p) => p.active)} categories={SEED_CATEGORIES} />
    </Suspense>
  );
}

function ShopFallback() {
  return (
    <section className="container-page py-32">
      <div className="h-8 w-48 animate-pulse rounded-full bg-surface-container" />
    </section>
  );
}
