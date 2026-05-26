"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatNPR, safeImg } from "@/lib/utils";

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal } = useCart();
  const total = subtotal();

  return (
    <section className="container-page py-32">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <span className="chip-secondary">Your basket</span>
          <h1 className="mt-4 font-display text-display-xl">Cart</h1>
        </div>
        <Link href="/shop" className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
          Continue browsing
        </Link>
      </header>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-border bg-surface/60 p-16 text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface-low/60">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="font-display text-3xl">Your basket is empty</p>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Add a cake or two and they'll appear here.
          </p>
          <Link href="/shop" className="btn-primary mt-6">Browse cakes</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <ul className="divide-y divide-border lg:col-span-8">
            {items.map((item) => (
              <li key={`${item.productId}-${item.sizeLabel}-${item.flavor}`} className="flex gap-5 py-6">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border">
                  <Image src={safeImg(item.image)} alt={item.name} fill sizes="120px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/shop/${item.slug}`} className="font-display text-xl font-semibold hover:underline">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.sizeLabel}
                        {item.flavor ? ` · ${item.flavor}` : ""}
                      </p>
                      {item.notes && <p className="mt-2 max-w-md text-sm italic text-muted-foreground">"{item.notes}"</p>}
                    </div>
                    <button onClick={() => removeItem(item.productId, item.sizeLabel, item.flavor)} className="text-muted-foreground hover:text-foreground" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center rounded-full border border-border bg-surface/60">
                      <button onClick={() => setQuantity(item.productId, item.sizeLabel, item.flavor, item.quantity - 1)} className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"><Minus className="h-3 w-3" /></button>
                      <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => setQuantity(item.productId, item.sizeLabel, item.flavor, item.quantity + 1)} className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"><Plus className="h-3 w-3" /></button>
                    </div>
                    <p className="font-display text-lg font-semibold">{formatNPR(item.unitPrice * item.quantity)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:col-span-4">
            <div className="glass sticky top-28 rounded-3xl p-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Summary</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">{formatNPR(total)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="my-5 h-px bg-border/60" />
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Total</span>
                <span className="font-display text-3xl font-bold">{formatNPR(total)}</span>
              </div>
              <Link href="/checkout" className="btn-primary mt-6 w-full">Checkout</Link>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                No account needed. Track later with the same email.
              </p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
