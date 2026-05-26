import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, HandHeart, Sparkles, Wheat } from "lucide-react";
import { SEED_CONTENT } from "@/lib/data/seed";

export const metadata = { title: "Our story" };

const objectives = [
  { icon: <Sparkles className="h-5 w-5" />, title: "Built to order", body: "Nothing pre-baked, nothing frozen. Each cake is made the day before it travels." },
  { icon: <HandHeart className="h-5 w-5" />, title: "Quiet customer service", body: "We pick up the phone. We follow up. We treat your order like our own." },
  { icon: <Wheat className="h-5 w-5" />, title: "Honest ingredients", body: "Real butter, local dairy, vanilla beans not essence — no shortcuts where it matters." },
  { icon: <Award className="h-5 w-5" />, title: "Try one new thing", body: "Every month, we experiment with a flavour pairing we've never tried. Sometimes it makes it onto the menu." }
];

export default function AboutPage() {
  const c = SEED_CONTENT;
  return (
    <>
      <section className="container-page pt-32">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <span className="chip-secondary">Our story</span>
            <h1 className="mt-4 font-display text-display-2xl text-balance">
              We bake one celebration at a time.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-muted-foreground md:text-lg">
              Cakes by Ratna is an independent atelier — small enough to remember your child's name, careful enough to
              treat every order like the most important one of the week.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border md:col-span-5">
            <Image src="/signature-cake.jpg" alt="" fill sizes="(min-width: 768px) 480px, 90vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="chip">Founder</span>
            <h2 className="mt-3 font-display text-display-lg">Ratna — homemaker, chief baker.</h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-pretty text-muted-foreground md:text-lg">
            {c.about.body.map((p, i) => <p key={i}>{p}</p>)}
            <p>
              Cakes by Ratna started in a home kitchen and stays in a home kitchen — slowly, deliberately, no shortcuts.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="mb-12 flex flex-col gap-4">
          <span className="chip-secondary w-max">What we care about</span>
          <h2 className="font-display text-display-lg max-w-2xl text-balance">
            Our objectives — kept short, kept honest.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {objectives.map((o) => (
            <div key={o.title} className="glass rounded-3xl p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">{o.icon}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{o.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20">
          <span className="chip-secondary">Visit</span>
          <h2 className="mt-3 font-display text-display-lg">{c.about.locationLine}</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Open by appointment. If you'd like to come over with a brief, a reference photo, or just a wild idea — give us a call.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/shop" className="btn-ghost">Browse shop</Link>
          </div>
        </div>
      </section>
    </>
  );
}
