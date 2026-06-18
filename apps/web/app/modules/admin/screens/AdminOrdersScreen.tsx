"use client";

import Link from "next/link";
import { Heading, Text, Badge } from "@react-shop/design-system";
import { useAllOrders, useUpdateOrderStatus, OrderStatus } from "@react-shop/sdk";
import { AdminTable } from "../components";
import { formatPrice, formatDate } from "@/lib/format";

const STATUS_OPTIONS: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

const STATUS_COLOR: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "bg-warning-100 text-warning-700",
  [OrderStatus.PROCESSING]: "bg-primary-100 text-primary-700",
  [OrderStatus.SHIPPED]: "bg-gray-100 text-gray-700",
  [OrderStatus.DELIVERED]: "bg-success-100 text-success-700",
  [OrderStatus.CANCELLED]: "bg-error-100 text-error-700",
};

const fmt = (n: number) => formatPrice(n);

export function AdminOrdersScreen() {
  const { data: orders, isLoading } = useAllOrders();
  const { mutate: updateStatus } = useUpdateOrderStatus();

  return (
    <div>
      <Heading as="h1" size="2xl" className="mb-6">Orders</Heading>

      {isLoading ? (
        <Text color="secondary">Loading…</Text>
      ) : (
        <AdminTable
          keyField="id"
          data={orders ?? []}
          emptyText="No orders yet."
          columns={[
            {
              key: "orderNumber",
              header: "Order #",
              width: "140px",
              render: (o) => (
                <Link
                  href={`/admin/orders/${o.id}`}
                  className="font-mono text-xs font-medium text-primary-600 hover:text-primary-800"
                >
                  {o.orderNumber}
                </Link>
              ),
            },
            {
              key: "date",
              header: "Date",
              width: "120px",
              render: (o) => formatDate(o.createdAt),
            },
            {
              key: "items",
              header: "Items",
              width: "60px",
              render: (o) => o.items.length,
            },
            {
              key: "total",
              header: "Total",
              width: "100px",
              render: (o) => fmt(o.total),
            },
            {
              key: "status",
              header: "Status",
              width: "160px",
              render: (o) => (
                <select
                  value={o.status}
                  onChange={(e) =>
                    updateStatus({ id: o.id, data: { status: e.target.value as OrderStatus } })
                  }
                  className={`text-xs font-medium px-2 py-1 rounded border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 ${STATUS_COLOR[o.status]}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ),
            },
            {
              key: "actions",
              header: "",
              width: "60px",
              render: (o) => (
                <Link
                  href={`/admin/orders/${o.id}`}
                  className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                >
                  View
                </Link>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
