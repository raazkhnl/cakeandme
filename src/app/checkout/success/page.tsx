import { Suspense } from "react";
import { SuccessClient } from "./SuccessClient";

export const metadata = { title: "Order confirmed" };

export default function Page() {
  return (
    <Suspense fallback={<section className="container-page py-32">Loading…</section>}>
      <SuccessClient />
    </Suspense>
  );
}
