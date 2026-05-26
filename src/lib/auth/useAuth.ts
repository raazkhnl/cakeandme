"use client";

import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  type User
} from "firebase/auth";
import { getFirebaseAuth, firebaseConfigured } from "@/lib/firebase/client";
import { isAdminEmail } from "@/lib/utils";

export type AuthState = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isConfigured: boolean;
};

export function useAuth(): AuthState & {
  signInGoogle: () => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
} {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signInGoogle = async () => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Authentication isn't configured. Add Firebase env vars.");
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const signInEmail = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Authentication isn't configured.");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpEmail = async (email: string, password: string, name?: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Authentication isn't configured.");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
  };

  const signOut = async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await fbSignOut(auth);
  };

  return {
    user,
    loading,
    isAdmin: isAdminEmail(user?.email),
    isConfigured: firebaseConfigured,
    signInGoogle,
    signInEmail,
    signUpEmail,
    signOut
  };
}
