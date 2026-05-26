"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import Image from "next/image";
import { listCategories, upsertProduct } from "@/lib/data/products";
import { uploadImage } from "@/lib/firebase/storage";
import { slugify, safeImg } from "@/lib/utils";
import type { Category, Product } from "@/lib/types";

const empty: Product = {
  id: "",
  slug: "",
  name: "",
  tagline: "",
  description: "",
  category: "wedding",
  basePrice: 1500,
  sizes: [
    { label: "1 lb", pounds: 1, multiplier: 1 },
    { label: "2 lb", pounds: 2, multiplier: 1.9 }
  ],
  flavors: ["Vanilla"],
  images: [],
  featured: false,
  active: true
};

export function ProductEditor({ existing }: { existing?: Product }) {
  const router = useRouter();
  const [p, setP] = useState<Product>(existing ?? empty);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listCategories().then(setCategories);
  }, []);

  const updateSize = (i: number, key: "label" | "pounds" | "multiplier", value: string | number) => {
    const sizes = [...(p.sizes ?? [])];
    sizes[i] = { ...sizes[i], [key]: typeof value === "string" && key !== "label" ? Number(value) : value } as any;
    setP({ ...p, sizes });
  };

  const addImage = async (file: File) => {
    try {
      const url = await uploadImage(file, "products");
      setP({ ...p, images: [...p.images, url] });
      toast.success("Image added");
    } catch (err) {
      toast.error("Upload failed", { description: (err as Error).message });
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = p.slug || slugify(p.name);
      const id = p.id || slug;
      if (!slug || !p.name) {
        toast.error("Name & slug are required");
        return;
      }
      await upsertProduct({ ...p, id, slug });
      toast.success("Saved");
      router.push("/admin/products");
    } catch (err) {
      toast.error("Save failed", { description: (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-display-xl">{existing ? "Edit product" : "New product"}</h1>
        <button className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
      </header>

      <section className="glass rounded-3xl p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className="field-label">Name</span>
            <input className="field" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} required />
          </label>
          <label>
            <span className="field-label">Slug</span>
            <input className="field" value={p.slug} onChange={(e) => setP({ ...p, slug: e.target.value })} placeholder={slugify(p.name)} />
          </label>
          <label>
            <span className="field-label">Tagline</span>
            <input className="field" value={p.tagline ?? ""} onChange={(e) => setP({ ...p, tagline: e.target.value })} />
          </label>
          <label>
            <span className="field-label">Category</span>
            <select className="field" value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })}>
              {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </label>
          <label>
            <span className="field-label">Base price (NPR)</span>
            <input type="number" className="field" value={p.basePrice} onChange={(e) => setP({ ...p, basePrice: Number(e.target.value) })} />
          </label>
          <label>
            <span className="field-label">Flavours (comma separated)</span>
            <input
              className="field"
              value={(p.flavors ?? []).join(", ")}
              onChange={(e) => setP({ ...p, flavors: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })}
            />
          </label>
          <label className="md:col-span-2">
            <span className="field-label">Description</span>
            <textarea className="field" rows={4} value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} />
          </label>
          <label className="inline-flex items-center gap-3">
            <input type="checkbox" checked={p.featured ?? false} onChange={(e) => setP({ ...p, featured: e.target.checked })} />
            <span className="text-sm">Featured on home page</span>
          </label>
          <label className="inline-flex items-center gap-3">
            <input type="checkbox" checked={p.active} onChange={(e) => setP({ ...p, active: e.target.checked })} />
            <span className="text-sm">Visible in shop</span>
          </label>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">Sizes</h2>
        <p className="mt-1 text-sm text-muted-foreground">Multiplier × base price = price for that size.</p>
        <div className="mt-4 space-y-3">
          {(p.sizes ?? []).map((s, i) => (
            <div key={i} className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <input className="field" placeholder="Label" value={s.label} onChange={(e) => updateSize(i, "label", e.target.value)} />
              <input type="number" step="0.1" className="field" placeholder="Pounds" value={s.pounds} onChange={(e) => updateSize(i, "pounds", e.target.value)} />
              <input type="number" step="0.05" className="field" placeholder="Multiplier" value={s.multiplier} onChange={(e) => updateSize(i, "multiplier", e.target.value)} />
              <button
                type="button"
                onClick={() => setP({ ...p, sizes: (p.sizes ?? []).filter((_, idx) => idx !== i) })}
                className="btn-ghost"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setP({ ...p, sizes: [...(p.sizes ?? []), { label: "", pounds: 1, multiplier: 1 }] })}
            className="btn-ghost"
          >
            + Add size
          </button>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">Images</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {p.images.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-2xl border border-border">
              <Image src={safeImg(src)} alt="" fill sizes="200px" className="object-cover" />
              <button
                type="button"
                onClick={() => setP({ ...p, images: p.images.filter((_, idx) => idx !== i) })}
                className="absolute right-2 top-2 rounded-full bg-background/80 px-2 py-1 text-[10px] uppercase tracking-[0.18em]"
              >
                Remove
              </button>
            </div>
          ))}
          <label className="flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 text-sm text-muted-foreground hover:border-secondary/40 hover:text-foreground">
            <span className="inline-flex flex-col items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) addImage(f);
              }}
            />
          </label>
        </div>
      </section>

      <div className="flex justify-end">
        <button className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Save product"}</button>
      </div>
    </form>
  );
}
