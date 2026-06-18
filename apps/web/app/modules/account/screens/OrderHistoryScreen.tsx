"use client";

import Link from "next/link";
import {
  Container,
  Heading,
  Text,
  Card,
  Stack,
  Skeleton,
} from "@react-shop/design-system";
import { useOrders } from "@react-shop/sdk";
import { OrderCard } from "../components";

export function OrderHistoryScreen() {
  const { data: orders, isLoading, error } = useOrders();

  return (
    <Container className="py-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="text-gray-500 hover:text-gray-700 text-sm">
          ← Account
        </Link>
        <Text color="secondary">/</Text>
        <Heading as="h1" size="3xl">
          Order History
        </Heading>
      </div>

      {error && (
        <Card variant="outline" padding="md">
          <Text color="error">Failed to load orders. Please try again.</Text>
        </Card>
      )}

      {isLoading && (
        <Stack className="gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" className="h-24 rounded-xl" />
          ))}
        </Stack>
      )}

      {!isLoading && (!orders || orders.length === 0) && (
        <Card variant="outline" padding="lg" className="text-center">
          <Text size="lg" className="mb-2">
            No orders yet
          </Text>
          <Text color="secondary" className="mb-4">
            Your completed orders will appear here.
          </Text>
          <Link href="/products">
            <Text className="text-primary-600 hover:text-primary-700 font-medium">
              Start Shopping →
            </Text>
          </Link>
        </Card>
      )}

      {!isLoading && orders && orders.length > 0 && (
        <Stack className="gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Stack>
      )}
    </Container>
  );
}
