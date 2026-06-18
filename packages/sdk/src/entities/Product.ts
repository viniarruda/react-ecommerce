export interface Product {
  id: string;
  title: string;
  description: string | null;
  brand: string | null;
  price: number;
  comparePrice: number | null;
  costPrice: number | null;
  quantity: number;
  sku: string | null;
  barcode: string | null;
  weight: number | null;
  dimension: string | null;
  inventory: number;
  lowStockThreshold: number | null;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  images?: ProductImage[];
  variants?: ProductVariant[];
  categories?: Category[];
  tags?: Tag[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string | null;
  position: number;
  createdAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string | null;
  price: number;
  comparePrice: number | null;
  costPrice: number | null;
  quantity: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  title: string;
  description?: string;
  brand?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  quantity: number;
  sku?: string;
  barcode?: string;
  weight?: number;
  dimension?: string;
  inventory?: number;
  lowStockThreshold?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  images?: Array<{ url: string; alt?: string; sortOrder?: number; isPrimary?: boolean }>;
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  brand?: string;
  price?: number;
  comparePrice?: number;
  costPrice?: number;
  quantity?: number;
  sku?: string;
  barcode?: string;
  weight?: number;
  dimension?: string;
  inventory?: number;
  lowStockThreshold?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}

// Import Category and Tag types from their respective files
import type { Category } from './Category';

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

