"use client";

import { Text } from "@react-shop/design-system";
import type { ProductVariant } from "@react-shop/sdk";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variantId: string | null) => void;
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length === 0) return null;

  return (
    <div>
      <Text size="sm" weight="medium" className="mb-2 block">
        Variant
      </Text>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
            selectedVariantId === null
              ? "border-primary-600 bg-primary-50 text-primary-700"
              : "border-gray-300 hover:border-gray-400 text-gray-700"
          }`}
        >
          Default
        </button>
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
              selectedVariantId === variant.id
                ? "border-primary-600 bg-primary-50 text-primary-700"
                : "border-gray-300 hover:border-gray-400 text-gray-700"
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  );
}
