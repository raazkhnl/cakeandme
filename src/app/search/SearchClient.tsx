"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SEED_PRODUCTS } from "@/lib/data/seed";

export function SearchClient() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);

  useEffect(() => setQ(initial), [initial]);

  const needle = q.trim().toLowerCase();
  const results = useMemo(
    () =>
      !needle
        ? []
        : SEED_PRODUCTS.filter(
            (p) =>
              p.name.toLowerCase().includes(needle) ||
              p.description.toLowerCase().includes(needle) ||
              (p.flavors ?? []).some((f) => f.toLowerCase().includes(needle)) ||
              p.category.toLowerCase().includes(needle)
          ),
    [needle]
  );

  return (
    <section className="container-page py-32">
      <header className="mb-10 max-w-2xl">
        <span className="chip-secondary">Search</span>
        <h1 className="mt-4 font-display text-display-xl">Find a cake.</h1>
        <label className="relative mt-6 block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try ‘chocolate’, ‘plum’, ‘wedding’…"
            className="field !py-4 pl-11 !text-base"
          />
        </label>
      </header>

      {needle.length === 0 ? (
        <div className="rounded-3xl border border-border bg-surface/60 p-10 text-center text-muted-foreground">
          Start typing to search the menu.
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-3xl border border-border bg-surface/60 p-10 text-center text-muted-foreground">
          No matches. Try <Link href="/shop" className="underline">browsing the shop</Link>.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </section>
  );
}
