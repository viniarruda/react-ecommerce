"use client";

import { HeaderWrapper, FooterWrapper } from "@/app/modules/layout/components";
import { useMe, useLogout, useCart } from "@react-shop/sdk";
import { useGuestCart } from "@/app/providers/GuestCartProvider";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { data: user } = useMe();
  const { mutate: logout } = useLogout();
  const { data: cart } = useCart();
  const guestCart = useGuestCart();

  const serverCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const cartItemCount = user ? serverCount : guestCart.itemCount;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderWrapper
        user={user}
        cartItemCount={cartItemCount}
        onLogout={handleLogout}
      />
      <main className="flex-1">{children}</main>
      <FooterWrapper />
    </div>
  );
}
