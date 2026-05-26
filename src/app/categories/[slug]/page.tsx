import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "@/lib/data/seed";

export async function generateStaticParams() {
  return SEED_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = SEED_CATEGORIES.find((c) => c.slug === slug);
  return { title: c?.name ?? "Category" };
}

export default async function CategoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = SEED_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();
  const items = SEED_PRODUCTS.filter((p) => p.category === slug && p.active);
  return (
    <>
      <section className="container-page pt-32">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <Link href="/categories" className="hover:text-foreground">Categories</Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </div>
        <h1 className="mt-6 font-display text-display-2xl text-balance">{category.name}</h1>
        {category.description && (
          <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">{category.description}</p>
        )}
      </section>
      <section className="container-page pb-32 pt-12">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface/60 p-12 text-center">
            <p className="font-display text-2xl">Nothing here yet.</p>
            <p className="mt-2 text-muted-foreground">Browse the full shop while we add to this category.</p>
            <Link href="/shop" className="btn-primary mt-6 inline-flex">Browse shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </section>
    </>
  );
}
