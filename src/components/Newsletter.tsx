"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { subscribeNewsletter } from "@/lib/data/newsletter";

export function Newsletter({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Need a valid email");
    setBusy(true);
    try {
      await subscribeNewsletter(email, source);
      setDone(true);
      toast.success("You're on the list.");
    } catch (err) {
      toast.error("Subscribe failed", { description: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative py-20">
      <div className="container-page">
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-14 md:px-16">
          <div aria-hidden className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
          <div className="relative grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="chip-secondary">Quietly, monthly</span>
              <h2 className="mt-4 font-display text-display-lg text-balance">
                A short note when something new comes out of the kitchen.
              </h2>
              <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
                No spam. Sometimes a new flavour, occasionally a small discount, never more than once a month.
              </p>
            </div>
            <form onSubmit={submit} className="flex w-full gap-3 md:col-span-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="field flex-1"
                required
                disabled={done}
              />
              <button disabled={busy || done} className="btn-primary shrink-0">
                {done ? "Subscribed" : busy ? "…" : <><Send className="h-4 w-4" /> Subscribe</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
