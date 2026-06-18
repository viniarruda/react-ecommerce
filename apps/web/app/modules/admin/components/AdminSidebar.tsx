"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { branding } from "@/config/branding";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/categories", label: "Categories", icon: "🗂" },
  { href: "/admin/orders", label: "Orders", icon: "🛒" },
  { href: "/admin/reviews", label: "Reviews", icon: "★" },
  { href: "/admin/users", label: "Users", icon: "👥" },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="w-56 flex-shrink-0 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="px-4 py-5 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-600 rounded flex items-center justify-center text-xs font-bold">
            {branding.store.logoAbbrev[0]}
          </div>
          <span className="font-semibold text-sm">{branding.store.name}</span>
        </Link>
        <p className="text-xs text-gray-500 mt-0.5 ml-9">Admin</p>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive(href)
                ? "bg-primary-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <span className="text-base leading-none">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-800">
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
}
