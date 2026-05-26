"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth/useAuth";
import { ensureUserProfile, getUserProfile, saveUserProfile, upsertAddress, removeAddress } from "@/lib/data/users";
import type { UserAddress, UserProfile } from "@/lib/types";

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [draft, setDraft] = useState<UserAddress>({ id: "", label: "Home", name: "", phone: "", address: "", city: "Kathmandu" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    (async () => {
      const p = await getUserProfile(user.uid) ?? (await ensureUserProfile({ uid: user.uid, email: user.email ?? "", displayName: user.displayName ?? undefined }));
      setProfile(p);
    })();
  }, [user, loading]);

  if (loading) return <section className="container-page py-32">Loading…</section>;
  if (!user) {
    return (
      <section className="container-page py-32 text-center">
        <h1 className="font-display text-display-lg">Sign in to view your account</h1>
        <Link href="/login" className="btn-primary mt-6 inline-flex">Sign in</Link>
      </section>
    );
  }
  if (!profile) return <section className="container-page py-32">Loading profile…</section>;

  const saveBasic = async (patch: Partial<UserProfile>) => {
    setSaving(true);
    try {
      const next = { ...profile, ...patch };
      await saveUserProfile(next);
      setProfile(next);
      toast.success("Saved");
    } finally {
      setSaving(false);
    }
  };

  const saveAddress = async () => {
    if (!draft.name || !draft.phone || !draft.address) return toast.error("Name, phone, address required");
    setSaving(true);
    try {
      const id = draft.id || crypto.randomUUID();
      await upsertAddress(user.uid, { ...draft, id });
      const p = await getUserProfile(user.uid);
      if (p) setProfile(p);
      setDraft({ id: "", label: "Home", name: "", phone: "", address: "", city: "Kathmandu" });
      toast.success("Address saved");
    } finally {
      setSaving(false);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!confirm("Remove this address?")) return;
    await removeAddress(user.uid, id);
    const p = await getUserProfile(user.uid);
    if (p) setProfile(p);
  };

  return (
    <section className="container-page py-32 space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="chip-secondary">Your account</span>
          <h1 className="mt-4 font-display text-display-xl">Hello, {profile.displayName || profile.email}.</h1>
          <p className="mt-1 text-sm text-muted-foreground">{profile.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/orders" className="btn-ghost">View orders</Link>
          <Link href="/wishlist" className="btn-ghost">Wishlist</Link>
          <button onClick={signOut} className="btn-ghost">Sign out</button>
        </div>
      </header>

      <section className="glass rounded-3xl p-7">
        <h2 className="font-display text-xl font-semibold">Profile</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className="field-label">Display name</span>
            <input
              className="field"
              defaultValue={profile.displayName ?? ""}
              onBlur={(e) => saveBasic({ displayName: e.target.value })}
            />
          </label>
          <label>
            <span className="field-label">Phone</span>
            <input
              className="field"
              defaultValue={profile.phone ?? ""}
              onBlur={(e) => saveBasic({ phone: e.target.value })}
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Changes save when the field loses focus.</p>
      </section>

      <section className="glass rounded-3xl p-7">
        <h2 className="font-display text-xl font-semibold">Saved addresses</h2>
        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {(profile.addresses ?? []).map((a) => (
            <li key={a.id} className="rounded-2xl border border-border bg-surface/60 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {a.label}
                    {a.isDefault && <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] text-secondary">Default</span>}
                  </p>
                  <p className="mt-2 text-foreground">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.phone}</p>
                  <p className="text-sm text-muted-foreground">{a.address}{a.city ? `, ${a.city}` : ""}</p>
                </div>
                <button onClick={() => deleteAddress(a.id)} className="text-muted-foreground hover:text-danger" aria-label="Remove address">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex gap-2 text-[11px]">
                <button onClick={() => setDraft(a)} className="text-muted-foreground hover:text-foreground">Edit</button>
                {!a.isDefault && (
                  <button
                    onClick={() => upsertAddress(user.uid, { ...a, isDefault: true }).then(async () => {
                      const p = await getUserProfile(user.uid);
                      if (p) setProfile(p);
                    })}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Make default
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface/40 p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Add / edit address</p>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <input className="field" placeholder="Label (Home, Office…)" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
            <input className="field" placeholder="City" value={draft.city ?? ""} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
            <input className="field" placeholder="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            <input className="field" placeholder="Phone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
            <textarea className="field md:col-span-2" rows={2} placeholder="Address" value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!draft.isDefault} onChange={(e) => setDraft({ ...draft, isDefault: e.target.checked })} />
              Use as default
            </label>
          </div>
          <button onClick={saveAddress} disabled={saving} className="btn-primary mt-4">
            <Plus className="h-4 w-4" /> Save address
          </button>
        </div>
      </section>
    </section>
  );
}
