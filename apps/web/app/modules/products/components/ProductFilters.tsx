"use client";

import { Select } from "@react-shop/design-system";
import type { Category } from "@react-shop/sdk";

export type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  sortBy: SortOption;
  searchQuery: string;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onSearchChange: (value: string) => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  sortBy,
  searchQuery,
  onCategoryChange,
  onSortChange,
  onSearchChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />

      <div className="w-full sm:w-48">
        <Select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="w-full sm:w-44">
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sort products"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name A–Z</option>
        </Select>
      </div>
    </div>
  );
}
