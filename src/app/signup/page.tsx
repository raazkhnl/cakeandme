"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/useAuth";

export default function SignupPage() {
  const router = useRouter();
  const { signUpEmail, signInGoogle, isConfigured } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password should be at least 6 characters");
    setBusy(true);
    try {
      await signUpEmail(email, password, name);
      toast.success("Account created");
      router.push("/orders");
    } catch (err) {
      toast.error("Couldn't create account", { description: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-page py-32">
      <div className="mx-auto max-w-md glass rounded-3xl p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Create account</p>
        <h1 className="mt-2 font-display text-3xl font-bold">Join the atelier.</h1>
        {!isConfigured && (
          <p className="mt-3 rounded-xl border border-secondary/30 bg-secondary/10 p-3 text-xs">
            Firebase isn't configured yet — add the env vars to enable signups. Guest checkout still works.
          </p>
        )}
        <button onClick={signInGoogle} disabled={busy || !isConfigured} className="btn-ghost mt-6 w-full">
          Continue with Google
        </button>
        <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="field-label">Your name</span>
            <input className="field" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block">
            <span className="field-label">Email</span>
            <input type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="block">
            <span className="field-label">Password</span>
            <input type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </label>
          <button disabled={busy || !isConfigured} className="btn-primary w-full">Create account</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have one? <Link href="/login" className="text-foreground hover:underline">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
