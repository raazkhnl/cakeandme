"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";

const accents = [
  "from-primary/85 via-primary/50 to-transparent",
  "from-accent/85 via-accent/30 to-transparent",
  "from-surface-tint/85 via-surface-tint/40 to-transparent",
  "from-secondary/70 via-secondary/30 to-transparent",
  "from-primary/80 via-accent/40 to-transparent"
];

export function BentoCategories({ categories }: { categories: Category[] }) {
  const cats = categories.slice(0, 5);
  return (
    <section id="categories" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="chip-secondary">A curated atelier</span>
            <h2 className="mt-4 font-display text-display-lg text-balance">
              Categories, but only the ones we'd bake for our own family.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-secondary"
          >
            View entire shop
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid auto-rows-[260px] grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {cats.map((c, i) => {
            const span = i === 0 ? "md:col-span-2" : i === 4 ? "md:col-span-3" : "md:col-span-1";
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`group relative overflow-hidden rounded-3xl ${span}`}
              >
                <Link href={`/shop?category=${c.slug}`} className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-low transition-transform duration-700 group-hover:scale-105"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-95"
                    style={{
                      background: `radial-gradient(120% 100% at 0% 100%, hsl(var(--primary) / 0.55), transparent 60%), linear-gradient(135deg, hsl(var(--surface-tint) / 0.25), hsl(var(--secondary) / 0.18))`
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${accents[i % accents.length]}`}
                    aria-hidden
                  />
                  <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/15 text-[10px] font-semibold uppercase tracking-[0.18em] text-background/90 ring-1 ring-background/30">
                        0{i + 1}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-background/80">
                        {c.slug.replace(/-/g, " ")}
                      </span>
                    </div>
                    <div className="space-y-3 text-background">
                      <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">{c.name}</h3>
                      {c.description && (
                        <p className="max-w-md text-pretty text-sm text-background/85">{c.description}</p>
                      )}
                      <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-background">
                        Explore <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
