import { Suspense } from "react";
import { SearchClient } from "./SearchClient";

export const metadata = { title: "Search" };

export default function Page() {
  return (
    <Suspense fallback={<section className="container-page py-32">Loading…</section>}>
      <SearchClient />
    </Suspense>
  );
}
