"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  items: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) =>
        set((s) => {
          const has = s.items.includes(productId);
          return { items: has ? s.items.filter((i) => i !== productId) : [...s.items, productId] };
        }),
      has: (productId) => get().items.includes(productId),
      clear: () => set({ items: [] })
    }),
    { name: "cbr-wishlist-v1", partialize: (s) => ({ items: s.items }) }
  )
);
