"use client";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDb, firebaseConfigured } from "@/lib/firebase/client";
import type { NewsletterEntry } from "@/lib/types";

const COL = "newsletter";
const LS = "cbr_local_newsletter_v1";

function loadLocal(): NewsletterEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(list: NewsletterEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS, JSON.stringify(list));
}

export async function subscribeNewsletter(email: string, source = "footer"): Promise<NewsletterEntry> {
  const clean = email.trim().toLowerCase();
  const entry: NewsletterEntry = { email: clean, source, createdAt: Date.now() };
  if (!firebaseConfigured) {
    const list = loadLocal();
    if (!list.find((e) => e.email === clean)) {
      list.push(entry);
      saveLocal(list);
    }
    return entry;
  }
  const db = getDb();
  if (!db) return entry;
  await setDoc(doc(db, COL, clean), entry, { merge: true });
  return entry;
}

export async function listSubscribers(): Promise<NewsletterEntry[]> {
  if (!firebaseConfigured) return loadLocal();
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => d.data() as NewsletterEntry).sort((a, b) => b.createdAt - a.createdAt);
}
