"use client";

import Link from "next/link";
import { Heading, Text, Button, Card, PriceDisplay, Divider } from "@react-shop/design-system";
import { useOrder, useUpdateOrderStatus, useCancelOrder, OrderStatus } from "@react-shop/sdk";

const STATUS_OPTIONS = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
];

const STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.PROCESSING]: "Processing",
  [OrderStatus.SHIPPED]: "Shipped",
  [OrderStatus.DELIVERED]: "Delivered",
  [OrderStatus.CANCELLED]: "Cancelled",
};

interface Props { orderId: string }

export function AdminOrderDetailScreen({ orderId }: Props) {
  const { data: order, isLoading } = useOrder(orderId);
  const { mutate: updateStatus, isPending: updating } = useUpdateOrderStatus();
  const { mutate: cancelOrder, isPending: cancelling } = useCancelOrder();

  if (isLoading) return <Text color="secondary">Loading…</Text>;
  if (!order) return <Text color="error">Order not found.</Text>;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <div>
      <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
        ← Orders
      </Link>

      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <Heading as="h1" size="2xl">{order.orderNumber}</Heading>
          <Text size="sm" color="secondary">
            Placed {new Date(order.createdAt).toLocaleDateString("en-US", { dateStyle: "long" })}
          </Text>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {order.status !== OrderStatus.CANCELLED && (
            <>
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus({ id: order.id, data: { status: e.target.value as OrderStatus } })
                }
                disabled={updating}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                ))}
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm("Cancel this order?")) cancelOrder(order.id);
                }}
                disabled={cancelling}
              >
                Cancel Order
              </Button>
            </>
          )}
          {order.status === OrderStatus.CANCELLED && (
            <span className="px-3 py-1.5 bg-error-100 text-error-700 text-sm font-medium rounded-md">
              Cancelled
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card padding="md">
            <Heading as="h3" size="md" className="mb-3">Items</Heading>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <Text size="sm" weight="medium">{item.product?.title ?? "Product"}</Text>
                    {item.variant && <Text size="xs" color="secondary">{item.variant.name}</Text>}
                    <Text size="xs" color="secondary">Qty: {item.quantity}</Text>
                  </div>
                  <PriceDisplay price={item.price * item.quantity} size="sm" />
                </div>
              ))}
            </div>
            <Divider className="my-3" />
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <Text color="secondary">Subtotal</Text>
                <PriceDisplay price={order.subtotal} size="sm" />
              </div>
              <div className="flex justify-between text-sm">
                <Text color="secondary">Tax</Text>
                <PriceDisplay price={order.tax} size="sm" />
              </div>
              <div className="flex justify-between text-sm">
                <Text color="secondary">Shipping</Text>
                <PriceDisplay price={order.shippingCost} size="sm" />
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-success-600">
                  <span>Discount</span>
                  <span>-{fmt(order.discountAmount)}</span>
                </div>
              )}
              <Divider />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <PriceDisplay price={order.total} size="md" />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {order.shippingAddress && (
            <Card padding="md">
              <Heading as="h3" size="md" className="mb-2">Shipping Address</Heading>
              <Text size="sm" color="secondary">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                {order.shippingAddress.street1}<br />
                {order.shippingAddress.street2 && <>{order.shippingAddress.street2}<br /></>}
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </Text>
            </Card>
          )}
          <Card padding="md">
            <Heading as="h3" size="md" className="mb-2">Order Status</Heading>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  order.status === "DELIVERED" ? "bg-success-100 text-success-700" :
                  order.status === "CANCELLED" ? "bg-error-100 text-error-700" :
                  order.status === "PENDING" ? "bg-warning-100 text-warning-700" :
                  "bg-primary-100 text-primary-700"
                }`}
              >
                {STATUS_LABEL[order.status]}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
