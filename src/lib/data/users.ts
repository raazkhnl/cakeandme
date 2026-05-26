"use client";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDb, firebaseConfigured } from "@/lib/firebase/client";
import type { UserAddress, UserProfile } from "@/lib/types";

const COL = "users";
const LS = "cbr_local_user_v1";

function loadLocal(uid: string): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const all = JSON.parse(localStorage.getItem(LS) || "{}");
    return all[uid] ?? null;
  } catch {
    return null;
  }
}

function saveLocal(profile: UserProfile) {
  if (typeof window === "undefined") return;
  const all = (() => {
    try {
      return JSON.parse(localStorage.getItem(LS) || "{}");
    } catch {
      return {};
    }
  })();
  all[profile.uid] = profile;
  localStorage.setItem(LS, JSON.stringify(all));
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!firebaseConfigured) return loadLocal(uid);
  const db = getDb();
  if (!db) return loadLocal(uid);
  const snap = await getDoc(doc(db, COL, uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function ensureUserProfile(seed: Pick<UserProfile, "uid" | "email" | "displayName">): Promise<UserProfile> {
  const existing = await getUserProfile(seed.uid);
  if (existing) return existing;
  const profile: UserProfile = {
    uid: seed.uid,
    email: seed.email,
    displayName: seed.displayName,
    role: "customer",
    addresses: [],
    wishlist: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  await saveUserProfile(profile);
  return profile;
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  profile.updatedAt = Date.now();
  if (!firebaseConfigured) return saveLocal(profile);
  const db = getDb();
  if (!db) return saveLocal(profile);
  await setDoc(doc(db, COL, profile.uid), profile, { merge: true });
}

export async function upsertAddress(uid: string, address: UserAddress): Promise<void> {
  const profile = (await getUserProfile(uid)) ?? (await ensureUserProfile({ uid, email: "" }));
  const addresses = profile.addresses ? [...profile.addresses] : [];
  const idx = addresses.findIndex((a) => a.id === address.id);
  if (address.isDefault) addresses.forEach((a) => (a.isDefault = false));
  if (idx >= 0) addresses[idx] = address;
  else addresses.push(address);
  await saveUserProfile({ ...profile, addresses });
}

export async function removeAddress(uid: string, addressId: string): Promise<void> {
  const profile = await getUserProfile(uid);
  if (!profile) return;
  const addresses = (profile.addresses ?? []).filter((a) => a.id !== addressId);
  await saveUserProfile({ ...profile, addresses });
}

export async function toggleWishlist(uid: string, productId: string): Promise<string[]> {
  const profile = (await getUserProfile(uid)) ?? (await ensureUserProfile({ uid, email: "" }));
  const set = new Set(profile.wishlist ?? []);
  if (set.has(productId)) set.delete(productId);
  else set.add(productId);
  const wishlist = Array.from(set);
  await saveUserProfile({ ...profile, wishlist });
  return wishlist;
}

export async function setRole(uid: string, role: "customer" | "admin") {
  if (!firebaseConfigured) return;
  const db = getDb();
  if (!db) return;
  await updateDoc(doc(db, COL, uid), { role, updatedAt: Date.now() });
}
