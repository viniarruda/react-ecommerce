"use client";

import {
  Container,
  Heading,
  Text,
  Button,
  Card,
  Stack,
  Flex,
  Avatar,
} from "@react-shop/design-system";
import { useMe } from "@react-shop/sdk";
import Link from "next/link";
import { formatDate } from "@/lib/format";

export function ProfileScreen() {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
      <Container className="py-10 max-w-2xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </Container>
    );
  }

  if (!user) return null;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "—";

  return (
    <Container className="py-10 max-w-2xl mx-auto">
      <Heading as="h1" size="3xl" className="mb-8">
        My Profile
      </Heading>

      <Card padding="lg" className="mb-6">
        <Flex className="gap-4 items-center mb-6">
          <Avatar size="lg" name={fullName} src={user.avatar ?? undefined} />
          <div>
            <Heading as="h2" size="xl">
              {fullName}
            </Heading>
            <Text color="secondary">{user.email}</Text>
            <Text size="sm" color="secondary" className="capitalize">
              {user.role.toLowerCase()}
            </Text>
          </div>
        </Flex>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Text size="sm" color="secondary">First Name</Text>
            <Text weight="medium">{user.firstName ?? "—"}</Text>
          </div>
          <div>
            <Text size="sm" color="secondary">Last Name</Text>
            <Text weight="medium">{user.lastName ?? "—"}</Text>
          </div>
          <div>
            <Text size="sm" color="secondary">Email</Text>
            <Text weight="medium">{user.email}</Text>
          </div>
          <div>
            <Text size="sm" color="secondary">Phone</Text>
            <Text weight="medium">{user.phone ?? "—"}</Text>
          </div>
          <div>
            <Text size="sm" color="secondary">Member Since</Text>
            <Text weight="medium">
              {formatDate(user.createdAt, {
                month: "long",
                year: "numeric",
              })}
            </Text>
          </div>
          <div>
            <Text size="sm" color="secondary">Email Verified</Text>
            <Text weight="medium" className={user.emailVerified ? "text-success-600" : "text-warning-600"}>
              {user.emailVerified ? "Verified" : "Pending"}
            </Text>
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <Heading as="h3" size="lg" className="mb-4">
          Quick Links
        </Heading>
        <Stack className="gap-3">
          <Link href="/account/orders">
            <Button variant="outline" fullWidth>
              View Order History
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="ghost" fullWidth>
              Continue Shopping
            </Button>
          </Link>
        </Stack>
      </Card>
    </Container>
  );
}
