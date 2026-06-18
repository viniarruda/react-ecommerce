"use client";

import { useState } from "react";
import { Heading, Button, Text } from "@react-shop/design-system";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  type Category,
} from "@react-shop/sdk";
import { AdminTable } from "../components";

function CategoryModal({
  category,
  onClose,
}: {
  category?: Category;
  onClose: () => void;
}) {
  const { mutate: create, isPending: creating } = useCreateCategory();
  const { mutate: update, isPending: updating } = useUpdateCategory();
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");

  const isPending = creating || updating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      update({ id: category.id, data: { name, description } }, { onSuccess: onClose });
    } else {
      create({ name, description }, { onSuccess: onClose });
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <Heading as="h3" size="lg">{category ? "Edit Category" : "New Category"}</Heading>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Name *</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="solid" size="sm" disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminCategoriesScreen() {
  const { data: categories, isLoading } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();
  const [modal, setModal] = useState<"new" | Category | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Heading as="h1" size="2xl">Categories</Heading>
        <Button variant="solid" size="sm" onClick={() => setModal("new")}>
          + New Category
        </Button>
      </div>

      {isLoading ? (
        <Text color="secondary">Loading…</Text>
      ) : (
        <AdminTable
          keyField="id"
          data={categories ?? []}
          emptyText="No categories yet."
          columns={[
            {
              key: "name",
              header: "Name",
              render: (c) => <span className="font-medium">{c.name}</span>,
            },
            {
              key: "description",
              header: "Description",
              render: (c) => (
                <span className="text-gray-500">{c.description ?? "—"}</span>
              ),
            },
            {
              key: "created",
              header: "Created",
              width: "130px",
              render: (c) => new Date(c.createdAt).toLocaleDateString(),
            },
            {
              key: "actions",
              header: "",
              width: "100px",
              render: (c) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal(c)}
                    className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${c.name}"?`)) deleteCategory(c.id);
                    }}
                    className="text-xs text-error-600 hover:text-error-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      {modal && (
        <CategoryModal
          category={modal === "new" ? undefined : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
