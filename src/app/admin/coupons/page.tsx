"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { deleteCoupon, listCoupons, upsertCoupon } from "@/lib/data/coupons";
import type { Coupon } from "@/lib/types";

const empty: Coupon = { code: "", type: "percent", value: 10, active: true, description: "" };

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [draft, setDraft] = useState<Coupon>(empty);
  const [saving, setSaving] = useState(false);

  const refresh = async () => setCoupons(await listCoupons());
  useEffect(() => { refresh(); }, []);

  const save = async () => {
    if (!draft.code.trim()) return toast.error("Code is required");
    setSaving(true);
    try {
      await upsertCoupon(draft);
      await refresh();
      setDraft(empty);
      toast.success("Saved");
    } catch (err) {
      toast.error("Save failed", { description: (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (code: string) => {
    if (!confirm(`Delete coupon ${code}?`)) return;
    await deleteCoupon(code);
    await refresh();
  };

  return (
    <div className="space-y-6">
      <header>
        <span className="chip-secondary">Marketing</span>
        <h1 className="mt-4 font-display text-display-xl">Coupons</h1>
      </header>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">Add / edit coupon</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-6">
          <label className="md:col-span-2">
            <span className="field-label">Code</span>
            <input className="field uppercase" value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value.toUpperCase() })} placeholder="SWEET10" />
          </label>
          <label>
            <span className="field-label">Type</span>
            <select className="field" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as Coupon["type"] })}>
              <option value="percent">Percent</option>
              <option value="amount">Amount (NPR)</option>
            </select>
          </label>
          <label>
            <span className="field-label">Value</span>
            <input type="number" className="field" value={draft.value} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) })} />
          </label>
          <label>
            <span className="field-label">Min subtotal</span>
            <input type="number" className="field" value={draft.minSubtotal ?? 0} onChange={(e) => setDraft({ ...draft, minSubtotal: Number(e.target.value) || undefined })} />
          </label>
          <label>
            <span className="field-label">Expires</span>
            <input type="date" className="field" value={draft.expiresAt ? new Date(draft.expiresAt).toISOString().slice(0, 10) : ""} onChange={(e) => setDraft({ ...draft, expiresAt: e.target.value ? new Date(e.target.value).getTime() : undefined })} />
          </label>
          <label className="md:col-span-5">
            <span className="field-label">Description</span>
            <input className="field" value={draft.description ?? ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </label>
          <label className="inline-flex items-center gap-2 self-end">
            <input type="checkbox" checked={draft.active} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} />
            <span className="text-sm">Active</span>
          </label>
        </div>
        <div className="mt-4">
          <button onClick={save} disabled={saving} className="btn-primary"><Plus className="h-4 w-4" /> Save coupon</button>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">All coupons</h2>
        {coupons.length === 0 ? (
          <p className="mt-4 text-muted-foreground">No coupons yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border/60">
            {coupons.map((c) => (
              <li key={c.code} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-display text-base font-semibold">{c.code}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {c.type === "percent" ? `${c.value}%` : `₨${c.value}`}
                    {c.minSubtotal ? ` · min ₨${c.minSubtotal}` : ""}
                    {c.expiresAt ? ` · expires ${new Date(c.expiresAt).toLocaleDateString()}` : ""}
                    {!c.active ? " · inactive" : ""}
                  </p>
                  {c.description && <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setDraft(c)} className="btn-ghost !py-1.5 !text-[11px]">Edit</button>
                  <button onClick={() => remove(c.code)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-danger"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
