import type { Product, Category, SiteContent } from "@/lib/types";

export const SEED_CATEGORIES: Category[] = [
  { id: "wedding", slug: "wedding", name: "Wedding Cakes", description: "Architectural elegance for your most important day.", order: 1 },
  { id: "birthday", slug: "birthday", name: "Birthday Specials", description: "Personalised showstoppers for every age.", order: 2 },
  { id: "anniversary", slug: "anniversary", name: "Anniversary", description: "Romance, sculpted in sugar.", order: 3 },
  { id: "treats", slug: "treats", name: "Artisanal Treats", description: "Bite-sized perfection — cupcakes, tarts, macarons.", order: 4 },
  { id: "themed", slug: "themed", name: "Themed & Custom", description: "From cartoon heroes to corporate logos.", order: 5 }
];

const placeholderImage = "/signature-cake.jpg";

export const SEED_PRODUCTS: Product[] = [
  {
    id: "midnight-plum-opera",
    slug: "midnight-plum-opera",
    name: "Midnight Plum Opera",
    tagline: "Signature",
    description: "Layers of plum mousse, dark chocolate génoise and edible gold leaf — our most-requested showstopper.",
    category: "wedding",
    basePrice: 2400,
    sizes: [
      { label: "1 lb", pounds: 1, multiplier: 1 },
      { label: "2 lb", pounds: 2, multiplier: 1.9 },
      { label: "3 lb", pounds: 3, multiplier: 2.7 }
    ],
    flavors: ["Plum & Dark Chocolate", "Plum & Vanilla Bean"],
    images: [placeholderImage],
    featured: true,
    active: true
  },
  {
    id: "ivory-rose-tier",
    slug: "ivory-rose-tier",
    name: "Ivory Rose Tier",
    tagline: "Wedding",
    description: "Three-tier ivory cake with hand-piped sugar roses and a whisper of cardamom.",
    category: "wedding",
    basePrice: 5200,
    sizes: [
      { label: "3 lb", pounds: 3, multiplier: 1 },
      { label: "5 lb", pounds: 5, multiplier: 1.55 },
      { label: "8 lb", pounds: 8, multiplier: 2.3 }
    ],
    flavors: ["Vanilla & Cardamom", "Almond & Rose"],
    images: [placeholderImage],
    featured: true,
    active: true
  },
  {
    id: "gold-leaf-truffle",
    slug: "gold-leaf-truffle",
    name: "Gold Leaf Truffle",
    tagline: "Birthday",
    description: "Belgian chocolate truffle with a mirror glaze and 24K edible gold accents.",
    category: "birthday",
    basePrice: 1800,
    sizes: [
      { label: "1 lb", pounds: 1, multiplier: 1 },
      { label: "2 lb", pounds: 2, multiplier: 1.9 }
    ],
    flavors: ["Dark Chocolate", "Milk Chocolate", "Hazelnut"],
    images: [placeholderImage],
    featured: true,
    active: true
  },
  {
    id: "raspberry-cloud",
    slug: "raspberry-cloud",
    name: "Raspberry Cloud",
    tagline: "Anniversary",
    description: "Whipped vanilla chantilly, fresh raspberries, almond sablé crust.",
    category: "anniversary",
    basePrice: 2100,
    sizes: [
      { label: "1 lb", pounds: 1, multiplier: 1 },
      { label: "2 lb", pounds: 2, multiplier: 1.9 }
    ],
    flavors: ["Raspberry & Vanilla", "Raspberry & Lychee"],
    images: [placeholderImage],
    active: true
  },
  {
    id: "saffron-pistachio",
    slug: "saffron-pistachio",
    name: "Saffron Pistachio",
    tagline: "Heritage",
    description: "Persian-inspired sponge soaked in saffron syrup, layered with pistachio praline.",
    category: "anniversary",
    basePrice: 2300,
    sizes: [
      { label: "1 lb", pounds: 1, multiplier: 1 },
      { label: "2 lb", pounds: 2, multiplier: 1.9 }
    ],
    flavors: ["Saffron & Pistachio"],
    images: [placeholderImage],
    active: true
  },
  {
    id: "macaron-box-12",
    slug: "macaron-box-12",
    name: "Macaron Box · 12",
    tagline: "Treats",
    description: "An assortment of twelve French macarons — rotating flavours of the week.",
    category: "treats",
    basePrice: 1200,
    sizes: [{ label: "Box of 12", pounds: 1, multiplier: 1 }],
    flavors: ["Chef's selection"],
    images: [placeholderImage],
    featured: true,
    active: true
  },
  {
    id: "custom-portrait",
    slug: "custom-portrait",
    name: "Custom Portrait Cake",
    tagline: "Themed",
    description: "Bring us a photo and a theme — we sculpt it edible.",
    category: "themed",
    basePrice: 3500,
    sizes: [
      { label: "2 lb", pounds: 2, multiplier: 1 },
      { label: "3 lb", pounds: 3, multiplier: 1.45 }
    ],
    flavors: ["Vanilla", "Chocolate", "Red Velvet"],
    images: [placeholderImage],
    active: true
  },
  {
    id: "velvet-rouge",
    slug: "velvet-rouge",
    name: "Velvet Rouge",
    tagline: "Birthday",
    description: "Classic red velvet, cream-cheese crémeux and a single edible rose.",
    category: "birthday",
    basePrice: 1700,
    sizes: [
      { label: "1 lb", pounds: 1, multiplier: 1 },
      { label: "2 lb", pounds: 2, multiplier: 1.9 }
    ],
    flavors: ["Red Velvet"],
    images: [placeholderImage],
    active: true
  }
];

