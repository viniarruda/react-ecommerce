"use client";

import {
  Card,
  Heading,
  Text,
  Button,
  PriceDisplay,
  Divider,
} from "@react-shop/design-system";
import type { Cart, Address } from "@react-shop/sdk";

interface OrderReviewProps {
  cart: Cart;
  shippingAddress: Address;
  onPlaceOrder: () => void;
  onBack: () => void;
  isLoading: boolean;
}

function AddressBlock({ address, label }: { address: Address; label: string }) {
  return (
    <div>
      <Text size="sm" weight="medium" className="mb-1">
        {label}
      </Text>
      <Text size="sm" color="secondary">
        {address.firstName} {address.lastName}
        <br />
        {address.street1}
        {address.street2 && (
          <>
            <br />
            {address.street2}
          </>
        )}
        <br />
        {address.city}, {address.state} {address.zipCode}
      </Text>
    </div>
  );
}

export function OrderReview({
  cart,
  shippingAddress,
  onPlaceOrder,
  onBack,
  isLoading,
}: OrderReviewProps) {
  return (
    <div className="space-y-6">
      <Heading as="h3" size="lg">
        Review Your Order
      </Heading>

      <Card padding="md">
        <Heading as="h4" size="md" className="mb-3">
          Delivery Address
        </Heading>
        <AddressBlock address={shippingAddress} label="Shipping to" />
      </Card>

      <Card padding="md">
        <Heading as="h4" size="md" className="mb-3">
          Items ({cart.items.length})
        </Heading>
        <div className="space-y-3">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <Text size="sm">{item.product?.title ?? "Product"}</Text>
                {item.variant && (
                  <Text size="xs" color="secondary">
                    {item.variant.name}
                  </Text>
                )}
                <Text size="xs" color="secondary">
                  Qty: {item.quantity}
                </Text>
              </div>
              <PriceDisplay price={item.price * item.quantity} size="sm" />
            </div>
          ))}
        </div>

        <Divider className="my-3" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <Text size="sm" color="secondary">Subtotal</Text>
            <PriceDisplay price={cart.subtotal} size="sm" />
          </div>
          <div className="flex justify-between">
            <Text size="sm" color="secondary">Tax</Text>
            <PriceDisplay price={cart.tax} size="sm" />
          </div>
          <div className="flex justify-between">
            <Text size="sm" color="secondary">Shipping</Text>
            <Text size="sm" className="text-success-600 font-medium">Free</Text>
          </div>
          <Divider />
          <div className="flex justify-between">
            <Text weight="semibold">Total</Text>
            <PriceDisplay price={cart.total} size="md" />
          </div>
        </div>
      </Card>

      <Card padding="md" className="bg-gray-50">
        <Heading as="h4" size="md" className="mb-2">
          Payment
        </Heading>
        <Text size="sm" color="secondary">
          Payment processing is simulated. No real charge will occur.
        </Text>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        <Button
          variant="solid"
          size="lg"
          className="flex-1"
          onClick={onPlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
