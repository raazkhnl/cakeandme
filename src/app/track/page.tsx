import { Suspense } from "react";
import { TrackClient } from "./TrackClient";

export const metadata = { title: "Track order" };

export default function Page() {
  return (
    <Suspense fallback={<section className="container-page py-32">Loading…</section>}>
      <TrackClient />
    </Suspense>
  );
}
