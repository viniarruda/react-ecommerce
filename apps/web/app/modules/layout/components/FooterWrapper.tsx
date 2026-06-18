"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer as DSFooter } from "@react-shop/design-system";
import { branding } from "@/config/branding";

// Wrapper component to match the expected Link interface
const LinkWrapper = ({
  href,
  className,
  target,
  rel,
  children,
}: {
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}) => (
  <Link href={href} className={className} target={target} rel={rel}>
    {children}
  </Link>
);

export function FooterWrapper() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log("Newsletter signup:", newsletterEmail);
    setNewsletterEmail("");
  };

  return (
    <DSFooter
      newsletterEmail={newsletterEmail}
      onNewsletterEmailChange={setNewsletterEmail}
      onNewsletterSubmit={handleNewsletterSubmit}
      storeName={branding.store.name}
      tagline={branding.store.description}
      LinkComponent={LinkWrapper}
    />
  );
}

