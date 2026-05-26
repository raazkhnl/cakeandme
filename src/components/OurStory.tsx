"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function OurStory({ content }: { content: SiteContent }) {
  return (
    <section id="our-story" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-secondary/30 via-accent/15 to-primary/25 blur-2xl"
          />
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-surface">
            <Image
              src="/signature-cake.jpg"
              alt="Ratna's atelier"
              fill
              sizes="(min-width: 768px) 480px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden max-w-[210px] rounded-2xl border border-border bg-surface/90 p-5 backdrop-blur-xl md:block">
            <MapPin className="mb-2 h-5 w-5 text-secondary" />
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{content.about.locationLine}</p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <span className="chip-secondary w-max">Our story</span>
          <h2 className="font-display text-display-lg text-balance">{content.about.title}</h2>
          <div className="hairline" />
          {content.about.body.map((p, i) => (
            <p key={i} className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {p}
            </p>
          ))}
          <div className="mt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-secondary"
            >
              Read the full story
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
