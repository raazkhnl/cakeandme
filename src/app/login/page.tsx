"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { useAuth } from "@/lib/auth/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { signInEmail, signInGoogle, isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await signInEmail(email, password);
      toast.success("Signed in");
      router.push("/orders");
    } catch (err) {
      toast.error("Couldn't sign in", { description: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    try {
      await signInGoogle();
      toast.success("Signed in");
      router.push("/orders");
    } catch (err) {
      toast.error("Couldn't sign in", { description: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-page py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
        <aside className="hidden flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-primary via-accent to-surface-tint p-10 text-background md:flex">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] opacity-80">Welcome back</p>
            <h2 className="mt-3 font-display text-4xl font-bold">A quieter way to order cake.</h2>
            <p className="mt-4 max-w-sm text-background/80">
              Sign in to see your past orders, repeat favourites in one tap, and skip filling forms next time.
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">No account? Place an order as guest — we'll remember by email.</p>
        </aside>

        <div className="glass rounded-3xl p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Sign in</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Welcome back.</h1>
          {!isConfigured && (
            <p className="mt-3 rounded-xl border border-secondary/30 bg-secondary/10 p-3 text-xs text-foreground">
              Firebase isn't configured yet — add the <code>NEXT_PUBLIC_FIREBASE_*</code> env vars to enable accounts.
              Guest checkout still works.
            </p>
          )}

          <button onClick={google} disabled={busy || !isConfigured} className="btn-ghost mt-6 w-full">
            <GoogleIcon /> Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="field-label">Email</span>
              <input type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label className="block">
              <span className="field-label">Password</span>
              <input type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button disabled={busy || !isConfigured} className="btn-primary w-full">
              <Mail className="h-4 w-4" /> Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here? <Link href="/signup" className="text-foreground underline-offset-4 hover:underline">Create an account</Link>
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or just <Link href="/shop" className="text-foreground underline-offset-4 hover:underline">order as a guest</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.7 2.5 2.5 6.8 2.5 12s4.2 9.5 9.5 9.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}
