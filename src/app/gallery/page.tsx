import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Gallery" };

const ITEMS = [
  { title: "Midnight Plum Opera", caption: "Signature · Wedding", featured: true },
  { title: "Ivory Rose Tier", caption: "Wedding · 3 tier" },
  { title: "Gold Leaf Truffle", caption: "Birthday · Belgian chocolate" },
  { title: "Saffron Pistachio", caption: "Heritage · Anniversary" },
  { title: "Raspberry Cloud", caption: "Vanilla chantilly · Anniversary" },
  { title: "Macaron Box · 12", caption: "Treats · French macarons" },
  { title: "Custom Portrait", caption: "Themed · Made to brief" },
  { title: "Velvet Rouge", caption: "Birthday · Red velvet" }
];

export default function GalleryPage() {
  return (
    <section className="container-page py-32">
      <header className="mb-12 max-w-2xl">
        <span className="chip-secondary">A small archive</span>
        <h1 className="mt-4 font-display text-display-xl text-balance">Quiet little artworks we got to bake.</h1>
        <p className="mt-3 text-muted-foreground md:text-lg">
          A rotating selection of work from our atelier. For more, follow along on Facebook & Instagram.
        </p>
      </header>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {ITEMS.map((it, i) => (
          <figure
            key={i}
            className={`mb-6 break-inside-avoid overflow-hidden rounded-3xl border border-border bg-surface/60 ${it.featured ? "row-span-2" : ""}`}
          >
            <div className={`relative ${it.featured ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : i % 3 === 1 ? "aspect-[4/5]" : "aspect-[5/4]"}`}>
              <Image src="/signature-cake.jpg" alt={it.title} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-[1500ms] hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-5 text-background">
                <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">{it.caption}</p>
                <p className="font-display text-lg font-bold">{it.title}</p>
              </div>
            </div>
          </figure>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Link href="/shop" className="btn-primary">Start a custom order</Link>
        <Link href="/contact" className="btn-ghost">Send us a brief</Link>
      </div>
    </section>
  );
}
