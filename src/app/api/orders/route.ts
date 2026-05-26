import { NextRequest, NextResponse } from "next/server";

/**
 * Order endpoint.
 *
 * We currently let the client write directly to Firestore for guest-friendly
 * checkout. This route is reserved for future server-side validation,
 * coupon-checks, email dispatch, and stock decrement. For now it echoes
 * a healthy response so the client knows the route exists.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  return NextResponse.json({ ok: true, received: true });
}

export async function GET() {
  return NextResponse.json({ status: "ready" });
}
