"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface GuestCartItem {
  productId: string;
  variantId: string | null;
  quantity: number;
  title: string;
  price: number;
  image: string;
  variantName?: string;
}

interface GuestCartContextValue {
  items: GuestCartItem[];
  addItem: (item: Omit<GuestCartItem, "quantity"> & { quantity?: number }) => void;
  updateItem: (productId: string, variantId: string | null, quantity: number) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
}

const GuestCartContext = createContext<GuestCartContextValue>({
  items: [],
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  clear: () => {},
  itemCount: 0,
  subtotal: 0,
});

const STORAGE_KEY = "guest_cart";

function load(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(items: GuestCartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function GuestCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<GuestCartItem[]>([]);

  useEffect(() => {
    setItems(load());
  }, []);

  const persist = (next: GuestCartItem[]) => {
    setItems(next);
    save(next);
  };

  const addItem = (incoming: Omit<GuestCartItem, "quantity"> & { quantity?: number }) => {
    const qty = incoming.quantity ?? 1;
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === incoming.productId && i.variantId === incoming.variantId
      );
      let next: GuestCartItem[];
      if (idx >= 0) {
        next = prev.map((i, index) =>
          index === idx ? { ...i, quantity: i.quantity + qty } : i
        );
      } else {
        next = [...prev, { ...incoming, quantity: qty }];
      }
      save(next);
      return next;
    });
  };

  const updateItem = (productId: string, variantId: string | null, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) => {
      const next = prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
      );
      save(next);
      return next;
    });
  };

  const removeItem = (productId: string, variantId: string | null) => {
    setItems((prev) => {
      const next = prev.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      );
      save(next);
      return next;
    });
  };

  const clear = () => persist([]);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const Provider = GuestCartContext.Provider as React.ComponentType<{
    value: GuestCartContextValue;
    children: React.ReactNode;
  }>;

  return (
    <Provider value={{ items, addItem, updateItem, removeItem, clear, itemCount, subtotal }}>
      {children}
    </Provider>
  );
}

export function useGuestCart() {
  return useContext(GuestCartContext);
}
