"use client";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorageClient, firebaseConfigured } from "@/lib/firebase/client";

export async function uploadImage(file: File, folder = "uploads"): Promise<string> {
  if (!firebaseConfigured) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  const storage = getStorageClient();
  if (!storage) throw new Error("Storage not configured");
  const safeName = `${Date.now()}-${file.name.replace(/[^a-z0-9.\-_]/gi, "_")}`;
  const r = ref(storage, `${folder}/${safeName}`);
  const snap = await uploadBytes(r, file);
  return getDownloadURL(snap.ref);
}
