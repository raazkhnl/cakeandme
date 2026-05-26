import type { Metadata } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FlavorGlow } from "@/components/FlavorGlow";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"]
});

const sans = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cakesbyratna.vercel.app"),
  title: {
    default: "Cakes by Ratna — Artisanal homemaker cakes, Kathmandu",
    template: "%s · Cakes by Ratna"
  },
  description:
    "An independent atelier, run by Ratna — built-to-order cakes for weddings, birthdays, anniversaries and quiet little Tuesdays.",
  openGraph: {
    title: "Cakes by Ratna",
    description: "An independent atelier in Kathmandu. Built-to-order, hand-crafted cakes.",
    type: "website",
    images: [{ url: "/signature-cake.jpg", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cakes by Ratna",
    description: "An independent atelier in Kathmandu. Built-to-order, hand-crafted cakes.",
    images: ["/signature-cake.jpg"]
  },
  icons: { icon: "/logo.png" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <FlavorGlow />
          <Navbar />
          <main id="main" className="relative">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
          <ScrollToTop />
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                background: "hsl(var(--surface-container))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                fontFamily: "var(--font-sans)"
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
