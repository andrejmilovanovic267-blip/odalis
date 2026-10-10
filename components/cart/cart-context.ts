"use client";

import { createContext, useContext } from "react";
import type {
  ProductListingItem,
  ProductPackageOption,
} from "@/lib/product-catalog";

export interface CartItem {
  categorySlug: string;
  productSlug: string;
  quantity: number;
  packageOptionId?: string;
  packageOption?: ProductPackageOption;
  product: ProductListingItem;
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isHydrated: boolean;
  isCartOpen: boolean;
  addItem: (
    product: ProductListingItem,
    quantity: number,
    packageOptionId?: string,
  ) => void;
  removeItem: (
    categorySlug: string,
    productSlug: string,
    packageOptionId?: string,
  ) => void;
  increaseQuantity: (
    categorySlug: string,
    productSlug: string,
    packageOptionId?: string,
  ) => void;
  decreaseQuantity: (
    categorySlug: string,
    productSlug: string,
    packageOptionId?: string,
  ) => void;
  clearPurchasedItems: (
    items: Array<{
      productId: string;
      variantId: string | null;
      quantity: number;
    }>,
  ) => void;
  openCart: () => void;
  closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within a CartProvider.");
  return value;
}
