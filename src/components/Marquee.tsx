"use client";

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/40 py-6 mask-gradient-r">
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
        {loop.map((t, i) => (
          <span
            key={i}
            className="font-display text-2xl italic tracking-tight text-muted-foreground md:text-3xl"
          >
            <span className="text-foreground">·</span>&nbsp;&nbsp;{t}
          </span>
        ))}
      </div>
    </div>
  );
}
