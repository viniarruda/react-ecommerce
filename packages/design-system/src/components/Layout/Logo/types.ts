export interface LogoProps {
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
  name?: string;
  abbrev?: string;
  logoUrl?: string;
}

