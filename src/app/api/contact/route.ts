import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !body.email || !body.message) {
    return NextResponse.json({ error: "name, email, message required" }, { status: 400 });
  }
  // Hand-off point for transactional email integration (Resend / SendGrid).
  return NextResponse.json({ ok: true });
}
