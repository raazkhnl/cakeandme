"use client";

import { use, useEffect, useState } from "react";
import { ProductEditor } from "../ProductEditor";
import { getProduct } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setProduct(await getProduct(id));
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="h-32 animate-pulse rounded-3xl bg-surface-container" />;
  if (!product) return <div className="glass rounded-3xl p-10 text-center">Product not found.</div>;
  return <ProductEditor existing={product} />;
}
