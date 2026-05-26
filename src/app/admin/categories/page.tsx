"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { deleteCategory, listCategories, upsertCategory } from "@/lib/data/products";
import type { Category } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { firebaseConfigured } from "@/lib/firebase/client";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<Category>({ id: "", slug: "", name: "", description: "", order: 99 });

  const refresh = async () => setCategories(await listCategories());
  useEffect(() => { refresh(); }, []);

  const save = async () => {
    if (!draft.name) return toast.error("Name is required");
    setBusy(true);
    try {
      const slug = draft.slug || slugify(draft.name);
      await upsertCategory({ ...draft, slug, id: draft.id || slug });
      setDraft({ id: "", slug: "", name: "", description: "", order: 99 });
      refresh();
      toast.success("Saved");
    } catch (err) {
      toast.error("Save failed", { description: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (c: Category) => {
    if (!confirm(`Delete category ${c.name}?`)) return;
    try {
      await deleteCategory(c.id);
      refresh();
      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed", { description: (err as Error).message });
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <span className="chip-secondary">Catalogue</span>
        <h1 className="mt-4 font-display text-display-xl">Categories</h1>
        {!firebaseConfigured && (
          <p className="mt-2 text-sm text-muted-foreground">
            Firebase isn't configured — viewing seed categories. Configure Firebase to edit.
          </p>
        )}
      </header>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">Add / edit</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
          <label className="md:col-span-2">
            <span className="field-label">Name</span>
            <input className="field" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </label>
          <label className="md:col-span-2">
            <span className="field-label">Slug</span>
            <input className="field" placeholder={slugify(draft.name)} value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} />
          </label>
          <label>
            <span className="field-label">Order</span>
            <input type="number" className="field" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
          </label>
          <label className="md:col-span-5">
            <span className="field-label">Description</span>
            <input className="field" value={draft.description ?? ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </label>
        </div>
        <div className="mt-4">
          <button onClick={save} disabled={busy} className="btn-primary"><Plus className="h-4 w-4" /> Save category</button>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">All categories</h2>
        <ul className="mt-4 divide-y divide-border/60">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-display text-base font-semibold">{c.name}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">/{c.slug} · order {c.order}</p>
                {c.description && <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>}
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost" onClick={() => setDraft(c)}>Edit</button>
                <button onClick={() => remove(c)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-danger"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
