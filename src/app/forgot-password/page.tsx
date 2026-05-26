"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { useAuth } from "@/lib/auth/useAuth";

export default function ForgotPasswordPage() {
  const { resetPassword, isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success("Check your inbox");
    } catch (err) {
      toast.error("Couldn't send reset email", { description: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-page py-32">
      <div className="mx-auto max-w-md glass rounded-3xl p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Reset password</p>
        <h1 className="mt-2 font-display text-3xl font-bold">Forgot your password?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email. We'll send a link you can use to set a new one.
        </p>
        {!isConfigured && (
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 p-3 text-xs">
            Firebase isn't configured — password reset only works once auth env vars are set.
          </p>
        )}
        {sent ? (
          <div className="mt-6 rounded-2xl border border-success/40 bg-success/10 p-5 text-sm text-foreground">
            We sent a reset link to <strong>{email}</strong>. It may take a minute to arrive.
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="field-label">Email</span>
              <input type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button disabled={busy || !isConfigured} className="btn-primary w-full">
              <Mail className="h-4 w-4" /> Send reset link
            </button>
          </form>
        )}
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link href="/login" className="text-muted-foreground hover:text-foreground">Back to sign in</Link>
          <Link href="/track" className="text-muted-foreground hover:text-foreground">Track without account</Link>
        </div>
      </div>
    </section>
  );
}
