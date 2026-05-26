"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Check, Clock, Cookie, Hourglass, Package, PackageCheck, Truck, X } from "lucide-react";
import { getOrderByCode, listOrdersByEmail } from "@/lib/data/orders";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatNPR } from "@/lib/utils";

const STEPS: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { key: "received", label: "Received", icon: <Hourglass className="h-4 w-4" /> },
  { key: "confirmed", label: "Confirmed", icon: <Check className="h-4 w-4" /> },
  { key: "in_kitchen", label: "In the kitchen", icon: <Cookie className="h-4 w-4" /> },
  { key: "ready", label: "Ready", icon: <Package className="h-4 w-4" /> },
  { key: "delivered", label: "Delivered", icon: <Truck className="h-4 w-4" /> }
];

export function TrackClient() {
  const params = useSearchParams();
  const initialCode = params.get("code") ?? "";

  const [code, setCode] = useState(initialCode);
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<Order[] | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (initialCode) lookupByCode(initialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  const lookupByCode = async (c: string) => {
    if (!c.trim()) return;
    setBusy(true);
    try {
      const o = await getOrderByCode(c.trim());
      setResults(o ? [o] : []);
    } finally {
      setBusy(false);
    }
  };

  const lookupByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    try {
      const orders = await listOrdersByEmail(email);
      setResults(orders);
      if (orders.length === 0) toast.message("No orders for that email yet");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-page py-32">
      <header className="mb-10 max-w-2xl">
        <span className="chip-secondary">Order tracking</span>
        <h1 className="mt-4 font-display text-display-xl text-balance">
          Where's your cake right now?
        </h1>
        <p className="mt-3 text-muted-foreground md:text-lg">
          Look up by order code (we sent it after checkout) or by the email you used to place the order.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <form onSubmit={(e) => { e.preventDefault(); lookupByCode(code); }} className="glass rounded-3xl p-7">
          <p className="field-label">Order code</p>
          <div className="flex gap-3">
            <input
              className="field flex-1"
              placeholder="CR-XXXXXX"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button disabled={busy} className="btn-primary">Track</button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Tip: bookmark the link in your confirmation message.</p>
        </form>
        <form onSubmit={lookupByEmail} className="glass rounded-3xl p-7">
          <p className="field-label">Email used at checkout</p>
          <div className="flex gap-3">
            <input
              type="email"
              className="field flex-1"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={busy} className="btn-ghost">Find</button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">All orders placed with the email — guest or signed-in.</p>
        </form>
      </div>

      {results && (
        <div className="mt-12 space-y-6">
          {results.length === 0 ? (
            <div className="rounded-3xl border border-border bg-surface/60 p-10 text-center text-muted-foreground">
              No orders found.
            </div>
          ) : (
            results.map((o) => <OrderCard key={o.code} order={o} />)
          )}
        </div>
      )}
    </section>
  );
}

function OrderCard({ order }: { order: Order }) {
  const stepIdx = STEPS.findIndex((s) => s.key === order.status);
  const safeStep = stepIdx === -1 ? -1 : stepIdx;
  const cancelled = order.status === "cancelled";
  const pendingPayment = order.status === "pending_payment";

  return (
    <article className="glass overflow-hidden rounded-3xl">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 p-7">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Order</p>
          <p className="font-display text-2xl font-bold">{order.code}</p>
          <p className="mt-1 text-xs text-muted-foreground">Placed {formatDate(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Required by</p>
          <p className="font-display text-base">{formatDate(order.requiredBy)}</p>
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-secondary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
            {order.payment.method.replace("_", " ")} · {order.payment.status.replace("_", " ")}
          </p>
        </div>
      </header>

      <div className="p-7">
        {cancelled ? (
          <div className="flex items-center gap-3 rounded-2xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
            <X className="h-4 w-4" /> This order was cancelled.
          </div>
        ) : (
          <ol className="relative grid grid-cols-2 gap-y-6 md:grid-cols-5">
            <span aria-hidden className="absolute left-4 right-4 top-4 hidden h-px bg-border md:block" />
            {STEPS.map((s, i) => {
              const done = !pendingPayment && i <= safeStep;
              const current = !pendingPayment && i === safeStep;
              return (
                <li key={s.key} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                  <span
                    className={`relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border ${
                      done ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-surface text-muted-foreground"
                    }`}
                  >
                    {s.icon}
                  </span>
                  <p className={`mt-2 text-[11px] uppercase tracking-[0.18em] ${done ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </p>
                  {current && <p className="text-[10px] text-secondary">in progress</p>}
                </li>
              );
            })}
            {pendingPayment && (
              <li className="col-span-2 flex items-center gap-3 rounded-2xl border border-secondary/40 bg-secondary/10 p-4 text-sm text-foreground md:col-span-5">
                <Clock className="h-4 w-4 text-secondary" /> Waiting for payment to clear before we begin.
              </li>
            )}
          </ol>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Delivery</p>
            <p className="mt-2 text-sm">{order.customer.name}</p>
            <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
            <p className="mt-1 text-sm text-muted-foreground">{order.customer.address}{order.customer.city ? `, ${order.customer.city}` : ""}</p>
            {order.customer.note && <p className="mt-2 text-sm italic text-muted-foreground">"{order.customer.note}"</p>}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Items</p>
            <ul className="mt-2 space-y-2 text-sm">
              {order.items.map((i, idx) => (
                <li key={idx} className="flex items-start justify-between gap-3">
                  <span className="text-foreground">
                    {i.name} <span className="text-muted-foreground">· {i.sizeLabel}{i.flavor ? ` · ${i.flavor}` : ""} · ×{i.quantity}</span>
                  </span>
                  <span className="text-foreground">{formatNPR(i.unitPrice * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-baseline justify-between border-t border-border/60 pt-3">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Total</span>
              <span className="font-display text-xl font-bold">{formatNPR(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
