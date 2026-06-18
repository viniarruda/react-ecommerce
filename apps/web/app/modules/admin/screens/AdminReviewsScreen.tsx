"use client";

import { useState } from "react";
import { Heading, Text, Button, Rating } from "@react-shop/design-system";
import { useAllReviews, useModerateReview, ReviewStatus } from "@react-shop/sdk";
import { AdminTable } from "../components";

const FILTER_TABS: { label: string; value?: ReviewStatus }[] = [
  { label: "All" },
  { label: "Pending", value: ReviewStatus.PENDING },
  { label: "Approved", value: ReviewStatus.APPROVED },
  { label: "Rejected", value: ReviewStatus.REJECTED },
];

const STATUS_STYLE: Record<ReviewStatus, string> = {
  [ReviewStatus.PENDING]: "bg-warning-100 text-warning-700",
  [ReviewStatus.APPROVED]: "bg-success-100 text-success-700",
  [ReviewStatus.REJECTED]: "bg-error-100 text-error-700",
};

export function AdminReviewsScreen() {
  const [activeFilter, setActiveFilter] = useState<ReviewStatus | undefined>(ReviewStatus.PENDING);
  const { data: reviews, isLoading } = useAllReviews(activeFilter);
  const { mutate: moderate } = useModerateReview();

  const approve = (id: string) =>
    moderate({ id, data: { status: ReviewStatus.APPROVED } });
  const reject = (id: string) =>
    moderate({ id, data: { status: ReviewStatus.REJECTED } });

  return (
    <div>
      <Heading as="h1" size="2xl" className="mb-4">Reviews</Heading>

      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeFilter === tab.value
                ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <Text color="secondary">Loading…</Text>
      ) : (
        <AdminTable
          keyField="id"
          data={reviews ?? []}
          emptyText="No reviews found."
          columns={[
            {
              key: "product",
              header: "Product",
              render: (r) => (
                <span className="font-medium">{(r as any).product?.title ?? "—"}</span>
              ),
            },
            {
              key: "rating",
              header: "Rating",
              width: "100px",
              render: (r) => <Rating value={r.rating} size="sm" />,
            },
            {
              key: "content",
              header: "Review",
              render: (r) => (
                <div>
                  {r.title && <p className="font-medium text-xs">{r.title}</p>}
                  {r.comment && (
                    <p className="text-xs text-gray-500 line-clamp-2">{r.comment}</p>
                  )}
                </div>
              ),
            },
            {
              key: "status",
              header: "Status",
              width: "100px",
              render: (r) => (
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLE[r.status]}`}>
                  {r.status}
                </span>
              ),
            },
            {
              key: "date",
              header: "Date",
              width: "100px",
              render: (r) => new Date(r.createdAt).toLocaleDateString(),
            },
            {
              key: "actions",
              header: "",
              width: "130px",
              render: (r) => (
                <div className="flex gap-1.5">
                  {r.status !== ReviewStatus.APPROVED && (
                    <Button
                      variant="solid"
                      size="sm"
                      onClick={() => approve(r.id)}
                    >
                      Approve
                    </Button>
                  )}
                  {r.status !== ReviewStatus.REJECTED && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => reject(r.id)}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
