"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe, UserRole } from "@react-shop/sdk";
import { AdminSidebar } from "@/app/modules/admin/components";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== UserRole.ADMIN)) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading…
      </div>
    );
  }

  if (!user || user.role !== UserRole.ADMIN) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
