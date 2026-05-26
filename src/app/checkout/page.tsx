"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Check, CreditCard, QrCode, ShieldCheck, Ticket, Truck, Upload } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/auth/useAuth";
import { createOrder } from "@/lib/data/orders";
import { uploadImage } from "@/lib/firebase/storage";
import { applyCoupon, getCoupon } from "@/lib/data/coupons";
import { submitEsewa, initKhalti } from "@/lib/payments";
import { formatNPR, safeImg } from "@/lib/utils";
import type { Coupon, PaymentMethod } from "@/lib/types";

const DELIVERY_FEE = 200;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [note, setNote] = useState("");
  const [requiredBy, setRequiredBy] = useState("");

  const [method, setMethod] = useState<PaymentMethod>("qr_upload");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const sub = subtotal();
  const discount = coupon ? applyCoupon(coupon, sub) : 0;
  const total = useMemo(() => Math.max(0, sub + (items.length ? DELIVERY_FEE : 0) - discount), [sub, items.length, discount]);

  useEffect(() => {
    if (user) {
      if (!email) setEmail(user.email ?? "");
      if (!name && user.displayName) setName(user.displayName);
    }
  }, [user, email, name]);

  const tryCoupon = async () => {
    const c = await getCoupon(couponInput);
    if (!c) {
      setCoupon(null);
      return toast.error("That code doesn't exist");
    }
    if (!c.active) {
      setCoupon(null);
      return toast.error("That code isn't active");
    }
    if (c.expiresAt && c.expiresAt < Date.now()) {
      setCoupon(null);
      return toast.error("That code has expired");
    }
    if (c.minSubtotal && sub < c.minSubtotal) {
      setCoupon(null);
      return toast.error(`Spend ${formatNPR(c.minSubtotal)} to use this code`);
    }
    setCoupon(c);
    toast.success(`Code ${c.code} applied`);
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Your basket is empty");
    if (!name || !email || !phone || !address || !requiredBy) return toast.error("Fill in delivery details");
    setSubmitting(true);
    try {
      let screenshotUrl: string | undefined;
      if (method === "qr_upload" && screenshot) {
        screenshotUrl = await uploadImage(screenshot, "payment-screenshots");
      }
      const order = await createOrder({
        uid: user?.uid ?? null,
        customer: { name, email: email.trim().toLowerCase(), phone, address, city, note },
        items,
        subtotal: sub,
        deliveryFee: DELIVERY_FEE,
        discount: coupon ? { code: coupon.code, amount: discount } : undefined,
        total,
        requiredBy,
        status: method === "khalti" || method === "esewa" ? "pending_payment" : "received",
        payment: {
          method,
          status: method === "qr_upload" && screenshotUrl
            ? "pending_review"
            : method === "cod"
            ? "unpaid"
            : "unpaid",
          screenshotUrl,
          amount: total
        }
      });

      const origin = window.location.origin;
      const successUrl = `${origin}/checkout/success?code=${order.code}`;
      const cancelUrl = `${origin}/checkout/cancel?code=${order.code}`;

      if (method === "khalti") {
        const { redirectUrl, error } = await initKhalti({
          amount: total,
          orderCode: order.code,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          returnUrl: successUrl,
          cancelUrl
        });
        if (error) {
          toast.error(error);
        } else if (redirectUrl) {
          window.location.href = redirectUrl;
          return;
        }
      } else if (method === "esewa") {
        submitEsewa({
          amount: total,
          orderCode: order.code,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          returnUrl: successUrl,
          cancelUrl
        });
        return;
      }

      clear();
      router.push(`/checkout/success?code=${order.code}`);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't place the order", { description: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="container-page py-32 text-center">
        <h1 className="font-display text-display-lg">Nothing to check out</h1>
        <p className="mt-3 text-muted-foreground">Add something to your basket first.</p>
        <a href="/shop" className="btn-primary mt-6 inline-flex">Browse cakes</a>
      </section>
    );
  }

  return (
    <section className="container-page py-32">
      <header className="mb-10">
        <span className="chip-secondary">Almost there</span>
        <h1 className="mt-4 font-display text-display-xl">Checkout</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          No account required. Use the same email later to track your order. Or sign in for a saved address.
        </p>
      </header>

      <form onSubmit={placeOrder} className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <fieldset className="glass rounded-3xl p-7">
            <legend className="px-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Truck className="h-3 w-3" /> Delivery details</span>
            </legend>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label><span className="field-label">Name</span><input className="field" value={name} onChange={(e) => setName(e.target.value)} required /></label>
              <label><span className="field-label">Phone</span><input className="field" value={phone} onChange={(e) => setPhone(e.target.value)} required /></label>
              <label className="md:col-span-2"><span className="field-label">Email <span className="text-muted-foreground">(used for tracking)</span></span><input type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
              <label className="md:col-span-2"><span className="field-label">Address</span><textarea className="field" value={address} rows={2} onChange={(e) => setAddress(e.target.value)} required /></label>
              <label><span className="field-label">City</span><input className="field" value={city} onChange={(e) => setCity(e.target.value)} /></label>
              <label><span className="field-label">Required by</span><input type="datetime-local" className="field" min={new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString().slice(0, 16)} value={requiredBy} onChange={(e) => setRequiredBy(e.target.value)} required /></label>
              <label className="md:col-span-2"><span className="field-label">Notes</span><textarea className="field" rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anything else we should know?" /></label>
            </div>
          </fieldset>

          <fieldset className="glass rounded-3xl p-7">
            <legend className="px-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CreditCard className="h-3 w-3" /> Payment</span>
            </legend>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <PaymentOption active={method === "qr_upload"} onClick={() => setMethod("qr_upload")} icon={<QrCode className="h-5 w-5" />} title="QR / Bank · Upload screenshot" description="Scan our QR (eSewa / Khalti / mobile banking), pay, and upload proof. We'll verify in under an hour." />
              <PaymentOption active={method === "khalti"} onClick={() => setMethod("khalti")} icon={<span className="font-display text-base font-bold">K</span>} title="Khalti" description="Pay instantly with Khalti wallet (sandbox-ready)." />
              <PaymentOption active={method === "esewa"} onClick={() => setMethod("esewa")} icon={<span className="font-display text-base font-bold">e</span>} title="eSewa" description="Pay instantly with eSewa wallet (sandbox-ready)." />
              <PaymentOption active={method === "cod"} onClick={() => setMethod("cod")} icon={<Truck className="h-5 w-5" />} title="Cash on delivery" description="Pay our delivery rider when the cake arrives." />
            </div>

            {method === "qr_upload" && (
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-center">
                  <Image src="/logo.png" alt="Payment QR" width={180} height={180} className="mx-auto rounded-2xl bg-background object-contain p-3" />
                  <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Scan to pay</p>
                  <p className="mt-1 font-display text-xl font-bold">{formatNPR(total)}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Use any wallet. Admin can swap this QR from Admin → Content.</p>
                </div>
                <label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-sm text-muted-foreground transition-colors hover:border-secondary/40 hover:text-foreground">
                  <span className="inline-flex items-center gap-2 text-foreground"><Upload className="h-4 w-4" /> Upload payment screenshot</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setScreenshot(e.target.files?.[0] ?? null)} />
                  {screenshot ? (<span className="rounded-xl border border-border bg-surface p-3 text-foreground">{screenshot.name}</span>) : (<span>JPG / PNG · we verify within an hour.</span>)}
                </label>
              </div>
            )}

            {(method === "khalti" || method === "esewa") && (
              <div className="mt-6 rounded-2xl border border-border bg-surface/50 p-5 text-sm text-muted-foreground">
                <p className="mb-2 inline-flex items-center gap-2 text-foreground"><ShieldCheck className="h-4 w-4 text-secondary" /> Sandbox ready</p>
                <p>
                  Add <code className="rounded bg-surface-container px-1.5 py-0.5">KHALTI_SECRET_KEY</code>{" "}
                  / set <code className="rounded bg-surface-container px-1.5 py-0.5">NEXT_PUBLIC_ESEWA_MERCHANT_CODE</code>{" "}
                  for live payments. You'll be redirected to the gateway and back here on success or cancel.
                </p>
              </div>
            )}
          </fieldset>
        </div>

        <aside className="lg:col-span-5">
          <div className="glass sticky top-28 space-y-5 rounded-3xl p-7">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Order summary</p>
            <ul className="divide-y divide-border/60 text-sm">
              {items.map((i) => (
                <li key={`${i.productId}-${i.sizeLabel}-${i.flavor}`} className="flex items-center gap-3 py-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-border">
                    <Image src={safeImg(i.image)} alt="" fill sizes="60px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{i.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{i.sizeLabel}{i.flavor ? ` · ${i.flavor}` : ""} · ×{i.quantity}</p>
                  </div>
                  <span className="text-foreground">{formatNPR(i.unitPrice * i.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Coupon</p>
              {coupon ? (
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 text-foreground"><Ticket className="h-4 w-4 text-secondary" /> {coupon.code} applied</span>
                  <button type="button" onClick={() => { setCoupon(null); setCouponInput(""); }} className="text-xs text-muted-foreground hover:text-foreground">Remove</button>
                </div>
              ) : (
                <div className="mt-2 flex gap-2">
                  <input className="field flex-1 !py-2 !text-sm" placeholder="Code" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} />
                  <button type="button" onClick={tryCoupon} className="btn-ghost !py-2 !text-[11px]">Apply</button>
                </div>
              )}
            </div>

            <div className="space-y-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-foreground">{formatNPR(sub)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="text-foreground">{formatNPR(DELIVERY_FEE)}</span></div>
              {discount > 0 && <div className="flex justify-between"><span>Discount ({coupon?.code})</span><span className="text-foreground">−{formatNPR(discount)}</span></div>}
            </div>
            <div className="flex items-baseline justify-between border-t border-border/60 pt-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Total</span>
              <span className="font-display text-3xl font-bold">{formatNPR(total)}</span>
            </div>
            <button disabled={submitting} type="submit" className="btn-primary w-full">
              {submitting ? "Placing…" : "Place order"} <Check className="h-4 w-4" />
            </button>
            <p className="text-center text-[11px] text-muted-foreground">By placing the order you agree to be contacted about its progress.</p>
          </div>
        </aside>
      </form>
    </section>
  );
}

function PaymentOption({ active, onClick, icon, title, description }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; description: string; }) {
  return (
    <button type="button" onClick={onClick} className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all ${active ? "border-secondary/60 bg-secondary/10 text-foreground" : "border-border bg-surface/40 text-muted-foreground hover:text-foreground"}`}>
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-border">{icon}</span>
      <span className="flex-1">
        <span className="block font-display text-base font-semibold text-foreground">{title}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{description}</span>
      </span>
      <span className={`mt-1 h-4 w-4 shrink-0 rounded-full border ${active ? "border-secondary bg-secondary" : "border-border"}`} />
    </button>
  );
}
