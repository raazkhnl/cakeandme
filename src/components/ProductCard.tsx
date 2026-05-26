"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatNPR, safeImg } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/60 backdrop-blur-sm hover-lift"
    >
      <Link href={`/shop/${product.slug}`} className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={safeImg(product.images[0])}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 chip">{product.tagline ?? product.category}</span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-semibold leading-tight">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            from <span className="text-foreground">{formatNPR(product.basePrice)}</span>
          </p>
          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45"
            aria-label={`View ${product.name}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
