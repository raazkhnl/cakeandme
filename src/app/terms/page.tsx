export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <section className="container-page py-32">
      <header className="mb-10 max-w-2xl">
        <span className="chip-secondary">Terms</span>
        <h1 className="mt-4 font-display text-display-xl text-balance">Plain-language terms.</h1>
      </header>
      <article className="prose-cbr max-w-3xl space-y-5 text-pretty text-muted-foreground md:text-lg">
        <p>
          By placing an order with Cakes by Ratna, you agree to these terms. They exist to make expectations clear —
          not to confuse anyone.
        </p>
        <h2 className="font-display text-2xl text-foreground">Orders</h2>
        <p>
          We confirm every order manually. If something on our end goes wrong, we'll let you know and offer to either
          remake or refund the affected portion.
        </p>
        <h2 className="font-display text-2xl text-foreground">Payments</h2>
        <p>
          Payment is required before we begin (with the exception of cash on delivery). For wallet & bank-transfer
          payments, we verify manually within an hour.
        </p>
        <h2 className="font-display text-2xl text-foreground">Delivery</h2>
        <p>
          Delivery times are estimates. We do our best to be on time and will call ahead if we're running late.
        </p>
        <h2 className="font-display text-2xl text-foreground">Refunds</h2>
        <p>
          Once a cake has been started, ingredients are committed. We can't refund the cake, but if there's a quality
          issue on our end, we'll always make it right.
        </p>
        <h2 className="font-display text-2xl text-foreground">Reach us</h2>
        <p>
          Anything not covered? <a href="/contact" className="underline">Get in touch</a>.
        </p>
      </article>
    </section>
  );
}
