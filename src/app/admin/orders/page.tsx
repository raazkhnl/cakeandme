"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listAllOrders } from "@/lib/data/orders";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatNPR } from "@/lib/utils";

const STATUS_FILTERS: { key: "all" | OrderStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending_payment", label: "Pending payment" },
  { key: "received", label: "Received" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_kitchen", label: "In kitchen" },
  { key: "ready", label: "Ready" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]["key"]>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setOrders(await listAllOrders());
      setLoading(false);
    })();
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <header>
        <span className="chip-secondary">Orders</span>
        <h1 className="mt-4 font-display text-display-xl">All orders</h1>
      </header>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
              filter === f.key
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-24 animate-pulse rounded-3xl bg-surface-container" />
      ) : filtered.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-muted-foreground">No orders here yet.</div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-low/60 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Placed</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((o) => (
                <tr key={o.code} className="hover:bg-surface-low/30">
                  <td className="p-4 font-display text-base font-semibold">{o.code}</td>
                  <td className="p-4">
                    <p className="text-foreground">{o.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{o.customer.email}</p>
                  </td>
                  <td className="p-4 text-muted-foreground">{o.items.length}</td>
                  <td className="p-4">{formatNPR(o.total)}</td>
                  <td className="p-4 text-[11px] uppercase tracking-[0.18em]">{o.status.replace("_", " ")}</td>
                  <td className="p-4 text-xs text-muted-foreground">{formatDate(o.createdAt)}</td>
                  <td className="p-4">
                    <Link href={`/admin/orders/${o.code}`} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border">
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
