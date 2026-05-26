"use client";

import { firebaseConfigured } from "@/lib/firebase/client";
import { useAuth } from "@/lib/auth/useAuth";

export default function AdminSettings() {
  const { user } = useAuth();
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map((x) => x.trim()).filter(Boolean);
  return (
    <div className="space-y-6">
      <header>
        <span className="chip-secondary">Settings</span>
        <h1 className="mt-4 font-display text-display-xl">Configuration</h1>
      </header>

      <section className="glass rounded-3xl p-6 space-y-3 text-sm">
        <Row label="Logged in" value={user?.email ?? "—"} />
        <Row label="Firebase configured" value={firebaseConfigured ? "Yes" : "No — set NEXT_PUBLIC_FIREBASE_* envs"} />
        <Row label="Admin emails" value={adminEmails.length ? adminEmails.join(", ") : "None"} />
        <Row label="Khalti key" value={process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY ? "Set" : "Not set"} />
        <Row label="eSewa merchant" value={process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE ?? "Not set"} />
      </section>

      <section className="glass rounded-3xl p-6 text-sm leading-relaxed text-muted-foreground space-y-3">
        <p>
          Environment variables are read at build/runtime from Vercel. After changing them, redeploy for the changes
          to take effect.
        </p>
        <p>
          To grant admin access, add the user's email to <code className="rounded bg-surface-container px-1.5 py-0.5">NEXT_PUBLIC_ADMIN_EMAILS</code> (comma-separated) and redeploy.
        </p>
        <p>
          Live Khalti / eSewa payments require the corresponding public keys plus a small webhook to confirm the
          payment server-side (handled by a Next.js route handler we can wire up when keys are ready).
        </p>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-2 last:border-b-0">
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
