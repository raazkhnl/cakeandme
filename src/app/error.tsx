"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <span className="chip-secondary">Something went wrong</span>
      <h1 className="mt-6 font-display text-display-xl text-balance">Our oven hiccupped.</h1>
      <p className="mt-3 max-w-md text-pretty text-muted-foreground">
        The page couldn't load. Try again, or head somewhere familiar.
      </p>
      {error?.digest && <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{error.digest}</p>}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-ghost">Back home</Link>
      </div>
    </section>
  );
}
