import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cakes by Ratna",
    short_name: "Cakes by Ratna",
    description: "Artisanal homemaker cakes, Kathmandu. Built to order.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f9",
    theme_color: "#240016",
    icons: [
      { src: "/logo.png", sizes: "any", type: "image/png" }
    ]
  };
}
