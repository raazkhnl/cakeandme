"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { SEED_PRODUCTS } from "@/lib/data/seed";
import { safeImg } from "@/lib/utils";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (open) setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return SEED_PRODUCTS.filter((p) => p.featured).slice(0, 5);
    return SEED_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        (p.flavors ?? []).some((f) => f.toLowerCase().includes(needle))
    ).slice(0, 8);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] bg-foreground/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-24 w-full max-w-2xl rounded-3xl border border-border bg-surface p-2 shadow-2xl"
          >
            <label className="relative flex items-center px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search cakes, flavours, occasions…"
                className="flex-1 bg-transparent px-3 text-base outline-none"
              />
              <button onClick={onClose} aria-label="Close search" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border">
                <X className="h-4 w-4" />
              </button>
            </label>
            <div className="max-h-[60vh] overflow-y-auto border-t border-border/60 p-2">
              {results.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">No matches.</p>
              ) : (
                <ul className="divide-y divide-border/60">
                  {!q && <li className="px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Suggested · house favourites</li>}
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/shop/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-low/60"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-border">
                          <Image src={safeImg(p.images[0])} alt="" fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{p.category}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
