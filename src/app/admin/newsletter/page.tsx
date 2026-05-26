"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { listSubscribers } from "@/lib/data/newsletter";
import type { NewsletterEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { downloadCsv, toCsv } from "@/lib/utils-csv";

export default function AdminNewsletter() {
  const [entries, setEntries] = useState<NewsletterEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setEntries(await listSubscribers());
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip-secondary">Audience</span>
          <h1 className="mt-4 font-display text-display-xl">Newsletter</h1>
          <p className="mt-2 text-sm text-muted-foreground">{entries.length} subscribers.</p>
        </div>
        <button onClick={() => downloadCsv(`newsletter-${Date.now()}.csv`, toCsv(entries as unknown as Record<string, unknown>[]))} className="btn-ghost">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </header>

      {loading ? (
        <div className="h-32 animate-pulse rounded-3xl bg-surface-container" />
      ) : entries.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-muted-foreground">No subscribers yet.</div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-low/60 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Source</th>
                <th className="p-3">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {entries.map((e) => (
                <tr key={e.email}>
                  <td className="p-3 text-foreground">{e.email}</td>
                  <td className="p-3 text-muted-foreground">{e.source ?? "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground">{formatDate(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
