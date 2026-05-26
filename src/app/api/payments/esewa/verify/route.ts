import { NextRequest, NextResponse } from "next/server";

const ESEWA_VERIFY = process.env.NEXT_PUBLIC_ESEWA_LIVE === "true"
  ? "https://esewa.com.np/epay/transrec"
  : "https://uat.esewa.com.np/epay/transrec";

export async function POST(req: NextRequest) {
  const { amt, rid, pid } = await req.json().catch(() => ({}));
  if (!amt || !rid || !pid) {
    return NextResponse.json({ error: "amt, rid (refId), pid (orderCode) required" }, { status: 400 });
  }
  const merchantCode = process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE || "EPAYTEST";
  const form = new URLSearchParams({ amt: String(amt), rid, pid, scd: merchantCode });
  const res = await fetch(ESEWA_VERIFY, { method: "POST", body: form });
  const xml = await res.text();
  const success = /<response_code>\s*Success\s*<\/response_code>/i.test(xml);
  return NextResponse.json({ verified: success, raw: xml });
}
