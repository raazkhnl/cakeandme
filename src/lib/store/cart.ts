"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, sizeLabel: string, flavor?: string) => void;
  setQuantity: (productId: string, sizeLabel: string, flavor: string | undefined, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

const keyOf = (productId: string, size: string, flavor?: string) => `${productId}::${size}::${flavor || ""}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (item) => {
        const items = [...get().items];
        const existing = items.findIndex(
          (i) => keyOf(i.productId, i.sizeLabel, i.flavor) === keyOf(item.productId, item.sizeLabel, item.flavor)
        );
        if (existing >= 0) {
          items[existing].quantity += item.quantity;
        } else {
          items.push(item);
        }
        set({ items, isOpen: true });
      },
      removeItem: (productId, size, flavor) =>
        set({
          items: get().items.filter((i) => keyOf(i.productId, i.sizeLabel, i.flavor) !== keyOf(productId, size, flavor))
        }),
      setQuantity: (productId, size, flavor, quantity) =>
        set({
          items: get()
            .items.map((i) =>
              keyOf(i.productId, i.sizeLabel, i.flavor) === keyOf(productId, size, flavor)
                ? { ...i, quantity: Math.max(1, quantity) }
                : i
            )
        }),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((s, i) => s + i.unitPrice * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0)
    }),
    {
      name: "cbr-cart-v1",
      partialize: (s) => ({ items: s.items })
    }
  )
);
