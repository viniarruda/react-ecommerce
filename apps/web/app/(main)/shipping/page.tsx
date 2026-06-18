import { StaticPage } from "@/app/modules/static/StaticPage";
import { branding } from "@/config/branding";
import { formatPrice } from "@/lib/format";

export const metadata = { title: "Shipping Information" };

const { shipping } = branding;
const threshold = formatPrice(shipping.freeShippingThreshold, { minimumFractionDigits: 0 });

export default function ShippingPage() {
  return (
    <StaticPage
      title="Shipping Info"
      subtitle="Fast, reliable delivery straight to your door."
      sections={[
        {
          heading: "Free Standard Shipping",
          content: `All orders over ${threshold} qualify for free standard shipping within the contiguous United States. Orders under ${threshold} are charged a flat rate of ${formatPrice(shipping.standardFee)}.`,
        },
        {
          heading: "Delivery Timeframes",
          content: [
            `Standard Shipping: ${shipping.standardDays}.`,
            `Express Shipping: ${shipping.expressDays} (${formatPrice(shipping.expressFee)}).`,
            `Overnight Shipping: Next business day if ordered before ${shipping.overnightCutoff} (${formatPrice(shipping.overnightFee)}).`,
            `International Shipping: ${shipping.internationalDays} (rates calculated at checkout).`,
          ],
        },
        {
          heading: "Order Processing",
          content: `Orders placed before ${shipping.processingCutoff} on business days are processed the same day. Orders placed on weekends or holidays are processed the next business day. You'll receive a shipping confirmation email with tracking information once your order ships.`,
        },
        {
          heading: "Tracking Your Order",
          content: "Once your order ships, you'll receive an email with a tracking number. You can also track your order in the My Orders section of your account. It may take up to 24 hours for tracking information to become active.",
        },
        {
          heading: "International Orders",
          content: [
            "We ship to over 50 countries worldwide.",
            "International customers are responsible for any customs duties or import taxes.",
            "Delivery times vary by destination and customs processing.",
            "Some items may be restricted from shipping to certain countries.",
          ],
        },
        {
          heading: "Lost or Damaged Shipments",
          content: "If your order arrives damaged or goes missing, please contact us within 7 days of the expected delivery date. We'll investigate with the carrier and send a replacement or issue a full refund at no additional cost.",
        },
      ]}
    />
  );
}
