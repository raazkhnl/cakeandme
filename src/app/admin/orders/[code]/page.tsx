"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { getOrderByCode, updateOrderPayment, updateOrderStatus } from "@/lib/data/orders";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatNPR, safeImg } from "@/lib/utils";

const STATUSES: OrderStatus[] = [
  "pending_payment",
  "received",
  "confirmed",
  "in_kitchen",
  "ready",
  "delivered",
  "cancelled"
];

export default function AdminOrderPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => setOrder(await getOrderByCode(code)))();
  }, [code]);

  if (!order) return <div className="h-32 animate-pulse rounded-3xl bg-surface-container" />;

  const setStatus = async (s: OrderStatus) => {
    setSaving(true);
    try {
      await updateOrderStatus(order.code, s, note || undefined);
      setOrder({ ...order, status: s, updatedAt: Date.now(), history: [...(order.history || []), { at: Date.now(), status: s, note }] });
      setNote("");
      toast.success(`Status → ${s.replace("_", " ")}`);
    } finally {
      setSaving(false);
    }
  };

  const markPaid = async () => {
    setSaving(true);
    try {
      await updateOrderPayment(order.code, { ...order.payment, status: "paid" });
      setOrder({ ...order, payment: { ...order.payment, status: "paid" } });
      toast.success("Payment marked paid");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link href="/admin/orders" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> All orders
      </Link>

      <header className="glass rounded-3xl p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Order</p>
            <p className="font-display text-3xl font-bold">{order.code}</p>
            <p className="mt-1 text-sm text-muted-foreground">Placed {formatDate(order.createdAt)} · Required {formatDate(order.requiredBy)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="chip-secondary">{order.status.replace("_", " ")}</span>
            <span className="chip">{order.payment.method.replace("_", " ")}</span>
            <span className="chip">{order.payment.status.replace("_", " ")}</span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Items</h2>
          <ul className="mt-4 divide-y divide-border/60">
            {order.items.map((i, idx) => (
              <li key={idx} className="flex items-center gap-3 py-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl ring-1 ring-border">
                  <Image src={safeImg(i.image)} alt="" fill sizes="56px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{i.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {i.sizeLabel}{i.flavor ? ` · ${i.flavor}` : ""} · ×{i.quantity}
                  </p>
                  {i.notes && <p className="mt-1 text-xs italic text-muted-foreground">"{i.notes}"</p>}
                </div>
                <span className="font-medium">{formatNPR(i.unitPrice * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-border/60 pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="text-foreground">{formatNPR(order.subtotal)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span className="text-foreground">{formatNPR(order.deliveryFee)}</span></div>
            <div className="mt-2 flex items-baseline justify-between border-t border-border/60 pt-2">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Total</span>
              <span className="font-display text-xl font-bold">{formatNPR(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-3xl p-6">
            <h2 className="font-display text-lg font-semibold">Customer</h2>
            <p className="mt-3 text-foreground">{order.customer.name}</p>
            <p className="text-sm text-muted-foreground">{order.customer.email}</p>
            <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
            <p className="mt-2 text-sm text-muted-foreground">{order.customer.address}{order.customer.city ? `, ${order.customer.city}` : ""}</p>
            {order.customer.note && <p className="mt-2 text-sm italic text-muted-foreground">"{order.customer.note}"</p>}
          </div>

          <div className="glass rounded-3xl p-6">
            <h2 className="font-display text-lg font-semibold">Payment</h2>
            <p className="mt-1 text-sm text-muted-foreground">{order.payment.method.replace("_", " ")} · {order.payment.status.replace("_", " ")}</p>
            {order.payment.screenshotUrl && (
              <a href={order.payment.screenshotUrl} target="_blank" rel="noreferrer" className="mt-3 block overflow-hidden rounded-2xl border border-border">
                <Image src={order.payment.screenshotUrl} alt="Payment screenshot" width={400} height={400} className="h-auto w-full object-cover" />
              </a>
            )}
            {order.payment.status !== "paid" && (
              <button onClick={markPaid} disabled={saving} className="btn-primary mt-4 w-full">Mark as paid</button>
            )}
          </div>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">Update status</h2>
        <label className="mt-3 block">
          <span className="field-label">Optional note for history</span>
          <input className="field" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. 'Confirmed via WhatsApp at 3pm'" />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              disabled={saving || order.status === s}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                order.status === s
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>

        {order.history && order.history.length > 0 && (
          <ol className="mt-6 space-y-3 border-t border-border/60 pt-4 text-sm">
            {order.history.map((h, i) => (
              <li key={i} className="flex justify-between">
                <span><span className="text-foreground">{h.status.replace("_", " ")}</span>{h.note ? ` — ${h.note}` : ""}</span>
                <span className="text-muted-foreground">{formatDate(h.at)}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
