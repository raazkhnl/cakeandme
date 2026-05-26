"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = (process.env.NEXT_PUBLIC_BRAND_PHONE || "+977 9863244500").replace(/[^\d]/g, "");
  const text = encodeURIComponent("Hi! I'd like to ask about a cake.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
