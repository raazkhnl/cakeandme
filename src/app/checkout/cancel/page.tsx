import Link from "next/link";

export const metadata = { title: "Payment cancelled" };

export default function CheckoutCancel() {
  return (
    <section className="container-page py-32 text-center">
      <span className="chip-secondary">Cancelled</span>
      <h1 className="mt-4 font-display text-display-xl">Payment was cancelled.</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        No charge has been made. You can return to checkout and try again, or pick a different method.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/checkout" className="btn-primary">Back to checkout</Link>
        <Link href="/shop" className="btn-ghost">Keep browsing</Link>
      </div>
    </section>
  );
}
