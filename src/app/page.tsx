import { Hero } from "@/components/Hero";
import { BentoCategories } from "@/components/BentoCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { OurStory } from "@/components/OurStory";
import { Marquee } from "@/components/Marquee";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { SEED_CATEGORIES, SEED_PRODUCTS, SEED_CONTENT } from "@/lib/data/seed";

export const revalidate = 60;

export default function HomePage() {
  const content = SEED_CONTENT;
  const categories = SEED_CATEGORIES;
  const featured = SEED_PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <Hero content={content} />
      <Marquee
        items={[
          "Built to order",
          "Hand-crafted in Kathmandu",
          "Same-day delivery in valley",
          "By Ratna — homemaker & baker",
          "Vegetarian & egg-free options",
          "Custom themes welcome"
        ]}
      />
      <BentoCategories categories={categories} />
      <FeaturedProducts products={featured} />
      <OurStory content={content} />
      {content.testimonials && content.testimonials.length > 0 && (
        <Testimonials items={content.testimonials} />
      )}
      <CTA />
    </>
  );
}
