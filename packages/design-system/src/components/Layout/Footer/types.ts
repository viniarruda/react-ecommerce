export interface FooterProps {
  newsletterEmail: string;
  onNewsletterEmailChange: (email: string) => void;
  onNewsletterSubmit: (e: React.FormEvent) => void;
  storeName?: string;
  tagline?: string;
  LinkComponent: React.ComponentType<{
    href: string;
    className?: string;
    target?: string;
    rel?: string;
    children: React.ReactNode;
  }>;
}

