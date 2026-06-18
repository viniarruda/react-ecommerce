"use client";

import { useState } from "react";
import {
  Card,
  Heading,
  Text,
  Button,
  Stack,
  Rating,
  Skeleton,
} from "@react-shop/design-system";
import { useProductReviews, useCreateReview, ReviewStatus } from "@react-shop/sdk";

interface ReviewListProps {
  productId: string;
  isAuthenticated: boolean;
}

export function ReviewList({ productId, isAuthenticated }: ReviewListProps) {
  const { data: reviews, isLoading } = useProductReviews(productId);
  const { mutate: createReview, isPending } = useCreateReview();

  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const approved = reviews?.filter((r) => r.status === ReviewStatus.APPROVED) ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview(
      { productId, rating, title: title || undefined, comment: comment || undefined },
      {
        onSuccess: () => {
          setShowForm(false);
          setRating(5);
          setTitle("");
          setComment("");
        },
      }
    );
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <Heading as="h3" size="xl">
          Customer Reviews ({approved.length})
        </Heading>
        {isAuthenticated && !showForm && (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-6" padding="md">
          <form onSubmit={handleSubmit}>
            <Stack className="gap-4">
              <div>
                <Text size="sm" weight="medium" className="mb-1 block">Rating</Text>
                <Rating value={rating} readonly={false} onChange={setRating} />
              </div>
              <div>
                <Text size="sm" weight="medium" className="mb-1 block">Title (optional)</Text>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summarize your review"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <Text size="sm" weight="medium" className="mb-1 block">Comment (optional)</Text>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Share your experience..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" variant="solid" size="sm" disabled={isPending}>
                  {isPending ? "Submitting..." : "Submit Review"}
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </Stack>
          </form>
        </Card>
      )}

      {isLoading && (
        <Stack className="gap-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md">
              <Skeleton variant="text" className="w-1/3 mb-2" />
              <Skeleton variant="text" className="w-full mb-1" />
              <Skeleton variant="text" className="w-4/5" />
            </Card>
          ))}
        </Stack>
      )}

      {!isLoading && approved.length === 0 && (
        <Card variant="outline" padding="md">
          <Text color="secondary">No reviews yet. Be the first to review this product!</Text>
        </Card>
      )}

      {!isLoading && approved.length > 0 && (
        <Stack className="gap-3">
          {approved.map((review) => (
            <Card key={review.id} padding="md">
              <div className="flex items-start justify-between mb-2">
                <div>
                  {review.title && (
                    <Text weight="medium" className="block mb-1">{review.title}</Text>
                  )}
                  <Rating value={review.rating} size="sm" />
                </div>
                <Text size="sm" color="secondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </div>
              {review.comment && (
                <Text size="sm" color="secondary" className="mt-2">
                  {review.comment}
                </Text>
              )}
            </Card>
          ))}
        </Stack>
      )}
    </div>
  );
}
