"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { safeImg } from "@/lib/utils";

export function ProductGallery({ images, alt, tagline }: { images: string[]; alt: string; tagline?: string }) {
  const list = images.length > 0 ? images : ["/signature-cake.jpg"];
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % list.length);
  const prev = () => setIdx((i) => (i - 1 + list.length) % list.length);

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="relative aspect-[4/5] md:aspect-[16/10]">
          <Image
            key={list[idx]}
            src={safeImg(list[idx])}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 720px, 90vw"
            className="object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/30 to-transparent" />
          {tagline && <span className="absolute left-6 top-6 chip-secondary">{tagline}</span>}
          {list.length > 1 && (
            <>
              <button onClick={prev} aria-label="Previous image" className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur"><ChevronRight className="h-4 w-4" /></button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {list.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-background" : "w-1.5 bg-background/60"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {list.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {list.slice(0, 4).map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative aspect-square overflow-hidden rounded-2xl border transition-colors ${i === idx ? "border-secondary" : "border-border"}`}
            >
              <Image src={safeImg(src)} alt="" fill sizes="200px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
