"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  orderBy,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { getDb, firebaseConfigured } from "@/lib/firebase/client";
import { SEED_PRODUCTS, SEED_CATEGORIES } from "@/lib/data/seed";
import type { Product, Category } from "@/lib/types";

const PRODUCTS = "products";
const CATEGORIES = "categories";

export async function listProducts(opts?: { category?: string; featuredOnly?: boolean }): Promise<Product[]> {
  if (!firebaseConfigured) {
    return SEED_PRODUCTS.filter((p) =>
      (!opts?.category || p.category === opts.category) && (!opts?.featuredOnly || p.featured)
    );
  }
  const db = getDb();
  if (!db) return [];
  const ref = collection(db, PRODUCTS);
  const constraints = [] as any[];
  if (opts?.category) constraints.push(where("category", "==", opts.category));
  if (opts?.featuredOnly) constraints.push(where("featured", "==", true));
  const snap = await getDocs(constraints.length ? query(ref, ...constraints) : ref);
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
  return docs.filter((p) => p.active);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!firebaseConfigured) {
    return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  const db = getDb();
  if (!db) return null;
  const q = query(collection(db, PRODUCTS), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Product;
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!firebaseConfigured) return SEED_PRODUCTS.find((p) => p.id === id) ?? null;
  const db = getDb();
  if (!db) return null;
  const s = await getDoc(doc(db, PRODUCTS, id));
  return s.exists() ? ({ id: s.id, ...s.data() } as Product) : null;
}

export async function upsertProduct(p: Product): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase not configured");
  const now = Date.now();
  await setDoc(doc(db, PRODUCTS, p.id), { ...p, updatedAt: now, createdAt: p.createdAt ?? now }, { merge: true });
}

export async function deleteProduct(id: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase not configured");
  await deleteDoc(doc(db, PRODUCTS, id));
}

export async function listCategories(): Promise<Category[]> {
  if (!firebaseConfigured) return [...SEED_CATEGORIES].sort((a, b) => a.order - b.order);
  const db = getDb();
  if (!db) return SEED_CATEGORIES;
  const snap = await getDocs(query(collection(db, CATEGORIES), orderBy("order", "asc")));
  if (snap.empty) return SEED_CATEGORIES;
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Category);
}

export async function upsertCategory(c: Category) {
  const db = getDb();
  if (!db) throw new Error("Firebase not configured");
  await setDoc(doc(db, CATEGORIES, c.id), c, { merge: true });
}

export async function deleteCategory(id: string) {
  const db = getDb();
  if (!db) throw new Error("Firebase not configured");
  await deleteDoc(doc(db, CATEGORIES, id));
}

export { SEED_PRODUCTS, SEED_CATEGORIES, serverTimestamp };
