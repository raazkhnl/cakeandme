"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatNPR, safeImg } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, setQuantity, removeItem, subtotal, clear } = useCart();
  const total = subtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 z-[80] flex h-screen w-full max-w-md flex-col border-l border-border bg-surface text-foreground"
          >
            <header className="flex items-center justify-between border-b border-border/60 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Your selection</p>
                <p className="font-display text-2xl font-bold">Sweet things</p>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface-low/60">
                  <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-display text-2xl">Your basket is empty</p>
                <p className="text-sm text-muted-foreground">
                  Wander the shop. We've kept the kitchen warm.
                </p>
                <Link href="/shop" onClick={closeCart} className="btn-primary mt-2">
                  Browse cakes
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-border/50 overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.sizeLabel}-${item.flavor}`} className="flex gap-4 py-5">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-low ring-1 ring-border">
                        <Image src={safeImg(item.image)} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-base font-semibold leading-tight">{item.name}</p>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                              {item.sizeLabel}
                              {item.flavor ? ` · ${item.flavor}` : ""}
                            </p>
                          </div>
                          <button onClick={() => removeItem(item.productId, item.sizeLabel, item.flavor)} aria-label="Remove" className="text-muted-foreground hover:text-foreground">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border bg-surface-low/60">
                            <button onClick={() => setQuantity(item.productId, item.sizeLabel, item.flavor, item.quantity - 1)} className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Decrease">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => setQuantity(item.productId, item.sizeLabel, item.flavor, item.quantity + 1)} className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Increase">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-display text-base font-semibold">{formatNPR(item.unitPrice * item.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="border-t border-border/60 px-6 py-6">
                  <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>Subtotal</span>
                    <span>Delivery calculated at checkout</span>
                  </div>
                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="font-display text-3xl font-bold">{formatNPR(total)}</span>
                    <button onClick={clear} className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                      Clear
                    </button>
                  </div>
                  <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                    Proceed to checkout
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
