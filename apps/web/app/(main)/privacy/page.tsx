import { StaticPage } from "@/app/modules/static/StaticPage";

export const metadata = { title: "Privacy Policy | Berzerk" };

export default function PrivacyPage() {
  return (
    <StaticPage
      title="Privacy Policy"
      subtitle="Your privacy matters to us. Here's how we collect, use, and protect your information."
      lastUpdated="June 18, 2026"
      sections={[
        {
          heading: "Information We Collect",
          content: [
            "Account information: name, email address, and password when you register.",
            "Order information: shipping address, billing address, and payment details.",
            "Usage data: pages visited, products viewed, and actions taken on our platform.",
            "Device information: browser type, operating system, and IP address.",
          ],
        },
        {
          heading: "How We Use Your Information",
          content: [
            "Process and fulfill your orders, including shipping and payment.",
            "Send order confirmations, shipping updates, and customer support messages.",
            "Improve our website, products, and services based on usage patterns.",
            "Send promotional emails when you've opted in (you can unsubscribe at any time).",
            "Prevent fraud and ensure the security of your account.",
          ],
        },
        {
          heading: "Sharing Your Information",
          content: "We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers (payment processors, shipping carriers) solely to fulfill your orders. These providers are contractually obligated to keep your information confidential.",
        },
        {
          heading: "Cookies",
          content: "We use cookies to maintain your session, remember your preferences, and understand how you interact with our site. You can disable cookies in your browser settings, though some features may not function properly.",
        },
        {
          heading: "Data Security",
          content: "We use industry-standard encryption (SSL/TLS) to protect data transmitted between your browser and our servers. Your payment information is processed by PCI-compliant payment providers and is never stored on our servers.",
        },
        {
          heading: "Your Rights",
          content: [
            "Access the personal data we hold about you at any time.",
            "Request correction of inaccurate data.",
            "Request deletion of your account and associated data.",
            "Opt out of marketing communications at any time.",
            "Lodge a complaint with your local data protection authority.",
          ],
        },
        {
          heading: "Contact Us",
          content: "If you have questions about this Privacy Policy or how we handle your data, please contact us at support@berzerk.com.",
        },
      ]}
    />
  );
}