export const SEED_CONTENT: SiteContent = {
  hero: {
    eyebrow: "Nepal's homemaker-led atelier",
    title: "Cakes that tell",
    italicTitle: "your story.",
    subtitle:
      "A fusion of homemaker intimacy and modern culinary artistry. Hand-crafted by Ratna for life's most exquisite moments.",
    signatureLabel: "Signature",
    signatureName: "Midnight Plum Opera"
  },
  about: {
    title: "From a homemaker's kitchen to a quiet kind of artistry.",
    body: [
      "Cakes by Ratna is an independent atelier run by Ratna — a homemaker who learned to bake the way most of us learned to love: slowly, by paying attention.",
      "Every cake is built to order. No freezer cases, no shortcuts, no shouting fondant. Just thoughtful flavour pairings, soft textures, and finishes that feel handwritten.",
      "We deliver across the valley, take only as many orders as we can do well, and treat each one like it's going to the most important celebration of the year — because for someone, it is."
    ],
    locationLine: "Hand-crafted in Kathmandu, delivered across the valley."
  },
  contact: {
    email: "cakebyratna@gmail.com",
    phone: "+977 9863244500",
    address: "Kathmandu, Nepal",
    instagram: "https://instagram.com/cakebyratna",
    facebook: "https://www.facebook.com/cakebyratna",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.776!2d85.324!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKathmandu!5e0!3m2!1sen!2snp!4v1700000000000"
  },
  story: {
    title: "Why we bake the way we bake.",
    paragraphs: [
      "We bake one celebration at a time. The dough is mixed in a real home kitchen, the buttercream is whipped to order, and the decorations are done by hand the morning of delivery.",
      "Our objective is simple: a cake that looks like a quiet little artwork and tastes like it was made by someone who cares.",
      "From birthdays to anniversaries to first communions and engagements — we'd love to be the smallest, sweetest part of your day."
    ]
  },
  testimonials: [
    { name: "Priya S.", occasion: "Anniversary", quote: "The Midnight Plum Opera made our 10th look — and taste — like something out of a magazine." },
    { name: "Aakash R.", occasion: "Daughter's first birthday", quote: "It arrived looking exactly like the reference photo. The cake didn't last the evening." },
    { name: "Sneha M.", occasion: "Wedding cake", quote: "Three tiers, sugar roses, and not a single thing out of place. Ratna is genuinely an artist." }
  ],
  payment: {
    qrInstructions:
      "Scan the QR with eSewa / Khalti / mobile banking, pay the exact order total, then upload a screenshot here. We'll confirm within an hour."
  }
};
