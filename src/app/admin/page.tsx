"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Banknote, Box, Clock, Package } from "lucide-react";
import { listAllOrders } from "@/lib/data/orders";
import { listProducts } from "@/lib/data/products";
import { formatNPR, formatDate } from "@/lib/utils";
import type { Order, Product } from "@/lib/types";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [o, p] = await Promise.all([listAllOrders(), listProducts()]);
      setOrders(o);
      setProducts(p);
      setLoading(false);
    })();
  }, []);

  const totalRevenue = orders.reduce((s, o) => s + (o.payment.status === "paid" ? o.total : 0), 0);
  const pending = orders.filter((o) => ["received", "confirmed", "in_kitchen", "pending_payment"].includes(o.status)).length;
  const ready = orders.filter((o) => o.status === "ready").length;

  const stats = [
    { label: "Orders", value: orders.length, icon: <Box className="h-5 w-5" /> },
    { label: "In progress", value: pending, icon: <Clock className="h-5 w-5" /> },
    { label: "Ready", value: ready, icon: <Package className="h-5 w-5" /> },
    { label: "Revenue", value: formatNPR(totalRevenue), icon: <Banknote className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-8">
      <header>
        <span className="chip-secondary">Dashboard</span>
        <h1 className="mt-4 font-display text-display-xl">Today at the atelier.</h1>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-3xl p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">{s.icon}</span>
            <p className="mt-4 font-display text-3xl font-bold">{s.value}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="glass rounded-3xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Recent orders</h2>
          <Link href="/admin/orders" className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        {loading ? (
          <div className="h-24 animate-pulse rounded-2xl bg-surface-container" />
        ) : orders.length === 0 ? (
          <p className="text-muted-foreground">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-border/60">
            {orders.slice(0, 6).map((o) => (
              <li key={o.code} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-display text-base font-semibold">{o.code}</p>
                  <p className="text-xs text-muted-foreground">{o.customer.name} · {formatDate(o.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p>{formatNPR(o.total)}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{o.status.replace("_", " ")}</p>
                </div>
                <Link href={`/admin/orders/${o.code}`} className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"><ArrowUpRight className="h-4 w-4" /></Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h2 className="font-display text-xl font-semibold">Products</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {products.length} live products. Add or edit at any time.
          </p>
          <Link href="/admin/products" className="btn-ghost mt-4 inline-flex">Manage products</Link>
        </div>
        <div className="glass rounded-3xl p-6">
          <h2 className="font-display text-xl font-semibold">Content</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit the hero copy, story, payment QR and contact details.
          </p>
          <Link href="/admin/content" className="btn-ghost mt-4 inline-flex">Edit content</Link>
        </div>
      </section>
    </div>
  );
}
