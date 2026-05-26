import { NextRequest, NextResponse } from "next/server";

const KHALTI_LOOKUP = process.env.KHALTI_LIVE === "true"
  ? "https://khalti.com/api/v2/epayment/lookup/"
  : "https://a.khalti.com/api/v2/epayment/lookup/";

export async function POST(req: NextRequest) {
  const secret = process.env.KHALTI_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Khalti not configured" }, { status: 503 });
  const { pidx } = await req.json().catch(() => ({}));
  if (!pidx) return NextResponse.json({ error: "pidx required" }, { status: 400 });
  const res = await fetch(KHALTI_LOOKUP, {
    method: "POST",
    headers: { Authorization: `Key ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({ pidx })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return NextResponse.json({ error: "Lookup failed", details: data }, { status: 502 });
  return NextResponse.json(data);
}
