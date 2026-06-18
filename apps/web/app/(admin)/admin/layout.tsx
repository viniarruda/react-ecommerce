import type { Metadata } from "next";
import { branding } from "@/config/branding";

export const metadata: Metadata = {
  title: {
    default: `Admin | ${branding.store.name}`,
    template: `%s | ${branding.store.name} Admin`,
  },
};

export default function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
