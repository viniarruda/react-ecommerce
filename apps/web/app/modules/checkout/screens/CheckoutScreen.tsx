"use client";

import { useState } from "react";
import { Container, Heading, Card, Text, Skeleton } from "@react-shop/design-system";
import {
  useCart,
  useCreateAddress,
  useCreateOrder,
  type Address,
  type Order,
} from "@react-shop/sdk";
import { AddressForm, OrderReview, OrderConfirmation, type AddressFormData } from "../components";

type CheckoutStep = "address" | "review" | "confirmation";

const STEPS: { key: CheckoutStep; label: string; index: number }[] = [
  { key: "address", label: "Address", index: 1 },
  { key: "review", label: "Review", index: 2 },
  { key: "confirmation", label: "Confirmation", index: 3 },
];

function StepIndicator({ current }: { current: CheckoutStep }) {
  const currentIndex = STEPS.find((s) => s.key === current)?.index ?? 1;

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.key} className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                currentIndex > step.index
                  ? "bg-success-600 text-white"
                  : currentIndex === step.index
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentIndex > step.index ? "✓" : step.index}
            </div>
            <Text size="xs" className="mt-1 hidden sm:block">
              {step.label}
            </Text>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-12 h-0.5 ${
                currentIndex > step.index ? "bg-success-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function CheckoutScreen() {
  const { data: cart, isLoading: cartLoading } = useCart();
  const { mutate: createAddress, isPending: creatingAddress } = useCreateAddress();
  const { mutate: createOrder, isPending: creatingOrder } = useCreateOrder();

  const [step, setStep] = useState<CheckoutStep>("address");
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleAddressSubmit = (data: AddressFormData) => {
    createAddress(
      { ...data, isDefault: false },
      {
        onSuccess: (address) => {
          setShippingAddress(address);
          setStep("review");
        },
      }
    );
  };

  const handlePlaceOrder = () => {
    if (!shippingAddress) return;

    createOrder(
      {
        shippingAddressId: shippingAddress.id,
        billingAddressId: shippingAddress.id,
      },
      {
        onSuccess: (order) => {
          setConfirmedOrder(order);
          setStep("confirmation");
        },
      }
    );
  };

  if (cartLoading) {
    return (
      <Container className="py-10 max-w-2xl mx-auto">
        <Skeleton variant="text" className="h-8 w-1/3 mb-6 mx-auto" />
        <Skeleton variant="rectangular" className="h-64 rounded-xl" />
      </Container>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container className="py-10 max-w-2xl mx-auto text-center">
        <Card padding="lg">
          <Heading as="h2" size="xl" className="mb-2">
            Your cart is empty
          </Heading>
          <Text color="secondary">Add items to your cart before checking out.</Text>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-10 max-w-2xl mx-auto">
      <Heading as="h1" size="3xl" className="text-center mb-6">
        Checkout
      </Heading>

      <StepIndicator current={step} />

      <Card padding="lg">
        {step === "address" && (
          <AddressForm
            title="Shipping Address"
            onSubmit={handleAddressSubmit}
            isLoading={creatingAddress}
            submitLabel="Continue to Review"
          />
        )}

        {step === "review" && shippingAddress && (
          <OrderReview
            cart={cart}
            shippingAddress={shippingAddress}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => setStep("address")}
            isLoading={creatingOrder}
          />
        )}

        {step === "confirmation" && confirmedOrder && (
          <OrderConfirmation order={confirmedOrder} />
        )}
      </Card>
    </Container>
  );
}
