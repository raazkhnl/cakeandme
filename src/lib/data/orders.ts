"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { getDb, firebaseConfigured } from "@/lib/firebase/client";
import type { Order, OrderStatus } from "@/lib/types";
import { generateOrderCode } from "@/lib/utils";

const ORDERS = "orders";

const localKey = "cbr_local_orders_v1";

function loadLocal(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(localKey) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(orders: Order[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(localKey, JSON.stringify(orders));
}

export async function createOrder(payload: Omit<Order, "id" | "code" | "createdAt" | "updatedAt" | "history">): Promise<Order> {
  const now = Date.now();
  const code = generateOrderCode();
  const order: Order = {
    ...payload,
    id: code,
    code,
    createdAt: now,
    updatedAt: now,
    history: [{ at: now, status: payload.status }]
  };

  if (!firebaseConfigured) {
    const all = loadLocal();
    all.unshift(order);
    saveLocal(all);
    return order;
  }
  const db = getDb();
  if (!db) {
    const all = loadLocal();
    all.unshift(order);
    saveLocal(all);
    return order;
  }
  await setDoc(doc(db, ORDERS, code), order);
  return order;
}

export async function getOrderByCode(code: string): Promise<Order | null> {
  if (!firebaseConfigured) {
    return loadLocal().find((o) => o.code.toLowerCase() === code.toLowerCase()) ?? null;
  }
  const db = getDb();
  if (!db) return null;
  const s = await getDoc(doc(db, ORDERS, code));
  return s.exists() ? (s.data() as Order) : null;
}

export async function listOrdersByEmail(email: string): Promise<Order[]> {
  const cleaned = email.trim().toLowerCase();
  if (!firebaseConfigured) {
    return loadLocal().filter((o) => o.customer.email.toLowerCase() === cleaned);
  }
  const db = getDb();
  if (!db) return [];
  const q = query(collection(db, ORDERS), where("customer.email", "==", cleaned));
  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => d.data() as Order);
  return docs.sort((a, b) => b.createdAt - a.createdAt);
}

export async function listOrdersByUid(uid: string): Promise<Order[]> {
  if (!firebaseConfigured) return loadLocal().filter((o) => o.uid === uid);
  const db = getDb();
  if (!db) return [];
  const q = query(collection(db, ORDERS), where("uid", "==", uid));
  const snap = await getDocs(q);
  const docs = snap.docs.map((d) => d.data() as Order);
  return docs.sort((a, b) => b.createdAt - a.createdAt);
}

export async function listAllOrders(): Promise<Order[]> {
  if (!firebaseConfigured) return loadLocal();
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(query(collection(db, ORDERS), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => d.data() as Order);
}

export async function updateOrderStatus(code: string, status: OrderStatus, note?: string) {
  const now = Date.now();
  if (!firebaseConfigured) {
    const all = loadLocal();
    const idx = all.findIndex((o) => o.code === code);
    if (idx >= 0) {
      all[idx].status = status;
      all[idx].updatedAt = now;
      all[idx].history = [...(all[idx].history || []), { at: now, status, note }];
      saveLocal(all);
    }
    return;
  }
  const db = getDb();
  if (!db) return;
  const ref = doc(db, ORDERS, code);
  const cur = await getDoc(ref);
  const history = (cur.data()?.history ?? []) as Order["history"];
  await updateDoc(ref, {
    status,
    updatedAt: now,
    history: [...(history || []), { at: now, status, note }]
  });
}

export async function updateOrderPayment(code: string, payment: Partial<Order["payment"]>) {
  const now = Date.now();
  if (!firebaseConfigured) {
    const all = loadLocal();
    const idx = all.findIndex((o) => o.code === code);
    if (idx >= 0) {
      all[idx].payment = { ...all[idx].payment, ...payment } as Order["payment"];
      all[idx].updatedAt = now;
      saveLocal(all);
    }
    return;
  }
  const db = getDb();
  if (!db) return;
  await updateDoc(doc(db, ORDERS, code), { payment: payment as any, updatedAt: now });
}
