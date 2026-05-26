"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Heart, Leaf, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/store/cart";
import { formatNPR, safeImg } from "@/lib/utils";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const addItem = useCart((s) => s.addItem);
  const [sizeIdx, setSizeIdx] = useState(0);
  const sizes = product.sizes ?? [{ label: "Standard", pounds: 1, multiplier: 1 }];
  const [flavor, setFlavor] = useState(product.flavors?.[0] ?? "");
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);

  const unitPrice = useMemo(() => Math.round(product.basePrice * sizes[sizeIdx].multiplier), [product.basePrice, sizes, sizeIdx]);

  const add = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "/logo.png",
      sizeLabel: sizes[sizeIdx].label,
      pounds: sizes[sizeIdx].pounds,
      flavor: flavor || undefined,
      unitPrice,
      quantity: qty,
      notes: notes.trim() || undefined
    });
    toast.success(`${product.name} added`, { description: `${sizes[sizeIdx].label}${flavor ? " · " + flavor : ""}` });
  };

  return (
    <>
      <section className="container-page pt-32">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
              <div className="relative aspect-[4/5] md:aspect-[16/10]">
                <Image
                  src={safeImg(product.images[0])}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 720px, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/30 to-transparent" />
                {product.tagline && (
                  <span className="absolute left-6 top-6 chip-secondary">{product.tagline}</span>
                )}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-2xl border border-border">
                    <Image src={safeImg(src)} alt="" fill sizes="200px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-28 flex flex-col gap-6">
              <div>
                <h1 className="font-display text-display-xl text-balance">{product.name}</h1>
                <p className="mt-3 text-pretty text-muted-foreground md:text-lg">{product.description}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold">{formatNPR(unitPrice)}</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {sizes[sizeIdx].label} · base {formatNPR(product.basePrice)}
                </span>
              </div>

              <div>
                <p className="field-label">Choose size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setSizeIdx(i)}
                      className={`rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                        i === sizeIdx
                          ? "border-transparent bg-primary text-primary-foreground"
                          : "border-border bg-surface/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {product.flavors && product.flavors.length > 0 && (
                <div>
                  <p className="field-label">Flavour</p>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFlavor(f)}
                        className={`rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                          f === flavor
                            ? "border-transparent bg-secondary text-secondary-foreground"
                            : "border-border bg-surface/60 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="field-label">Notes for the baker</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="e.g. 'Less sugar, name on top reads ‘Maya, 6’ in cursive'"
                  className="field"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-border bg-surface/60">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="inline-flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center font-display text-lg">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="inline-flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>
                <button onClick={add} className="btn-primary flex-1">
                  Add to basket
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <ul className="grid grid-cols-1 gap-3 pt-2 text-sm text-muted-foreground sm:grid-cols-2">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-secondary" /> Built to order — no freezer cases</li>
                <li className="flex items-start gap-2"><Leaf className="mt-0.5 h-4 w-4 text-secondary" /> Eggless options on request</li>
                <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-secondary" /> Same-day delivery (Kathmandu valley)</li>
                <li className="flex items-start gap-2"><Heart className="mt-0.5 h-4 w-4 text-secondary" /> Hand-finished by Ratna</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page py-32">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-display-lg">You might also like</h2>
            <Link
              href={`/shop?category=${product.category}`}
              className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              See more in {product.category}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
