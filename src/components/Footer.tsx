"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_BRAND_PHONE || "+977 9863244500";
  const email = process.env.NEXT_PUBLIC_BRAND_EMAIL || "cakebyratna@gmail.com";
  const fb = process.env.NEXT_PUBLIC_BRAND_FB || "https://www.facebook.com/cakebyratna";

  return (
    <footer className="relative mt-32 border-t border-border/60 bg-surface-low/40">
      <div className="container-page py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={44} height={44} className="rounded-full bg-primary/5 p-1 ring-1 ring-border" />
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">Cakes by Ratna</p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">An independent atelier</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Built-to-order cakes, made slowly in a real home kitchen. We bake one celebration at a time —
              so we can do each one well.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href={fb} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/cakebyratna" target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={`tel:${phone.replace(/\s/g, "")}`} aria-label="Phone" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground">
                <Phone className="h-4 w-4" />
              </a>
              <a href={`mailto:${email}`} aria-label="Email" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-foreground">Explore</p>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground">Shop</Link></li>
              <li><Link href="/about" className="hover:text-foreground">Our story</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/track" className="hover:text-foreground">Track order</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-foreground">Visit</p>
            <p className="text-sm text-muted-foreground">Kathmandu, Nepal</p>
            <p className="mt-3 text-sm text-muted-foreground">{email}</p>
            <p className="text-sm text-muted-foreground">{phone}</p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Open by appointment · Daily, 9–6
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Cakes by Ratna · Hand-crafted in Kathmandu</p>
          <p>Site by a quietly obsessive engineer.</p>
        </div>
      </div>
    </footer>
  );
}
