"use client";

import { useState } from "react";
import Link from "next/link";
import { branding } from "@/config/branding";
import { formatPrice } from "@/lib/format";

const { shipping, policies } = branding;
const threshold = formatPrice(shipping.freeShippingThreshold, { minimumFractionDigits: 0 });

const FAQS = [
  {
    category: "Orders",
    items: [
      { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number. You can also track your order under My Orders in your account dashboard." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Contact support immediately if you need to make changes." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. All transactions are secured with 256-bit SSL encryption." },
      { q: "Do you offer gift wrapping?", a: "Yes! You can add gift wrapping at checkout for a small fee. We'll include a handwritten note card if you provide a message." },
    ],
  },
  {
    category: "Shipping",
    items: [
      { q: "How long does shipping take?", a: `Standard shipping takes ${shipping.standardDays}. Express shipping takes ${shipping.expressDays}. Overnight shipping is available for orders placed before ${shipping.overnightCutoff}.` },
      { q: "Do you ship internationally?", a: `Yes, we ship to over 50 countries. International shipping takes ${shipping.internationalDays}. Customs duties and import taxes are the customer's responsibility.` },
      { q: "Is shipping free?", a: `Standard shipping is free on orders over ${threshold}. Orders under ${threshold} have a flat ${formatPrice(shipping.standardFee)} shipping fee. Express and overnight shipping have additional costs.` },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: `We accept returns within ${policies.returnWindowDays} days of delivery. Items must be unused, unworn, and in original packaging. Visit our Returns page to start the process.` },
      { q: "How long does a refund take?", a: `Once we receive your return, refunds are processed in ${policies.refundProcessingDays}. The credit appears on your card within ${policies.refundCreditDays}.` },
      { q: "Can I exchange an item?", a: "Yes! We offer free exchanges for a different size or color of the same item, subject to availability. Start the process from My Orders in your account." },
    ],
  },
  {
    category: "Account & Security",
    items: [
      { q: "How do I create an account?", a: "Click Sign Up in the top navigation. You'll need your email address and a password. Creating an account lets you track orders, save addresses, and check out faster." },
      { q: "I forgot my password. What do I do?", a: "Click 'Forgot password?' on the login page. We'll send a reset link to your email address. The link expires after 24 hours." },
      { q: "Is my payment information secure?", a: "Absolutely. We never store your payment details on our servers. All payment processing is handled by PCI-compliant payment providers using industry-standard encryption." },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[color:var(--shop-border)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[color:var(--color-primary-600)] transition-colors">
          {q}
        </span>
        <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full border border-[color:var(--shop-border)] text-[color:var(--shop-muted)] transition-transform ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm text-[color:var(--shop-muted)] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link href="/" className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--shop-muted)] hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          ← Home
        </Link>

        <div className="mt-8 mb-12 pb-8 border-b border-[color:var(--shop-border)]">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-gray-900 dark:text-gray-50 leading-tight mb-3">
            FAQ
          </h1>
          <p className="text-base text-[color:var(--shop-muted)]">
            Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-[color:var(--color-primary-600)] hover:underline">
              Contact us
            </Link>
          </p>
        </div>

        <div className="space-y-10">
          {FAQS.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-[color:var(--shop-muted)] mb-2">
                {section.category}
              </h2>
              <div>
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
