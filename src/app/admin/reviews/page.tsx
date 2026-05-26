"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Star, Check, Trash2, X } from "lucide-react";
import { SEED_PRODUCTS } from "@/lib/data/seed";
import { listProducts } from "@/lib/data/products";
import { listReviews, moderateReview, deleteReview } from "@/lib/data/reviews";
import type { Product, ProductReview } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminReviews() {
  const [products, setProducts] = useState<Product[]>([]);
  const [grouped, setGrouped] = useState<Record<string, ProductReview[]>>({});
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const all = (await listProducts()).length > 0 ? await listProducts() : SEED_PRODUCTS;
    setProducts(all);
    const next: Record<string, ProductReview[]> = {};
    for (const p of all) {
      next[p.id] = await listReviews(p.id, { all: true });
    }
    setGrouped(next);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const action = async (productId: string, reviewId: string, type: "approve" | "reject" | "delete") => {
    try {
      if (type === "delete") await deleteReview(productId, reviewId);
      else await moderateReview(productId, reviewId, type === "approve");
      await refresh();
      toast.success("Done");
    } catch (err) {
      toast.error("Failed", { description: (err as Error).message });
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip-secondary">Voices</span>
          <h1 className="mt-4 font-display text-display-xl">Reviews moderation</h1>
        </div>
        <div className="flex gap-2">
          {(["pending", "approved", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${filter === f ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="h-32 animate-pulse rounded-3xl bg-surface-container" />
      ) : (
        <div className="space-y-6">
          {products.map((p) => {
            const list = (grouped[p.id] ?? []).filter((r) => filter === "all" ? true : filter === "approved" ? r.approved : !r.approved);
            if (list.length === 0) return null;
            return (
              <section key={p.id} className="glass rounded-3xl p-6">
                <header className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold">{p.name}</h2>
                  <span className="text-xs text-muted-foreground">{list.length} {filter} review{list.length === 1 ? "" : "s"}</span>
                </header>
                <ul className="space-y-3">
                  {list.map((r) => (
                    <li key={r.id} className="rounded-2xl border border-border bg-surface/60 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base font-semibold">{r.name}</span>
                          <Stars value={r.rating} />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{formatDate(r.createdAt)}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                      <div className="mt-3 flex gap-2">
                        {!r.approved && (
                          <button onClick={() => action(p.id, r.id, "approve")} className="inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-success"><Check className="h-3 w-3" /> Approve</button>
                        )}
                        {r.approved && (
                          <button onClick={() => action(p.id, r.id, "reject")} className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"><X className="h-3 w-3" /> Unpublish</button>
                        )}
                        <button onClick={() => action(p.id, r.id, "delete")} className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-danger"><Trash2 className="h-3 w-3" /> Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {products.every((p) => (grouped[p.id] ?? []).filter((r) => filter === "all" ? true : filter === "approved" ? r.approved : !r.approved).length === 0) && (
            <div className="glass rounded-3xl p-10 text-center text-muted-foreground">No {filter} reviews.</div>
          )}
        </div>
      )}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((v) => (
        <Star key={v} className={`h-3.5 w-3.5 ${v <= value ? "fill-secondary text-secondary" : "text-muted-foreground"}`} />
      ))}
    </span>
  );
}
