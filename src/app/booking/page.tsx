"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Send } from "lucide-react";
import { createMessage } from "@/lib/data/messages";

export default function BookingPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", guests: "", style: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const body = `BOOKING ENQUIRY\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDate needed: ${form.date}\nGuests / Size: ${form.guests}\nStyle / Theme: ${form.style}\n\n${form.message}`;
      await createMessage({ name: form.name, email: form.email.trim().toLowerCase(), message: body });
      setSent(true);
      toast.success("Sent — we'll reply within a few hours");
    } catch (err) {
      toast.error("Couldn't send", { description: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-page py-32">
      <header className="mb-10 max-w-2xl">
        <span className="chip-secondary">Book a consultation</span>
        <h1 className="mt-4 font-display text-display-xl text-balance">Tell us what you're celebrating.</h1>
        <p className="mt-3 text-muted-foreground md:text-lg">
          For weddings, large events or anything especially custom — start here. We'll get back to you with a sketch and a quote.
        </p>
      </header>

      {sent ? (
        <div className="glass mx-auto max-w-2xl rounded-3xl p-8 text-center">
          <Calendar className="mx-auto h-8 w-8 text-secondary" />
          <h2 className="mt-4 font-display text-2xl font-bold">We received your brief.</h2>
          <p className="mt-2 text-muted-foreground">
            Expect a reply at <strong>{form.email}</strong> within a few hours — earlier if it's morning in Kathmandu.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="glass mx-auto max-w-3xl rounded-3xl p-7">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label><span className="field-label">Your name</span><input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
            <label><span className="field-label">Phone</span><input className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></label>
            <label className="md:col-span-2"><span className="field-label">Email</span><input type="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
            <label><span className="field-label">Date needed</span><input type="date" className="field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></label>
            <label><span className="field-label">Guests / size</span><input className="field" placeholder="e.g. 50 guests / 5 lb" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} /></label>
            <label className="md:col-span-2"><span className="field-label">Style / theme</span><input className="field" placeholder="Minimalist / floral / themed for kids / cultural…" value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })} /></label>
            <label className="md:col-span-2"><span className="field-label">Tell us more</span><textarea className="field" rows={5} placeholder="Share a reference photo URL, colour palette, dietary needs…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
          </div>
          <button disabled={busy} className="btn-primary mt-6">
            {busy ? "Sending…" : "Send brief"} <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </section>
  );
}
