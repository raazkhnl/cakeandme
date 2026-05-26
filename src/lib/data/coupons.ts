"use client";

import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getDb, firebaseConfigured } from "@/lib/firebase/client";
import type { Coupon } from "@/lib/types";

const COL = "coupons";
const LS = "cbr_local_coupons_v1";

function loadLocal(): Coupon[] {
  if (typeof window === "undefined") return DEMO_COUPONS;
  try {
    const raw = localStorage.getItem(LS);
    return raw ? JSON.parse(raw) : DEMO_COUPONS;
  } catch {
    return DEMO_COUPONS;
  }
}

function saveLocal(list: Coupon[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS, JSON.stringify(list));
}

const DEMO_COUPONS: Coupon[] = [
  { code: "SWEET10", type: "percent", value: 10, active: true, description: "10% off your first order" },
  { code: "FREEDEL", type: "amount", value: 200, active: true, description: "₨200 off (covers Kathmandu delivery)" }
];

export async function listCoupons(): Promise<Coupon[]> {
  if (!firebaseConfigured) return loadLocal();
  const db = getDb();
  if (!db) return loadLocal();
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => d.data() as Coupon);
}

export async function getCoupon(code: string): Promise<Coupon | null> {
  const clean = code.trim().toUpperCase();
  if (!clean) return null;
  if (!firebaseConfigured) return loadLocal().find((c) => c.code === clean) ?? null;
  const db = getDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, COL, clean));
  return snap.exists() ? (snap.data() as Coupon) : null;
}

export async function upsertCoupon(coupon: Coupon) {
  const code = coupon.code.trim().toUpperCase();
  const final = { ...coupon, code };
  if (!firebaseConfigured) {
    const list = loadLocal();
    const idx = list.findIndex((c) => c.code === code);
    if (idx >= 0) list[idx] = final;
    else list.push(final);
    saveLocal(list);
    return;
  }
  const db = getDb();
  if (!db) throw new Error("Firebase not configured");
  await setDoc(doc(db, COL, code), final, { merge: true });
}

export async function deleteCoupon(code: string) {
  if (!firebaseConfigured) {
    saveLocal(loadLocal().filter((c) => c.code !== code));
    return;
  }
  const db = getDb();
  if (!db) return;
  await deleteDoc(doc(db, COL, code));
}

export function applyCoupon(coupon: Coupon, subtotal: number): number {
  if (!coupon.active) return 0;
  if (coupon.expiresAt && coupon.expiresAt < Date.now()) return 0;
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
  if (coupon.type === "percent") return Math.round((subtotal * coupon.value) / 100);
  return Math.min(coupon.value, subtotal);
}
