"use client";

import { createContext, useContext } from "react";
import type { ProductListingItem } from "@/lib/product-catalog";

export interface CartItem {
  categorySlug: string;
  productSlug: string;
  quantity: number;
  product: ProductListingItem;
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isHydrated: boolean;
  isCartOpen: boolean;
  addItem: (product: ProductListingItem, quantity: number) => void;
  removeItem: (categorySlug: string, productSlug: string) => void;
  increaseQuantity: (categorySlug: string, productSlug: string) => void;
  decreaseQuantity: (categorySlug: string, productSlug: string) => void;
  openCart: () => void;
  closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within a CartProvider.");
  return value;
}
