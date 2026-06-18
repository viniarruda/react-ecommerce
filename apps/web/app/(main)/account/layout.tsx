"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@react-shop/sdk";
import { Skeleton, Container } from "@react-shop/design-system";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <Container className="py-10">
        <Skeleton variant="rectangular" className="h-64 rounded-xl" />
      </Container>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
