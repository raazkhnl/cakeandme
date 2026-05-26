"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteProduct, listProducts } from "@/lib/data/products";
import type { Product } from "@/lib/types";
import { formatNPR, safeImg } from "@/lib/utils";
import { firebaseConfigured } from "@/lib/firebase/client";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    setProducts(await listProducts());
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const remove = async (p: Product) => {
    if (!confirm(`Delete ${p.name}? This cannot be undone.`)) return;
    try {
      await deleteProduct(p.id);
      toast.success("Deleted");
      refresh();
    } catch (err) {
      toast.error("Delete failed", { description: (err as Error).message });
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip-secondary">Catalogue</span>
          <h1 className="mt-4 font-display text-display-xl">Products</h1>
          {!firebaseConfigured && (
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Firebase isn't configured — you're viewing seed data. Add env vars and reload to manage live products.
            </p>
          )}
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </header>

      {loading ? (
        <div className="h-32 animate-pulse rounded-3xl bg-surface-container" />
      ) : products.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-muted-foreground">No products yet. Add one to begin.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="glass overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/3]">
                <Image src={safeImg(p.images[0])} alt={p.name} fill sizes="300px" className="object-cover" />
                {!p.active && <span className="absolute right-3 top-3 chip">Hidden</span>}
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold leading-tight">{p.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{p.category} · from {formatNPR(p.basePrice)}</p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/admin/products/${p.id}`} className="btn-ghost flex-1">
                    <Pencil className="h-3 w-3" /> Edit
                  </Link>
                  <button onClick={() => remove(p)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-danger" aria-label="Delete" disabled={!firebaseConfigured}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
