import { NextRequest, NextResponse } from "next/server";

const KHALTI_ENDPOINT = process.env.KHALTI_LIVE === "true"
  ? "https://khalti.com/api/v2/epayment/initiate/"
  : "https://a.khalti.com/api/v2/epayment/initiate/";

export async function POST(req: NextRequest) {
  const secret = process.env.KHALTI_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Khalti secret not configured — set KHALTI_SECRET_KEY in Vercel" },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  const { amount, orderCode, customerEmail, customerName, customerPhone, returnUrl } = body;
  if (!amount || !orderCode || !returnUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    return_url: returnUrl,
    website_url: new URL(req.url).origin,
    amount: Math.round(amount * 100), // paisa
    purchase_order_id: orderCode,
    purchase_order_name: `Cakes by Ratna · ${orderCode}`,
    customer_info: { name: customerName, email: customerEmail, phone: customerPhone }
  };

  const res = await fetch(KHALTI_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Key ${secret}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json({ error: data?.detail ?? "Khalti rejected the request", details: data }, { status: 502 });
  }
  return NextResponse.json(data);
}
