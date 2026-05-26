"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { SEED_CONTENT } from "@/lib/data/seed";

export default function ContactPage() {
  const c = SEED_CONTENT.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const subject = encodeURIComponent("Hello from cakesbyratna.com");
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
      toast.success("Drafting in your mail app");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-page py-32">
      <header className="mb-12 max-w-2xl">
        <span className="chip-secondary">Get in touch</span>
        <h1 className="mt-4 font-display text-display-xl text-balance">
          A small atelier. We actually pick up the phone.
        </h1>
        <p className="mt-3 text-muted-foreground md:text-lg">
          For custom orders, large weddings or just a quick question — we're happy to chat.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-secondary/40">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary"><Phone className="h-5 w-5" /></span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Phone</p>
              <p className="font-display text-xl font-semibold">{c.phone}</p>
            </div>
          </a>
          <a href={`mailto:${c.email}`} className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-secondary/40">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary"><Mail className="h-5 w-5" /></span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Email</p>
              <p className="font-display text-xl font-semibold">{c.email}</p>
            </div>
          </a>
          <div className="glass flex items-center gap-4 rounded-2xl p-5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary"><MapPin className="h-5 w-5" /></span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Visit</p>
              <p className="font-display text-xl font-semibold">{c.address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {c.facebook && (
              <Link href={c.facebook} target="_blank" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/60"><Facebook className="h-4 w-4" /></Link>
            )}
            {c.instagram && (
              <Link href={c.instagram} target="_blank" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/60"><Instagram className="h-4 w-4" /></Link>
            )}
          </div>
          {c.mapEmbed && (
            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Map"
                src={c.mapEmbed}
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}
        </div>

        <form onSubmit={send} className="glass rounded-3xl p-7 lg:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Send a message</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Tell us about your celebration.</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label>
              <span className="field-label">Name</span>
              <input className="field" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              <span className="field-label">Email</span>
              <input type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label className="md:col-span-2">
              <span className="field-label">Message</span>
              <textarea className="field" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
            </label>
          </div>
          <button disabled={busy} className="btn-primary mt-6">
            {busy ? "Sending…" : "Send message"} <Send className="h-4 w-4" />
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            We respond within a few hours — earlier if it's morning in Kathmandu.
          </p>
        </form>
      </div>
    </section>
  );
}
