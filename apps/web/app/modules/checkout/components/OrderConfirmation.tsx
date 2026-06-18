"use client";

import Link from "next/link";
import { Card, Heading, Text, Button, PriceDisplay, Badge } from "@react-shop/design-system";
import type { Order } from "@react-shop/sdk";

interface OrderConfirmationProps {
  order: Order;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-success-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <Heading as="h2" size="2xl" className="mb-2">
        Order Confirmed!
      </Heading>
      <Text color="secondary" className="mb-6">
        Thank you for your purchase. Your order has been placed.
      </Text>

      <Card padding="lg" className="text-left mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Text size="sm" color="secondary">Order Number</Text>
            <Text weight="semibold">{order.orderNumber}</Text>
          </div>
          <Badge variant="subtle">{order.status}</Badge>
        </div>

        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <Text size="sm">
                {item.product?.title ?? "Product"} × {item.quantity}
              </Text>
              <PriceDisplay price={item.price * item.quantity} size="sm" />
            </div>
          ))}
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between">
            <Text weight="semibold">Total Paid</Text>
            <PriceDisplay price={order.total} size="md" />
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/account/orders">
          <Button variant="outline" size="lg">
            View Orders
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="solid" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
