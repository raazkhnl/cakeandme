"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User2, X, Moon, Sun, ShieldCheck, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/auth/useAuth";
import { SearchDialog } from "@/components/SearchDialog";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Our Story" },
  { href: "/track", label: "Track Order" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isOpen, openCart, count } = useCart();
  const { user, isAdmin } = useAuth();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const total = mounted ? count() : 0;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled ? "border-b border-border/60 bg-surface/70 backdrop-blur-2xl" : "bg-transparent"
        )}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="Cakes by Ratna home">
            <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/5 ring-1 ring-border">
              <Image src="/logo.png" alt="" width={40} height={40} className="object-contain" />
            </span>
            <span className="hidden flex-col leading-tight md:flex">
              <span className="font-display text-lg font-bold tracking-tight text-foreground">Cakes by Ratna</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Atelier · Kathmandu</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-secondary to-secondary/0" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              <Heart className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {isAdmin && (
              <Link
                href="/admin"
                className="hidden items-center gap-1 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary md:inline-flex"
              >
                <ShieldCheck className="h-3 w-3" />
                Admin
              </Link>
            )}

            <Link
              href={user ? "/account" : "/login"}
              aria-label={user ? "Account" : "Sign in"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground"
            >
              <User2 className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Open cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ShoppingBag className="h-4 w-4" />
              {total > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-semibold text-secondary-foreground">
                  {total}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl lg:hidden">
            <div className="container-page flex h-[72px] items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo.png" alt="" width={36} height={36} className="object-contain" />
                <span className="font-display text-lg font-bold">Cakes by Ratna</span>
              </Link>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="container-page flex flex-col gap-1 pt-8">
              {NAV.map((item, i) => (
                <Link key={item.href} href={item.href} className="group flex items-baseline justify-between border-b border-border/50 py-5">
                  <span className="font-display text-4xl tracking-tight text-foreground">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">0{i + 1}</span>
                </Link>
              ))}
              <Link href="/wishlist" className="group flex items-baseline justify-between border-b border-border/50 py-5">
                <span className="font-display text-4xl tracking-tight text-foreground">Wishlist</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">0{NAV.length + 1}</span>
              </Link>
              {isAdmin && (
                <Link href="/admin" className="mt-6 chip-secondary inline-flex w-max">
                  <ShieldCheck className="h-3 w-3" />
                  Admin panel
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
