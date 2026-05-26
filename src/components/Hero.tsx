"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid min-h-[92vh] grid-cols-1 items-center gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip-secondary w-max"
          >
            <Sparkles className="h-3 w-3" />
            {content.hero.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-display-xl md:text-display-2xl tracking-tight text-foreground"
          >
            {content.hero.title}
            <br />
            <span className="bg-gradient-to-br from-surface-tint via-primary to-accent bg-clip-text italic text-transparent">
              {content.hero.italicTitle}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <Link href="/shop" className="btn-primary">
              Explore collection
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Book a consultation
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {[
              { k: "100%", v: "Built to order" },
              { k: "1-on-1", v: "Designed with Ratna" },
              { k: "Same-day", v: "Delivery in valley" }
            ].map((s) => (
              <div key={s.k} className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight">{s.k}</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{s.v}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative hidden md:block"
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-secondary/40 via-accent/20 to-primary/30 opacity-60 blur-2xl"
            />
            <div className="glass relative grain overflow-hidden rounded-3xl p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary/5">
                <Image
                  src="/signature-cake.jpg"
                  alt={content.hero.signatureName}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className="object-cover transition-transform duration-[1500ms] hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5 text-background">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">{content.hero.signatureLabel}</p>
                    <p className="font-display text-xl font-bold leading-tight">{content.hero.signatureName}</p>
                  </div>
                  <Link
                    href="/shop"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur"
                    aria-label="Explore signature"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-8 -left-8 hidden max-w-[200px] rounded-2xl border border-border bg-surface/90 p-5 backdrop-blur-xl xl:block"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Hand-crafted in</p>
              <p className="mt-1 font-display text-xl font-bold">Kathmandu</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
