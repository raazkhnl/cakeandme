"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { listAllOrders, updateOrderStatus } from "@/lib/data/orders";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatNPR } from "@/lib/utils";
import { downloadCsv, toCsv } from "@/lib/utils-csv";
import { toast } from "sonner";

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
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [bulk, setBulk] = useState<OrderStatus | "">("");

  const refresh = async () => {
    setLoading(true);
    setOrders(await listAllOrders());
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => (filter === "all" ? orders : orders.filter((o) => o.status === filter)), [orders, filter]);
  const selectedCodes = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);

  const applyBulk = async () => {
    if (!bulk || selectedCodes.length === 0) return;
    if (!confirm(`Set ${selectedCodes.length} orders to "${bulk.replace("_", " ")}"?`)) return;
    for (const code of selectedCodes) {
      await updateOrderStatus(code, bulk as OrderStatus, "Bulk update");
    }
    setSelected({});
    setBulk("");
    await refresh();
    toast.success("Updated");
  };

  const exportCsv = () => {
    const rows = filtered.map((o) => ({
      code: o.code,
      created: new Date(o.createdAt).toISOString(),
      requiredBy: o.requiredBy,
      status: o.status,
      paymentMethod: o.payment.method,
      paymentStatus: o.payment.status,
      total: o.total,
      items: o.items.map((i) => `${i.name} (${i.sizeLabel}${i.flavor ? "/" + i.flavor : ""}) ×${i.quantity}`).join(" | "),
      name: o.customer.name,
      email: o.customer.email,
      phone: o.customer.phone,
      address: o.customer.address,
      city: o.customer.city ?? ""
    }));
    downloadCsv(`orders-${Date.now()}.csv`, toCsv(rows));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip-secondary">Orders</span>
          <h1 className="mt-4 font-display text-display-xl">All orders</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCsv} className="btn-ghost"><Download className="h-4 w-4" /> Export CSV</button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
              filter === f.key ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {selectedCodes.length > 0 && (
        <div className="glass flex flex-wrap items-center gap-3 rounded-2xl p-4 text-sm">
          <span>{selectedCodes.length} selected</span>
          <select value={bulk} onChange={(e) => setBulk(e.target.value as OrderStatus | "")} className="field !py-1.5 !text-xs">
            <option value="">Change status…</option>
            {STATUS_FILTERS.slice(1).map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
          <button onClick={applyBulk} disabled={!bulk} className="btn-primary !py-1.5 !text-[11px]">Apply</button>
          <button onClick={() => setSelected({})} className="text-muted-foreground hover:text-foreground">Clear</button>
        </div>
      )}

      {loading ? (
        <div className="h-24 animate-pulse rounded-3xl bg-surface-container" />
      ) : filtered.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-muted-foreground">No orders here yet.</div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-low/60 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && filtered.every((o) => selected[o.code])}
                    onChange={(e) => {
                      const next = { ...selected };
                      filtered.forEach((o) => (next[o.code] = e.target.checked));
                      setSelected(next);
                    }}
                  />
                </th>
                <th className="p-3">Code</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Placed</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((o) => (
                <tr key={o.code} className="hover:bg-surface-low/30">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={!!selected[o.code]}
                      onChange={(e) => setSelected((prev) => ({ ...prev, [o.code]: e.target.checked }))}
                    />
                  </td>
                  <td className="p-3 font-display text-base font-semibold">{o.code}</td>
                  <td className="p-3">
                    <p className="text-foreground">{o.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{o.customer.email}</p>
                  </td>
                  <td className="p-3 text-muted-foreground">{o.items.length}</td>
                  <td className="p-3">{formatNPR(o.total)}</td>
                  <td className="p-3 text-[11px] uppercase tracking-[0.18em]">{o.status.replace("_", " ")}</td>
                  <td className="p-3 text-xs text-muted-foreground">{formatDate(o.createdAt)}</td>
                  <td className="p-3">
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
