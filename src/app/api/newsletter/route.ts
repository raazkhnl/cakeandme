import { NextRequest, NextResponse } from "next/server";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email, source = "api" } = await req.json().catch(() => ({}) as { email?: string; source?: string });
  if (!email || !emailRe.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  // The client also writes directly to Firestore — this route exists so we
  // can layer in a transactional welcome email later without changing the UI.
  return NextResponse.json({ ok: true, email });
}
