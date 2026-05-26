"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export function SuccessClient() {
  const params = useSearchParams();
  const code = params.get("code") ?? "";
  const [confettiOn, setConfettiOn] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setConfettiOn(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const copy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    toast.success("Code copied");
  };

  return (
    <section className="container-page py-32">
      <div className="relative mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12 }}
          className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary/15 text-secondary"
        >
          <Check className="h-9 w-9" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 font-display text-display-xl text-balance"
        >
          Your order is in. Thank you.
        </motion.h1>
        <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
          We've started a tiny celebration in the kitchen. You'll hear back from us shortly.
        </p>

        {code && (
          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-5 py-2.5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Order code</span>
            <span className="font-display text-lg font-bold">{code}</span>
            <button onClick={copy} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary" aria-label="Copy code">
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href={code ? `/track?code=${code}` : "/track"} className="btn-primary">Track your order</Link>
          <Link href="/shop" className="btn-ghost">Keep browsing</Link>
        </div>

        {confettiOn && (
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 400, opacity: [0, 1, 1, 0], rotate: 360 }}
                transition={{ duration: 1.6, delay: i * 0.03, ease: "easeOut" }}
                className="absolute top-0 inline-block h-2 w-2 rounded-full"
                style={{
                  left: `${(i * 6 + 5) % 100}%`,
                  background: i % 3 === 0 ? "hsl(var(--secondary))" : i % 3 === 1 ? "hsl(var(--surface-tint))" : "hsl(var(--primary))"
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
