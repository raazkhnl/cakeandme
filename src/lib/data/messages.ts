"use client";

import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { getDb, firebaseConfigured } from "@/lib/firebase/client";
import type { ContactMessage } from "@/lib/types";

const COL = "messages";
const LS = "cbr_local_messages_v1";

function loadLocal(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(list: ContactMessage[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS, JSON.stringify(list));
}

export async function createMessage(payload: Omit<ContactMessage, "id" | "createdAt" | "resolved">): Promise<ContactMessage> {
  const msg: ContactMessage = {
    ...payload,
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    createdAt: Date.now(),
    resolved: false
  };
  if (!firebaseConfigured) {
    saveLocal([msg, ...loadLocal()]);
    return msg;
  }
  const db = getDb();
  if (!db) return msg;
  const ref = await addDoc(collection(db, COL), msg);
  return { ...msg, id: ref.id };
}

export async function listMessages(): Promise<ContactMessage[]> {
  if (!firebaseConfigured) return loadLocal();
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(query(collection(db, COL), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ContactMessage);
}

export async function resolveMessage(id: string, resolved: boolean) {
  if (!firebaseConfigured) {
    const list = loadLocal();
    const idx = list.findIndex((m) => m.id === id);
    if (idx >= 0) {
      list[idx].resolved = resolved;
      saveLocal(list);
    }
    return;
  }
  const db = getDb();
  if (!db) return;
  await updateDoc(doc(db, COL, id), { resolved });
}

export async function deleteMessage(id: string) {
  if (!firebaseConfigured) {
    saveLocal(loadLocal().filter((m) => m.id !== id));
    return;
  }
  const db = getDb();
  if (!db) return;
  await deleteDoc(doc(db, COL, id));
}
