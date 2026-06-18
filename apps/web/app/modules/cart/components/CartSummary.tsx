"use client";

import Link from "next/link";
import { Card, Heading, Text, Button, PriceDisplay, Divider } from "@react-shop/design-system";
import type { Cart } from "@react-shop/sdk";

interface CartSummaryProps {
  cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
  return (
    <Card padding="lg" className="sticky top-4">
      <Heading as="h3" size="xl" className="mb-4">
        Order Summary
      </Heading>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Text color="secondary">Subtotal</Text>
          <PriceDisplay price={cart.subtotal} size="sm" />
        </div>
        <div className="flex justify-between">
          <Text color="secondary">Tax</Text>
          <PriceDisplay price={cart.tax} size="sm" />
        </div>
        <div className="flex justify-between">
          <Text color="secondary">Shipping</Text>
          <Text size="sm" className="text-success-600 font-medium">
            Free
          </Text>
        </div>
      </div>

      <Divider className="my-4" />

      <div className="flex justify-between mb-6">
        <Text weight="semibold" size="lg">Total</Text>
        <PriceDisplay price={cart.total} size="lg" />
      </div>

      <Link href="/checkout">
        <Button variant="solid" size="lg" fullWidth>
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/products" className="block mt-3 text-center">
        <Text size="sm" className="text-primary-600 hover:text-primary-700">
          Continue Shopping
        </Text>
      </Link>
    </Card>
  );
}
