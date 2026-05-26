"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Search, ShoppingBag } from "lucide-react";
import { listAllOrders } from "@/lib/data/orders";
import type { Order } from "@/lib/types";
import { formatDate, formatNPR } from "@/lib/utils";
import { downloadCsv, toCsv } from "@/lib/utils-csv";

type CustomerRow = {
  email: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpend: number;
  lastOrder: number;
  lastCode: string;
};

export default function AdminCustomers() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      setOrders(await listAllOrders());
      setLoading(false);
    })();
  }, []);

  const customers = useMemo<CustomerRow[]>(() => {
    const map = new Map<string, CustomerRow>();
    for (const o of orders) {
      const key = o.customer.email.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          email: key,
          name: o.customer.name,
          phone: o.customer.phone,
          totalOrders: 0,
          totalSpend: 0,
          lastOrder: 0,
          lastCode: ""
        });
      }
      const c = map.get(key)!;
      c.totalOrders += 1;
      if (o.payment.status === "paid") c.totalSpend += o.total;
      if (o.createdAt > c.lastOrder) {
        c.lastOrder = o.createdAt;
        c.lastCode = o.code;
      }
    }
    return Array.from(map.values()).sort((a, b) => b.lastOrder - a.lastOrder);
  }, [orders]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return customers;
    return customers.filter((c) => c.email.includes(needle) || c.name.toLowerCase().includes(needle) || c.phone.includes(needle));
  }, [customers, q]);

  const exportCsv = () => downloadCsv(`customers-${Date.now()}.csv`, toCsv(filtered as unknown as Record<string, unknown>[]));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip-secondary">CRM</span>
          <h1 className="mt-4 font-display text-display-xl">Customers</h1>
          <p className="mt-2 text-sm text-muted-foreground">Aggregated from order history. {customers.length} unique emails.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input className="field !py-2 pl-9 !text-sm" placeholder="Search email, name, phone…" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <button onClick={exportCsv} className="btn-ghost"><Download className="h-4 w-4" /> CSV</button>
        </div>
      </header>

      {loading ? (
        <div className="h-32 animate-pulse rounded-3xl bg-surface-container" />
      ) : filtered.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-muted-foreground">No customers yet.</div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-low/60 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Spend</th>
                <th className="p-3">Last order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((c) => (
                <tr key={c.email} className="hover:bg-surface-low/30">
                  <td className="p-3">
                    <p className="text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </td>
                  <td className="p-3 text-muted-foreground">{c.phone}</td>
                  <td className="p-3"><span className="inline-flex items-center gap-1"><ShoppingBag className="h-3 w-3 text-secondary" />{c.totalOrders}</span></td>
                  <td className="p-3">{formatNPR(c.totalSpend)}</td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {formatDate(c.lastOrder)}
                    {" · "}
                    <Link href={`/admin/orders/${c.lastCode}`} className="underline">{c.lastCode}</Link>
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
