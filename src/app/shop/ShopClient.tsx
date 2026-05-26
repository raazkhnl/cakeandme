"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import type { Product, Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export function ShopClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const activeCategory = params.get("category") || "all";
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.description.toLowerCase().includes(needle) ||
          (p.flavors || []).some((f) => f.toLowerCase().includes(needle))
      );
    }
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.basePrice - b.basePrice);
    else if (sort === "price-desc") list.sort((a, b) => b.basePrice - a.basePrice);
    else if (sort === "newest") list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [products, activeCategory, q, sort]);

  const setCategory = (slug: string) => {
    const sp = new URLSearchParams(params);
    if (slug === "all") sp.delete("category");
    else sp.set("category", slug);
    router.replace(`/shop${sp.toString() ? "?" + sp.toString() : ""}`, { scroll: false });
  };

  return (
    <>
      <section className="container-page pt-32 pb-12">
        <div className="flex flex-col gap-6">
          <span className="chip-secondary w-max">Our shop</span>
          <h1 className="font-display text-display-xl text-balance">Every cake here is built to order.</h1>
          <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">
            Pick a piece you love. Choose size and flavour at the next step. We confirm and start baking — usually
            within an hour.
          </p>
        </div>
      </section>

      <section className="container-page sticky top-[72px] z-30 -mx-page mb-10 border-y border-border/60 bg-surface/70 px-page py-4 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-3 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setCategory("all")}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
                activeCategory === "all"
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
                  activeCategory === c.slug
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search flavour…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="field !py-2 pl-9 !text-sm"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="field !py-2 !text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </section>

      <section className="container-page pb-32">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface/60 p-12 text-center">
            <p className="font-display text-2xl">Nothing matches that.</p>
            <p className="mt-2 text-muted-foreground">Try clearing filters or searching for a different flavour.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
