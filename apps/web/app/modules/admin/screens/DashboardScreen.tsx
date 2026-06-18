"use client";

import { Heading, Text } from "@react-shop/design-system";
import {
  useProducts,
  useCategories,
  useAllOrders,
  useAllUsers,
  useAllReviews,
  ReviewStatus,
  OrderStatus,
} from "@react-shop/sdk";
import { StatCard } from "../components";
import { formatPrice } from "@/lib/format";

function fmt(n: number) {
  return formatPrice(n);
}

export function DashboardScreen() {
  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const { data: orders } = useAllOrders();
  const { data: users } = useAllUsers();
  const { data: reviews } = useAllReviews(ReviewStatus.PENDING);

  const revenue =
    orders
      ?.filter((o) => o.status !== OrderStatus.CANCELLED)
      .reduce((sum, o) => sum + o.total, 0) ?? 0;

  return (
    <div>
      <Heading as="h1" size="2xl" className="mb-6">
        Dashboard
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total Revenue"
          value={fmt(revenue)}
          sub={`${orders?.filter((o) => o.status !== OrderStatus.CANCELLED).length ?? 0} completed orders`}
          colorClass="text-success-700"
        />
        <StatCard
          label="Total Orders"
          value={orders?.length ?? "—"}
          sub={`${orders?.filter((o) => o.status === OrderStatus.PENDING).length ?? 0} pending`}
          colorClass="text-primary-700"
        />
        <StatCard
          label="Products"
          value={products?.length ?? "—"}
          sub={`${products?.filter((p) => p.isFeatured).length ?? 0} featured`}
          colorClass="text-primary-700"
        />
        <StatCard
          label="Categories"
          value={categories?.length ?? "—"}
          colorClass="text-primary-700"
        />
        <StatCard
          label="Pending Reviews"
          value={reviews?.length ?? "—"}
          sub="Awaiting moderation"
          colorClass="text-warning-700"
        />
        <StatCard
          label="Registered Users"
          value={users?.length ?? "—"}
          colorClass="text-primary-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <Text weight="semibold" className="mb-3 block">
            Recent Orders
          </Text>
          <div className="space-y-2">
            {orders?.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center text-sm py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <span className="font-medium">{order.orderNumber}</span>
                <span className="text-gray-500">{fmt(order.total)}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    order.status === "PENDING"
                      ? "bg-warning-100 text-warning-700"
                      : order.status === "DELIVERED"
                      ? "bg-success-100 text-success-700"
                      : order.status === "CANCELLED"
                      ? "bg-error-100 text-error-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
            {!orders?.length && (
              <Text size="sm" color="secondary">
                No orders yet.
              </Text>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <Text weight="semibold" className="mb-3 block">
            Pending Reviews
          </Text>
          <div className="space-y-2">
            {reviews?.slice(0, 5).map((review) => (
              <div
                key={review.id}
                className="text-sm py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <span className="font-medium">{review.product?.title ?? "Product"}</span>
                <span className="text-gray-400 ml-2">{"★".repeat(review.rating)}</span>
                {review.comment && (
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{review.comment}</p>
                )}
              </div>
            ))}
            {!reviews?.length && (
              <Text size="sm" color="secondary">
                No pending reviews.
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
