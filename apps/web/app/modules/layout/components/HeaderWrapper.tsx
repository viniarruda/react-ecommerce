"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Header as DSHeader,
  Logo as DSLogo,
  SearchBar as DSSearchBar,
  Navigation as DSNavigation,
  CartIcon as DSCartIcon,
  UserMenu as DSUserMenu,
  MobileMenu as DSMobileMenu,
  type User,
  type NavLink,
} from "@react-shop/design-system";
import { branding } from "@/config/branding";
import { ThemeToggle } from "./ThemeToggle";

// Wrapper component to match the expected Link interface
const LinkWrapper = ({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <Link href={href} className={className} onClick={onClick}>
    {children}
  </Link>
);

interface HeaderWrapperProps {
  user?: User | null;
  cartItemCount?: number;
  onLogout?: () => void;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/deals", label: "Deals" },
];

export function HeaderWrapper({
  user,
  cartItemCount,
  onLogout,
}: HeaderWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // User menu state
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle search submit
  const handleSearchSubmit = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // Handle user menu click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mobile menu body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle logout with router push
  const handleLogout = () => {
    onLogout?.();
    router.push("/");
  };

  return (
    <DSHeader
      LogoComponent={
        <DSLogo
          LinkComponent={LinkWrapper}
          name={branding.store.logoText}
          abbrev={branding.store.logoAbbrev}
          logoUrl={branding.store.logoUrl}
        />
      }
      SearchBarComponent={
        <DSSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearchSubmit}
        />
      }
      NavigationComponent={
        <DSNavigation
          links={NAV_LINKS}
          currentPath={pathname}
          LinkComponent={LinkWrapper}
        />
      }
      CartIconComponent={
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <DSCartIcon itemCount={cartItemCount} LinkComponent={LinkWrapper} />
        </div>
      }
      UserMenuComponent={
        <DSUserMenu
          user={user}
          onLogout={handleLogout}
          isOpen={isUserMenuOpen}
          onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
          onClose={() => setIsUserMenuOpen(false)}
          LinkComponent={LinkWrapper}
          menuRef={userMenuRef}
        />
      }
      MobileMenuComponent={
        <DSMobileMenu
          user={user}
          onLogout={handleLogout}
          isOpen={isMobileMenuOpen}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onClose={() => setIsMobileMenuOpen(false)}
          navLinks={NAV_LINKS}
          currentPath={pathname}
          LinkComponent={LinkWrapper}
        />
      }
    />
  );
}

