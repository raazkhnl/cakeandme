"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";
import { listOrdersByEmail, listOrdersByUid } from "@/lib/data/orders";
import type { Order } from "@/lib/types";
import { formatDate, formatNPR } from "@/lib/utils";

export default function MyOrdersPage() {
  const { user, loading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setBusy(false);
      return;
    }
    (async () => {
      const a = await listOrdersByUid(user.uid);
      const b = user.email ? await listOrdersByEmail(user.email) : [];
      const merged = [...a, ...b].reduce<Order[]>((acc, o) => {
        if (!acc.find((x) => x.code === o.code)) acc.push(o);
        return acc;
      }, []);
      merged.sort((x, y) => y.createdAt - x.createdAt);
      setOrders(merged);
      setBusy(false);
    })();
  }, [user, loading]);

  if (loading) return <section className="container-page py-32">Loading…</section>;

  if (!user) {
    return (
      <section className="container-page py-32 text-center">
        <h1 className="font-display text-display-lg">Sign in to see your orders</h1>
        <p className="mt-3 text-muted-foreground">
          Don't have an account? You can also <Link href="/track" className="underline">track by email</Link>.
        </p>
        <Link href="/login" className="btn-primary mt-6 inline-flex">Sign in</Link>
      </section>
    );
  }

  return (
    <section className="container-page py-32">
      <header className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="chip-secondary">Your account</span>
          <h1 className="mt-4 font-display text-display-xl">Hello, {user.displayName ?? user.email}.</h1>
          <p className="mt-2 text-muted-foreground">{user.email}</p>
        </div>
        <button onClick={signOut} className="btn-ghost">Sign out</button>
      </header>

      {busy ? (
        <div className="h-24 animate-pulse rounded-3xl bg-surface-container" />
      ) : orders.length === 0 ? (
        <div className="rounded-3xl border border-border bg-surface/60 p-10 text-center text-muted-foreground">
          You haven't ordered anything yet. <Link href="/shop" className="text-foreground underline">Browse the shop</Link>.
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {orders.map((o) => (
            <li key={o.code} className="glass rounded-3xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Order</p>
                  <p className="font-display text-2xl font-bold">{o.code}</p>
                </div>
                <span className="chip-secondary">{o.status.replace("_", " ")}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{formatDate(o.createdAt)}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {o.items.slice(0, 2).map((i, idx) => (
                  <li key={idx} className="text-foreground">{i.name} <span className="text-muted-foreground">· {i.sizeLabel} × {i.quantity}</span></li>
                ))}
                {o.items.length > 2 && <li className="text-muted-foreground">+{o.items.length - 2} more</li>}
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-xl font-bold">{formatNPR(o.total)}</span>
                <Link href={`/track?code=${o.code}`} className="text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground hover:text-secondary">View →</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
