"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Mail, Trash2 } from "lucide-react";
import { listMessages, resolveMessage, deleteMessage } from "@/lib/data/messages";
import type { ContactMessage } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    setMessages(await listMessages());
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const setResolved = async (id: string, resolved: boolean) => {
    await resolveMessage(id, resolved);
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete message?")) return;
    await deleteMessage(id);
    refresh();
    toast.success("Deleted");
  };

  return (
    <div className="space-y-6">
      <header>
        <span className="chip-secondary">Inbox</span>
        <h1 className="mt-4 font-display text-display-xl">Customer messages</h1>
      </header>

      {loading ? (
        <div className="h-32 animate-pulse rounded-3xl bg-surface-container" />
      ) : messages.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-muted-foreground">No messages yet.</div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id} className={`glass rounded-3xl p-6 ${m.resolved ? "opacity-70" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold">{m.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{m.email} · {formatDate(m.createdAt)}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`mailto:${m.email}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground" aria-label="Reply by email">
                    <Mail className="h-4 w-4" />
                  </a>
                  <button onClick={() => setResolved(m.id, !m.resolved)} className={`inline-flex h-10 items-center gap-1 rounded-full border px-3 text-[11px] uppercase tracking-[0.18em] ${m.resolved ? "border-border text-muted-foreground" : "border-secondary/40 bg-secondary/10 text-secondary"}`}>
                    <Check className="h-3 w-3" /> {m.resolved ? "Reopen" : "Resolve"}
                  </button>
                  <button onClick={() => remove(m.id)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-danger"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
