export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  category: string;
  basePrice: number;
  sizes?: { label: string; pounds: number; multiplier: number }[];
  flavors?: string[];
  images: string[];
  featured?: boolean;
  active: boolean;
  createdAt?: number;
  updatedAt?: number;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  cover?: string;
  order: number;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  sizeLabel: string;
  pounds: number;
  flavor?: string;
  unitPrice: number;
  quantity: number;
  notes?: string;
};

export type OrderStatus =
  | "pending_payment"
  | "received"
  | "confirmed"
  | "in_kitchen"
  | "ready"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "khalti" | "esewa" | "qr_upload" | "cod";

export type OrderPayment = {
  method: PaymentMethod;
  status: "unpaid" | "pending_review" | "paid" | "refunded";
  reference?: string;
  screenshotUrl?: string;
  amount: number;
};

export type Order = {
  id: string;
  code: string;
  uid?: string | null;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city?: string;
    note?: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  requiredBy: string;
  status: OrderStatus;
  payment: OrderPayment;
  createdAt: number;
  updatedAt: number;
  history?: { at: number; status: OrderStatus; note?: string }[];
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    italicTitle: string;
    subtitle: string;
    signatureLabel: string;
    signatureName: string;
  };
  about: {
    title: string;
    body: string[];
    locationLine: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    mapEmbed?: string;
    instagram?: string;
    facebook?: string;
  };
  story: {
    title: string;
    paragraphs: string[];
  };
  testimonials?: { name: string; quote: string; occasion?: string }[];
  payment: {
    qrImageUrl?: string;
    qrInstructions: string;
  };
};

export type UserProfile = {
  uid: string;
  email: string;
  displayName?: string;
  phone?: string;
  role: "customer" | "admin";
  createdAt: number;
};
