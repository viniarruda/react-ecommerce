"use client";

import { Heading, Text } from "@react-shop/design-system";
import { useAllUsers, UserRole } from "@react-shop/sdk";
import { AdminTable } from "../components";

export function AdminUsersScreen() {
  const { data: users, isLoading } = useAllUsers();

  return (
    <div>
      <Heading as="h1" size="2xl" className="mb-6">Users</Heading>

      {isLoading ? (
        <Text color="secondary">Loading…</Text>
      ) : (
        <AdminTable
          keyField="id"
          data={users ?? []}
          emptyText="No users found."
          columns={[
            {
              key: "name",
              header: "Name",
              render: (u) => (
                <span className="font-medium">
                  {[u.firstName, u.lastName].filter(Boolean).join(" ") || "—"}
                </span>
              ),
            },
            {
              key: "email",
              header: "Email",
              render: (u) => u.email,
            },
            {
              key: "role",
              header: "Role",
              width: "100px",
              render: (u) => (
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    u.role === UserRole.ADMIN
                      ? "bg-primary-100 text-primary-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {u.role}
                </span>
              ),
            },
            {
              key: "verified",
              header: "Verified",
              width: "90px",
              render: (u) => (
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    u.emailVerified
                      ? "bg-success-100 text-success-700"
                      : "bg-warning-100 text-warning-700"
                  }`}
                >
                  {u.emailVerified ? "Yes" : "Pending"}
                </span>
              ),
            },
            {
              key: "joined",
              header: "Joined",
              width: "110px",
              render: (u) => new Date(u.createdAt).toLocaleDateString(),
            },
          ]}
        />
      )}
    </div>
  );
}
