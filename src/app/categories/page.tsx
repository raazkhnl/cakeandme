import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SEED_CATEGORIES } from "@/lib/data/seed";

export const metadata = { title: "Categories" };

export default function CategoriesPage() {
  const cats = [...SEED_CATEGORIES].sort((a, b) => a.order - b.order);
  return (
    <section className="container-page py-32">
      <header className="mb-12 max-w-2xl">
        <span className="chip-secondary">Browse</span>
        <h1 className="mt-4 font-display text-display-xl text-balance">All our categories.</h1>
        <p className="mt-3 text-muted-foreground md:text-lg">
          A small, deliberate menu. Each category has only the cakes we think are worth your celebration.
        </p>
      </header>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <li key={c.id} className="group">
            <Link
              href={`/categories/${c.slug}`}
              className="relative flex h-72 flex-col justify-between overflow-hidden rounded-3xl border border-border p-7"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 transition-transform duration-700 group-hover:scale-110"
              />
              <span className="chip">{String(c.order).padStart(2, "0")} · {c.slug}</span>
              <div>
                <h2 className="font-display text-3xl font-bold leading-tight">{c.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
