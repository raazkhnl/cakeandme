"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Box,
  ChevronLeft,
  Image as ImageIcon,
  LayoutDashboard,
  ListOrdered,
  Mail,
  MessageSquare,
  Settings2,
  Star,
  Tags,
  Ticket,
  Users
} from "lucide-react";
import { useAuth } from "@/lib/auth/useAuth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ListOrdered },
  { href: "/admin/products", label: "Products", icon: Box },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/coupons", label: "Coupons", icon: Ticket },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/content", label: "Site content", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings2 }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading) return <section className="container-page py-32">Loading…</section>;
  if (!user) return null;
  if (!isAdmin) {
    return (
      <section className="container-page py-32">
        <div className="glass mx-auto max-w-lg rounded-3xl p-8 text-center">
          <h1 className="font-display text-3xl font-bold">Not authorised</h1>
          <p className="mt-2 text-muted-foreground">
            Your account ({user.email}) isn't on the admin list. Add it to <code className="rounded bg-surface-container px-1.5 py-0.5">NEXT_PUBLIC_ADMIN_EMAILS</code> and redeploy.
          </p>
          <Link href="/" className="btn-ghost mt-6 inline-flex">Back home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-32">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="glass sticky top-28 rounded-3xl p-5">
            <Link href="/" className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-3 w-3" /> Back to site
            </Link>
            <p className="font-display text-xl font-bold">Atelier admin</p>
            <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "inline-flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-surface-low/60 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
