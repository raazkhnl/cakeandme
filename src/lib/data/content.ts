"use client";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDb, firebaseConfigured } from "@/lib/firebase/client";
import { SEED_CONTENT } from "@/lib/data/seed";
import type { SiteContent } from "@/lib/types";

const SETTINGS = "settings";
const KEY = "site_content";

export async function getSiteContent(): Promise<SiteContent> {
  if (!firebaseConfigured) return SEED_CONTENT;
  const db = getDb();
  if (!db) return SEED_CONTENT;
  const snap = await getDoc(doc(db, SETTINGS, KEY));
  if (!snap.exists()) return SEED_CONTENT;
  return { ...SEED_CONTENT, ...(snap.data() as SiteContent) };
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase not configured");
  await setDoc(doc(db, SETTINGS, KEY), content, { merge: true });
}
