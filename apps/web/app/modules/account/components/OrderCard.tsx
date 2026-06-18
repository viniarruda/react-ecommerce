"use client";

import { Card, Text, Badge, PriceDisplay } from "@react-shop/design-system";
import { type Order, OrderStatus } from "@react-shop/sdk";
import { formatDate } from "@/lib/format";

const STATUS_COLOR: Record<OrderStatus, "primary" | "success" | "warning" | "error" | undefined> = {
  [OrderStatus.PENDING]: "warning",
  [OrderStatus.PROCESSING]: "warning",
  [OrderStatus.SHIPPED]: "primary",
  [OrderStatus.DELIVERED]: "success",
  [OrderStatus.CANCELLED]: "error",
};

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card padding="md" className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <Text weight="medium">{order.orderNumber}</Text>
          <Text size="sm" color="secondary">
            {formatDate(order.createdAt, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge
            variant="subtle"
            colorScheme={STATUS_COLOR[order.status]}
          >
            {order.status}
          </Badge>
          <PriceDisplay price={order.total} size="sm" />
        </div>
      </div>

      <div className="space-y-1">
        {order.items.slice(0, 3).map((item) => (
          <Text key={item.id} size="sm" color="secondary">
            {item.product?.title ?? "Product"} × {item.quantity}
          </Text>
        ))}
        {order.items.length > 3 && (
          <Text size="sm" color="secondary">
            + {order.items.length - 3} more item(s)
          </Text>
        )}
      </div>
    </Card>
  );
}
