"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { getDb, firebaseConfigured } from "@/lib/firebase/client";
import type { ProductReview } from "@/lib/types";

const ROOT = "products";
const SUB = "reviews";

const LS = "cbr_local_reviews_v1";

function loadLocal(): ProductReview[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(list: ProductReview[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS, JSON.stringify(list));
}

export async function listReviews(productId: string, opts?: { all?: boolean }): Promise<ProductReview[]> {
  if (!firebaseConfigured) {
    return loadLocal()
      .filter((r) => r.productId === productId && (opts?.all || r.approved))
      .sort((a, b) => b.createdAt - a.createdAt);
  }
  const db = getDb();
  if (!db) return [];
  const ref = collection(db, ROOT, productId, SUB);
  const q = opts?.all
    ? query(ref, orderBy("createdAt", "desc"))
    : query(ref, where("approved", "==", true), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ProductReview);
}

export async function addReview(
  productId: string,
  data: Omit<ProductReview, "id" | "createdAt" | "approved" | "productId">
): Promise<ProductReview> {
  const review: ProductReview = {
    ...data,
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    productId,
    approved: false,
    createdAt: Date.now()
  };
  if (!firebaseConfigured) {
    saveLocal([review, ...loadLocal()]);
    return review;
  }
  const db = getDb();
  if (!db) return review;
  const docRef = await addDoc(collection(db, ROOT, productId, SUB), review);
  return { ...review, id: docRef.id };
}

export async function moderateReview(productId: string, reviewId: string, approved: boolean) {
  if (!firebaseConfigured) {
    const list = loadLocal();
    const idx = list.findIndex((r) => r.id === reviewId);
    if (idx >= 0) {
      list[idx].approved = approved;
      saveLocal(list);
    }
    return;
  }
  const db = getDb();
  if (!db) return;
  await updateDoc(doc(db, ROOT, productId, SUB, reviewId), { approved });
}

export async function deleteReview(productId: string, reviewId: string) {
  if (!firebaseConfigured) {
    saveLocal(loadLocal().filter((r) => r.id !== reviewId));
    return;
  }
  const db = getDb();
  if (!db) return;
  await deleteDoc(doc(db, ROOT, productId, SUB, reviewId));
}
