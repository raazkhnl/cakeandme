"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = { name: string; quote: string; occasion?: string };

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-4">
          <span className="chip-secondary w-max">In their words</span>
          <h2 className="font-display text-display-lg max-w-2xl text-balance">
            Small notes from people whose celebrations we got to be part of.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass grain relative flex h-full flex-col gap-5 rounded-3xl p-7"
            >
              <Quote className="h-8 w-8 text-secondary" />
              <blockquote className="font-display text-xl italic leading-snug text-foreground md:text-2xl">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                {t.occasion && (
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{t.occasion}</p>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
