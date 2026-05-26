export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <section className="container-page py-32">
      <header className="mb-10 max-w-2xl">
        <span className="chip-secondary">Privacy</span>
        <h1 className="mt-4 font-display text-display-xl text-balance">What we keep, what we don't.</h1>
      </header>
      <article className="prose-cbr max-w-3xl space-y-5 text-pretty text-muted-foreground md:text-lg">
        <p>
          Cakes by Ratna is a small, owner-run atelier. We collect only the information we need to bake and deliver
          your order, and we don't sell or share it with third parties.
        </p>
        <h2 className="font-display text-2xl text-foreground">What we keep</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Your name, phone, email, and delivery address — for the order and for future tracking.</li>
          <li>Order history — so we can re-bake favourites if you ask.</li>
          <li>Payment screenshots — held briefly while we verify the transfer, then archived.</li>
          <li>If you signed in: your Firebase auth profile (Google or email).</li>
        </ul>
        <h2 className="font-display text-2xl text-foreground">What we don't</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Sell your data — ever.</li>
          <li>Send you marketing you didn't ask for.</li>
          <li>Track you across other websites.</li>
        </ul>
        <h2 className="font-display text-2xl text-foreground">Your rights</h2>
        <p>
          Email <a href="mailto:cakebyratna@gmail.com" className="underline">cakebyratna@gmail.com</a> at any time to
          ask for a copy of your data, or to delete your account.
        </p>
      </article>
    </section>
  );
}
