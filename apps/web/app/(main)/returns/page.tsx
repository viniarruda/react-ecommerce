import { StaticPage } from "@/app/modules/static/StaticPage";

export const metadata = { title: "Returns & Refunds | Berzerk" };

export default function ReturnsPage() {
  return (
    <StaticPage
      title="Returns & Refunds"
      subtitle="Not happy? We make it easy to return or exchange."
      sections={[
        {
          heading: "30-Day Return Policy",
          content: "We accept returns on most items within 30 days of delivery. Items must be in their original condition — unworn, unwashed, with tags attached, and in the original packaging.",
        },
        {
          heading: "Items Eligible for Return",
          content: [
            "Clothing and accessories in original, unworn condition.",
            "Electronics in original packaging with all accessories.",
            "Home goods that are unused and undamaged.",
            "Items with a valid proof of purchase from our store.",
          ],
        },
        {
          heading: "Items Not Eligible for Return",
          content: [
            "Items marked as Final Sale or Non-Returnable at time of purchase.",
            "Personalized or custom-made products.",
            "Perishable goods and consumables.",
            "Items that have been worn, washed, or altered.",
            "Digital downloads and gift cards.",
          ],
        },
        {
          heading: "How to Start a Return",
          content: [
            "Log in to your account and go to My Orders.",
            "Select the order and click 'Return Items'.",
            "Choose the items you want to return and the reason.",
            "Print the prepaid return label we'll email you.",
            "Drop off the package at any authorized carrier location.",
          ],
        },
        {
          heading: "Refund Timeline",
          content: "Once we receive and inspect your return, refunds are processed within 3–5 business days. The credit will appear on your original payment method within 5–10 business days depending on your bank.",
        },
        {
          heading: "Exchanges",
          content: "We offer free exchanges for a different size or color of the same item, subject to availability. Start an exchange the same way as a return — select 'Exchange' instead of 'Return' and choose your preferred replacement.",
        },
        {
          heading: "Defective or Wrong Items",
          content: "If you received a defective, damaged, or incorrect item, please contact us within 7 days of delivery with photos. We'll send a replacement immediately at no cost and provide a prepaid return label for the original item.",
        },
      ]}
    />
  );
}
