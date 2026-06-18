"use client";

import { useState } from "react";
import { Heading, Button, Text, Badge } from "@react-shop/design-system";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  type Product,
  type CreateProductInput,
} from "@react-shop/sdk";
import { AdminTable } from "../components";
import { formatPrice } from "@/lib/format";

interface ImageEntry { url: string; alt: string }

type FormData = Omit<CreateProductInput, "quantity" | "images"> & { quantity: number };

function ProductModal({ product, onClose }: { product?: Product; onClose: () => void }) {
  const { mutate: create, isPending: creating } = useCreateProduct();
  const { mutate: update, isPending: updating } = useUpdateProduct();

  const [form, setForm] = useState<Partial<FormData>>({
    title: product?.title ?? "",
    description: product?.description ?? "",
    brand: product?.brand ?? "",
    price: product?.price ?? 0,
    comparePrice: product?.comparePrice ?? undefined,
    quantity: product?.quantity ?? 0,
    inventory: product?.inventory ?? 0,
    sku: product?.sku ?? "",
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
  });

  const [images, setImages] = useState<ImageEntry[]>(
    product?.images?.map((img) => ({ url: img.url, alt: img.altText ?? "" })) ?? []
  );
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");

  const isPending = creating || updating;

  const addImage = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, { url: newImageUrl.trim(), alt: newImageAlt.trim() }]);
    setNewImageUrl("");
    setNewImageAlt("");
  };

  const removeImage = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const moveImage = (idx: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: CreateProductInput = {
      title: form.title!,
      description: form.description,
      brand: form.brand,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
      quantity: Number(form.quantity ?? 0),
      inventory: Number(form.inventory ?? 0),
      sku: form.sku,
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      images: images.map((img, i) => ({
        url: img.url,
        alt: img.alt || undefined,
        sortOrder: i,
        isPrimary: i === 0,
      })),
    };
    if (product) {
      update({ id: product.id, data: input }, { onSuccess: onClose });
    } else {
      create(input, { onSuccess: onClose });
    }
  };

  const inputClass = "w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white";

  const field = (label: string, key: keyof FormData, type = "text") => (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        value={String(form[key] ?? "")}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className={inputClass}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <Heading as="h3" size="lg">{product ? "Edit Product" : "New Product"}</Heading>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* ── Basic info ── */}
          <div className="space-y-3">
            <Text size="xs" weight="semibold" className="uppercase tracking-wider text-gray-500">Basic Info</Text>
            {field("Title *", "title")}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
              <textarea
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {field("Brand", "brand")}
              {field("SKU", "sku")}
            </div>
          </div>

          {/* ── Pricing ── */}
          <div className="space-y-3">
            <Text size="xs" weight="semibold" className="uppercase tracking-wider text-gray-500">Pricing</Text>
            <div className="grid grid-cols-2 gap-3">
              {field("Price *", "price", "number")}
              {field("Compare Price", "comparePrice", "number")}
            </div>
          </div>

          {/* ── Inventory ── */}
          <div className="space-y-3">
            <Text size="xs" weight="semibold" className="uppercase tracking-wider text-gray-500">Inventory</Text>
            <div className="grid grid-cols-2 gap-3">
              {field("Stock Quantity", "quantity", "number")}
              {field("Inventory", "inventory", "number")}
            </div>
          </div>

          {/* ── Images ── */}
          <div className="space-y-3">
            <Text size="xs" weight="semibold" className="uppercase tracking-wider text-gray-500">
              Images — first image is the featured/cover image
            </Text>

            {/* Existing images */}
            {images.length > 0 && (
              <div className="space-y-2">
                {images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-12 h-12 object-cover rounded-md flex-shrink-0 bg-gray-200"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-product.jpg"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate text-gray-600 dark:text-gray-300">{img.url}</p>
                      {idx === 0 && (
                        <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-wide">Featured</span>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button type="button" onClick={() => moveImage(idx, -1)} disabled={idx === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs">↑</button>
                      <button type="button" onClick={() => moveImage(idx, 1)} disabled={idx === images.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs">↓</button>
                      <button type="button" onClick={() => removeImage(idx)} className="p-1 text-red-400 hover:text-red-600 text-xs ml-1">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add image row */}
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Image URL (https://...)"
                className={`${inputClass} flex-1`}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImage(); } }}
              />
              <input
                type="text"
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
                placeholder="Alt text"
                className={`${inputClass} w-32`}
              />
              <Button type="button" variant="outline" size="sm" onClick={addImage}>
                Add
              </Button>
            </div>
            <p className="text-xs text-gray-400">Press Enter or click Add to append an image. Drag ↑↓ to reorder.</p>
          </div>

          {/* ── Flags ── */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive ?? true}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                className="rounded"
              />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured ?? false}
                onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                className="rounded"
              />
              Featured
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="solid" size="sm" disabled={isPending}>
              {isPending ? "Saving…" : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminProductsScreen() {
  const { data: products, isLoading } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();
  const [modal, setModal] = useState<"new" | Product | null>(null);

  const fmt = (n: number) => formatPrice(n);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Heading as="h1" size="2xl">Products</Heading>
        <Button variant="solid" size="sm" onClick={() => setModal("new")}>+ New Product</Button>
      </div>

      {isLoading ? (
        <Text color="secondary">Loading…</Text>
      ) : (
        <AdminTable
          keyField="id"
          data={products ?? []}
          emptyText="No products yet."
          columns={[
            {
              key: "image",
              header: "",
              width: "56px",
              render: (p) => (
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={p.images?.[0]?.url ?? "/placeholder-product.jpg"}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-product.jpg"; }}
                  />
                </div>
              ),
            },
            {
              key: "title",
              header: "Title",
              render: (p) => (
                <div>
                  <span className="font-medium block">{p.title}</span>
                  <span className="text-xs text-gray-400">{p.images?.length ?? 0} image{(p.images?.length ?? 0) !== 1 ? "s" : ""}</span>
                </div>
              ),
            },
            {
              key: "price",
              header: "Price",
              render: (p) => fmt(p.price),
              width: "110px",
            },
            {
              key: "inventory",
              header: "Stock",
              render: (p) => (
                <span className={p.inventory === 0 ? "text-red-500 font-medium" : p.inventory <= 5 ? "text-warning-600 font-medium" : ""}>
                  {p.inventory}
                </span>
              ),
              width: "70px",
            },
            {
              key: "status",
              header: "Status",
              width: "120px",
              render: (p) => (
                <div className="flex gap-1 flex-wrap">
                  {p.isActive ? (
                    <Badge variant="subtle" colorScheme="success">Active</Badge>
                  ) : (
                    <Badge variant="subtle" colorScheme="error">Inactive</Badge>
                  )}
                  {p.isFeatured && <Badge variant="subtle">Featured</Badge>}
                </div>
              ),
            },
            {
              key: "actions",
              header: "",
              width: "100px",
              render: (p) => (
                <div className="flex gap-2">
                  <button onClick={() => setModal(p)} className="text-xs text-primary-600 hover:text-primary-800 font-medium">Edit</button>
                  <button
                    onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteProduct(p.id); }}
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
        <ProductModal
          product={modal === "new" ? undefined : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
