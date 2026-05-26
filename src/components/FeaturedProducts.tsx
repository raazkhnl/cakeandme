"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatNPR, safeImg } from "@/lib/utils";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="chip-secondary">House favourites</span>
            <h2 className="mt-4 font-display text-display-lg text-balance">
              The ones people keep coming back for.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            Browse all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 backdrop-blur-sm hover-lift"
            >
              <Link href={`/shop/${p.slug}`} className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={safeImg(p.images[0])}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 chip">{p.tagline ?? p.category}</span>
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-display text-xl font-semibold leading-tight">{p.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    from <span className="text-foreground">{formatNPR(p.basePrice)}</span>
                  </p>
                  <Link
                    href={`/shop/${p.slug}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45"
                    aria-label={`View ${p.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
