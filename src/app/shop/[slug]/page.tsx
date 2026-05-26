import { notFound } from "next/navigation";
import { ProductDetail } from "./ProductDetail";
import { SEED_PRODUCTS } from "@/lib/data/seed";

export async function generateStaticParams() {
  return SEED_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = SEED_PRODUCTS.find((p) => p.slug === slug);
  return { title: p?.name ?? "Cake" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = SEED_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();
  const related = SEED_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  return <ProductDetail product={product} related={related} />;
}
