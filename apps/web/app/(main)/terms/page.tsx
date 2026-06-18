import { StaticPage } from "@/app/modules/static/StaticPage";
import { branding } from "@/config/branding";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <StaticPage
      title="Terms of Service"
      subtitle={`By using ${branding.store.name}, you agree to the following terms and conditions.`}
      lastUpdated="June 18, 2026"
      sections={[
        {
          heading: "Acceptance of Terms",
          content: "By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.",
        },
        {
          heading: "Account Responsibilities",
          content: [
            "You must provide accurate and complete information when creating an account.",
            "You are responsible for maintaining the confidentiality of your password.",
            "You must notify us immediately of any unauthorized use of your account.",
            "You may not use another person's account without permission.",
          ],
        },
        {
          heading: "Products and Pricing",
          content: `All prices are listed in ${branding.locale.currency} and are subject to change without notice. We reserve the right to limit quantities, discontinue products, or refuse orders at our discretion. Product images are for illustrative purposes and may differ slightly from the actual product.`,
        },
        {
          heading: "Orders and Payment",
          content: [
            "Orders are subject to acceptance and availability.",
            "We reserve the right to cancel any order for any reason.",
            "Payment must be received before orders are processed.",
            "You agree not to use fraudulent payment methods.",
          ],
        },
        {
          heading: "Intellectual Property",
          content: `All content on this website — including text, graphics, logos, and images — is the property of ${branding.store.name} and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
        },
        {
          heading: "Limitation of Liability",
          content: `${branding.store.name} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our products. Our total liability shall not exceed the amount you paid for the specific order giving rise to the claim.`,
        },
        {
          heading: "Governing Law",
          content: "These terms are governed by and construed in accordance with applicable law. Any disputes shall be resolved through binding arbitration or in courts of competent jurisdiction.",
        },
        {
          heading: "Changes to Terms",
          content: "We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms. We will notify registered users of material changes via email.",
        },
      ]}
    />
  );
}
