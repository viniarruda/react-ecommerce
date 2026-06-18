import { StaticPage } from "@/app/modules/static/StaticPage";

export const metadata = { title: "Shipping Information | Berzerk" };

export default function ShippingPage() {
  return (
    <StaticPage
      title="Shipping Info"
      subtitle="Fast, reliable delivery straight to your door."
      sections={[
        {
          heading: "Free Standard Shipping",
          content: "All orders over $50 qualify for free standard shipping within the contiguous United States. Orders under $50 are charged a flat rate of $4.99.",
        },
        {
          heading: "Delivery Timeframes",
          content: [
            "Standard Shipping: 5–7 business days.",
            "Express Shipping: 2–3 business days ($9.99).",
            "Overnight Shipping: Next business day if ordered before 1pm EST ($24.99).",
            "International Shipping: 10–21 business days (rates calculated at checkout).",
          ],
        },
        {
          heading: "Order Processing",
          content: "Orders placed before 2pm EST on business days are processed the same day. Orders placed on weekends or holidays are processed the next business day. You'll receive a shipping confirmation email with tracking information once your order ships.",
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
