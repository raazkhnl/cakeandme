"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Upload } from "lucide-react";
import { getSiteContent, saveSiteContent } from "@/lib/data/content";
import { uploadImage } from "@/lib/firebase/storage";
import type { SiteContent } from "@/lib/types";
import { SEED_CONTENT } from "@/lib/data/seed";
import { firebaseConfigured } from "@/lib/firebase/client";
import { safeImg } from "@/lib/utils";

export default function AdminContent() {
  const [content, setContent] = useState<SiteContent>(SEED_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteContent().then((c) => {
      setContent(c);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await saveSiteContent(content);
      toast.success("Saved");
    } catch (err) {
      toast.error("Save failed", { description: (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const onQR = async (file: File) => {
    try {
      const url = await uploadImage(file, "qr");
      setContent({ ...content, payment: { ...content.payment, qrImageUrl: url } });
      toast.success("QR uploaded");
    } catch (err) {
      toast.error("Upload failed", { description: (err as Error).message });
    }
  };

  if (loading) return <div className="h-32 animate-pulse rounded-3xl bg-surface-container" />;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip-secondary">Editorial</span>
          <h1 className="mt-4 font-display text-display-xl">Site content</h1>
          {!firebaseConfigured && (
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Firebase isn't configured — changes won't persist. Add env vars and reload.
            </p>
          )}
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">{saving ? "Saving…" : "Save content"}</button>
      </header>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">Hero</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <label><span className="field-label">Eyebrow</span><input className="field" value={content.hero.eyebrow} onChange={(e) => setContent({ ...content, hero: { ...content.hero, eyebrow: e.target.value } })} /></label>
          <label><span className="field-label">Signature label</span><input className="field" value={content.hero.signatureLabel} onChange={(e) => setContent({ ...content, hero: { ...content.hero, signatureLabel: e.target.value } })} /></label>
          <label className="md:col-span-2"><span className="field-label">Title</span><input className="field" value={content.hero.title} onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })} /></label>
          <label className="md:col-span-2"><span className="field-label">Italic title</span><input className="field" value={content.hero.italicTitle} onChange={(e) => setContent({ ...content, hero: { ...content.hero, italicTitle: e.target.value } })} /></label>
          <label className="md:col-span-2"><span className="field-label">Subtitle</span><textarea className="field" rows={2} value={content.hero.subtitle} onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })} /></label>
          <label><span className="field-label">Signature name</span><input className="field" value={content.hero.signatureName} onChange={(e) => setContent({ ...content, hero: { ...content.hero, signatureName: e.target.value } })} /></label>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">About</h2>
        <div className="mt-4 grid grid-cols-1 gap-3">
          <label><span className="field-label">Title</span><input className="field" value={content.about.title} onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })} /></label>
          <label><span className="field-label">Location line</span><input className="field" value={content.about.locationLine} onChange={(e) => setContent({ ...content, about: { ...content.about, locationLine: e.target.value } })} /></label>
          {content.about.body.map((p, i) => (
            <label key={i}>
              <span className="field-label">Body paragraph {i + 1}</span>
              <textarea
                className="field"
                rows={3}
                value={p}
                onChange={(e) => {
                  const body = [...content.about.body];
                  body[i] = e.target.value;
                  setContent({ ...content, about: { ...content.about, body } });
                }}
              />
            </label>
          ))}
          <div>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setContent({ ...content, about: { ...content.about, body: [...content.about.body, ""] } })}
            >+ Add paragraph</button>
          </div>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">Contact</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <label><span className="field-label">Email</span><input className="field" value={content.contact.email} onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })} /></label>
          <label><span className="field-label">Phone</span><input className="field" value={content.contact.phone} onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })} /></label>
          <label className="md:col-span-2"><span className="field-label">Address</span><input className="field" value={content.contact.address} onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })} /></label>
          <label><span className="field-label">Facebook</span><input className="field" value={content.contact.facebook ?? ""} onChange={(e) => setContent({ ...content, contact: { ...content.contact, facebook: e.target.value } })} /></label>
          <label><span className="field-label">Instagram</span><input className="field" value={content.contact.instagram ?? ""} onChange={(e) => setContent({ ...content, contact: { ...content.contact, instagram: e.target.value } })} /></label>
          <label className="md:col-span-2"><span className="field-label">Google Maps embed URL</span><input className="field" value={content.contact.mapEmbed ?? ""} onChange={(e) => setContent({ ...content, contact: { ...content.contact, mapEmbed: e.target.value } })} /></label>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg font-semibold">Payment QR</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-sm text-muted-foreground hover:border-secondary/40 hover:text-foreground">
            <span className="inline-flex items-center gap-2 text-foreground"><Upload className="h-4 w-4" /> Upload QR image</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onQR(f); }} />
            {content.payment.qrImageUrl ? (
              <Image src={safeImg(content.payment.qrImageUrl)} alt="" width={180} height={180} className="mx-auto rounded-xl bg-background object-contain p-2" />
            ) : (
              <span>JPG / PNG — appears on checkout for QR-pay customers.</span>
            )}
          </label>
          <label>
            <span className="field-label">Instructions shown to customers</span>
            <textarea className="field" rows={6} value={content.payment.qrInstructions} onChange={(e) => setContent({ ...content, payment: { ...content.payment, qrInstructions: e.target.value } })} />
          </label>
        </div>
      </section>

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="btn-primary">{saving ? "Saving…" : "Save content"}</button>
      </div>
    </div>
  );
}
