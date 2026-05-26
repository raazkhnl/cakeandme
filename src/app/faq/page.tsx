"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "How much notice do you need?", a: "Most cakes need 48 hours. Wedding cakes and elaborate themed cakes are best booked at least a week ahead — feel free to message us to check." },
  { q: "Do you do eggless or vegan cakes?", a: "Yes. Eggless versions of most cakes are available at no extra cost. Vegan and dairy-free options are possible — drop us a note and we'll discuss." },
  { q: "How do you deliver?", a: "We deliver across Kathmandu valley. Delivery is ₨200 within Ring Road, slightly more outside. We hand-carry tiered cakes ourselves." },
  { q: "Can I customise the design?", a: "Absolutely — that's most of what we do. Share a reference photo, a theme, or even just a colour palette, and we'll work with you on a sketch before baking." },
  { q: "How do payments work?", a: "QR / mobile-banking (with screenshot upload) and cash on delivery are always available. Khalti and eSewa are available when configured. We confirm payment manually within an hour." },
  { q: "I don't want to make an account.", a: "Order as a guest — checkout works the same. Use the same email later at /track to see your order's status." },
  { q: "Refunds?", a: "Once a cake has begun, we can't refund — ingredients are perishable. We'll happily fix any mistake on our side." }
];

export const dynamic = "force-static";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-page py-32">
      <header className="mb-12 max-w-2xl">
        <span className="chip-secondary">Good questions</span>
        <h1 className="mt-4 font-display text-display-xl text-balance">Frequently asked.</h1>
        <p className="mt-3 text-muted-foreground md:text-lg">
          Couldn't find what you're looking for? <a href="/contact" className="underline">Get in touch</a>.
        </p>
      </header>
      <div className="divide-y divide-border/60">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="py-5">
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 text-left">
                <span className="font-display text-xl font-semibold text-balance">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`grid overflow-hidden text-pretty text-muted-foreground transition-all duration-500 ${
                  isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0">
                  <p className="text-base leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
