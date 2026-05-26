import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-20">
      <div className="container-page">
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-24">
          <div
            aria-hidden
            className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-secondary/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
          />
          <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-secondary">Ready when you are</p>
              <h2 className="mt-3 font-display text-display-xl text-balance">
                Have a date in mind?
                <br />
                <span className="italic text-surface-tint">Let's build something quietly extraordinary.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <Link href="/shop" className="btn-primary">
                Start your order
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
