"use client";

import { useState } from "react";
import type { ProductImage } from "@react-shop/sdk";

interface ImageGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages =
    images.length > 0
      ? images
      : [{ id: "placeholder", url: "/placeholder-product.jpg", altText: title, position: 0, productId: "", createdAt: new Date() }];

  const active = displayImages[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
        <img
          src={active.url}
          alt={active.altText ?? title}
          className="w-full h-full object-cover"
        />
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                idx === activeIndex ? "border-primary-600" : "border-transparent"
              }`}
            >
              <img
                src={img.url}
                alt={img.altText ?? `${title} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
