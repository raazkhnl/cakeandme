// Lightweight client-side helpers for Khalti & eSewa sandboxes.
// In production, the verify step *must* happen server-side
// (see /app/api/payments/<gateway>/verify/route.ts).

export type PaymentInitArgs = {
  amount: number;            // NPR
  orderCode: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  returnUrl: string;         // success url
  cancelUrl: string;
};

export type PaymentInitResult = {
  redirectUrl?: string;
  error?: string;
};

const ESEWA_FORM_ENDPOINT = "https://uat.esewa.com.np/epay/main"; // sandbox
const ESEWA_PRODUCTION_ENDPOINT = "https://esewa.com.np/epay/main";
const KHALTI_INIT_ENDPOINT = "https://a.khalti.com/api/v2/epayment/initiate/"; // ePayment v2

export function buildEsewaForm(args: PaymentInitArgs) {
  const merchantCode = process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE || "EPAYTEST";
  const isProduction = process.env.NEXT_PUBLIC_ESEWA_LIVE === "true";
  const url = isProduction ? ESEWA_PRODUCTION_ENDPOINT : ESEWA_FORM_ENDPOINT;
  const fields = {
    amt: args.amount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: args.amount,
    pid: args.orderCode,
    scd: merchantCode,
    su: args.returnUrl,
    fu: args.cancelUrl
  } as const;
  return { url, fields };
}

export function submitEsewa(args: PaymentInitArgs) {
  if (typeof document === "undefined") return;
  const { url, fields } = buildEsewaForm(args);
  const form = document.createElement("form");
  form.method = "POST";
  form.action = url;
  for (const [k, v] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = k;
    input.value = String(v);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

/**
 * Initiates a Khalti ePayment session.
 * Requires a server-side secret key (KHALTI_SECRET_KEY) — wire via /api/payments/khalti/init.
 */
export async function initKhalti(args: PaymentInitArgs): Promise<PaymentInitResult> {
  try {
    const res = await fetch("/api/payments/khalti/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args)
    });
    const json = await res.json();
    if (!res.ok) return { error: json.error ?? "Couldn't reach Khalti" };
    return { redirectUrl: json.payment_url };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

export const KHALTI_INIT = KHALTI_INIT_ENDPOINT;
