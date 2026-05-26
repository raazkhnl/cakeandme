"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ padding: "4rem", textAlign: "center", fontFamily: "system-ui" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something broke at the very edges.</h1>
          <p style={{ opacity: 0.7 }}>Try reloading the page.</p>
          <button onClick={reset} style={{ marginTop: "2rem", padding: "0.75rem 1.5rem", borderRadius: 999 }}>Try again</button>
        </div>
      </body>
    </html>
  );
}
