"use client";

import { useState } from "react";
import Link from "next/link";
import { branding } from "@/config/branding";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to an API endpoint
    setSent(true);
  };

  const inputClass = "w-full rounded-xl border border-[color:var(--shop-border)] px-4 py-3 text-sm bg-[color:var(--shop-surface)] text-gray-900 dark:text-gray-100 placeholder:text-[color:var(--shop-muted)] focus:outline-none focus:border-[color:var(--color-primary-600)] transition-colors";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link href="/" className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--shop-muted)] hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          ← Home
        </Link>

        <div className="mt-8 mb-12">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-gray-900 dark:text-gray-50 leading-tight mb-3">
            Contact Us
          </h1>
          <p className="text-base text-[color:var(--shop-muted)]">
            We typically respond within 24 hours on business days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* ── Info ── */}
          <div className="space-y-8">
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--shop-muted)] mb-2">Email</p>
              <a href={`mailto:${branding.contact.email}`} className="text-sm font-medium text-[color:var(--color-primary-600)] hover:underline">
                {branding.contact.email}
              </a>
            </div>
            {branding.contact.phone && (
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--shop-muted)] mb-2">Phone</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{branding.contact.phone}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--shop-muted)] mb-2">Hours</p>
              <p className="text-sm text-gray-900 dark:text-gray-100">Mon–Fri: 9am–6pm EST</p>
              <p className="text-sm text-[color:var(--shop-muted)]">Sat–Sun: Closed</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--shop-muted)] mb-3">Quick links</p>
              <div className="space-y-2">
                {[
                  { href: "/faq", label: "FAQ" },
                  { href: "/shipping", label: "Shipping Info" },
                  { href: "/returns", label: "Returns & Refunds" },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="block text-sm text-[color:var(--shop-muted)] hover:text-[color:var(--color-primary-600)] transition-colors">
                    {label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div>
            {sent ? (
              <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: "var(--shop-surface)", border: "1px solid var(--shop-border)" }}>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Message sent!</h2>
                <p className="text-sm text-[color:var(--shop-muted)]">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Name *</label>
                    <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Subject *</label>
                  <input required value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} placeholder="How can we help?" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Message *</label>
                  <textarea required rows={6} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="Tell us more about your question or issue…" className={`${inputClass} resize-none`} />
                </div>
                <button type="submit" className="w-full py-4 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold tracking-[0.08em] uppercase hover:bg-[color:var(--color-primary-600)] transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
