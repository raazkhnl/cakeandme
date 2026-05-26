"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { addReview, listReviews } from "@/lib/data/reviews";
import { useAuth } from "@/lib/auth/useAuth";
import type { ProductReview } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ReviewSection({ productId }: { productId: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      setReviews(await listReviews(productId));
      setLoading(false);
    })();
  }, [productId]);

  useEffect(() => {
    if (user) {
      setName((n) => n || user.displayName || (user.email ? user.email.split("@")[0] : ""));
    }
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return toast.error("Tell us your name and a short note");
    setSubmitting(true);
    try {
      await addReview(productId, {
        uid: user?.uid ?? null,
        name: name.trim(),
        rating,
        body: body.trim()
      });
      setBody("");
      toast.success("Thanks — your review will appear after a quick moderation.");
    } catch (err) {
      toast.error("Couldn't submit", { description: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  };

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section className="container-page py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="chip-secondary">In their words</span>
          <h2 className="mt-3 font-display text-display-lg">What customers say</h2>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <Stars value={Math.round(avg)} />
            <span className="text-sm text-muted-foreground">
              {avg.toFixed(1)} · {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {loading ? (
            <div className="h-24 animate-pulse rounded-3xl bg-surface-container" />
          ) : reviews.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface/60 p-8 text-center text-muted-foreground">
              No reviews yet. Be the first.
            </div>
          ) : (
            reviews.map((r) => (
              <article key={r.id} className="glass rounded-3xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-base font-semibold">{r.name}</p>
                  <Stars value={r.rating} />
                </div>
                <p className="mt-2 text-pretty text-sm text-muted-foreground">{r.body}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{formatDate(r.createdAt)}</p>
              </article>
            ))
          )}
        </div>

        <form onSubmit={submit} className="glass rounded-3xl p-7 lg:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Leave a review</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Ate this cake? Tell us.</h3>

          <div className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => setRating(v as 1 | 2 | 3 | 4 | 5)}
                aria-label={`${v} star${v === 1 ? "" : "s"}`}
                className="p-1"
              >
                <Star className={`h-6 w-6 ${v <= rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>

          <label className="mt-4 block">
            <span className="field-label">Your name</span>
            <input className="field" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="mt-4 block">
            <span className="field-label">A few honest words</span>
            <textarea className="field" rows={4} value={body} onChange={(e) => setBody(e.target.value)} required />
          </label>

          <button disabled={submitting} className="btn-primary mt-5 w-full">
            {submitting ? "Submitting…" : "Submit review"}
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Reviews appear after a quick moderation.
          </p>
        </form>
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((v) => (
        <Star key={v} className={`h-4 w-4 ${v <= value ? "fill-secondary text-secondary" : "text-muted-foreground"}`} />
      ))}
    </span>
  );
}
