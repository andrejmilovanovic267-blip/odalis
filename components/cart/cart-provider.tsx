"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartContext } from "@/components/cart/cart-context";
import type { CartContextValue, CartItem } from "@/components/cart/cart-context";
import {
  productCategories,
  type ProductListingItem,
} from "@/lib/product-catalog";

const CART_STORAGE_KEY = "odalis-cart";

interface StoredCartItem {
  categorySlug: string;
  productSlug: string;
  quantity: number;
}

function resolveStoredItems(value: unknown): StoredCartItem[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item): StoredCartItem[] => {
    if (
      typeof item !== "object" ||
      item === null ||
      !("categorySlug" in item) ||
      !("productSlug" in item) ||
      !("quantity" in item) ||
      typeof item.categorySlug !== "string" ||
      typeof item.productSlug !== "string" ||
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      return [];
    }

    const exists = productCategories.some(
      (category) =>
        category.slug === item.categorySlug &&
        category.products.some((product) => product.slug === item.productSlug),
    );

    return exists
      ? [
          {
            categorySlug: item.categorySlug,
            productSlug: item.productSlug,
            quantity: item.quantity,
          },
        ]
      : [];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) setStoredItems(resolveStoredItems(JSON.parse(savedCart)));
    } catch (error) {
      console.error("Unable to restore the Odalis cart from localStorage.", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedItems));
    } catch (error) {
      console.error("Unable to save the Odalis cart to localStorage.", error);
    }
  }, [isHydrated, storedItems]);

  const items = useMemo(
    () =>
      storedItems.flatMap((storedItem): CartItem[] => {
        const category = productCategories.find(
          (candidate) => candidate.slug === storedItem.categorySlug,
        );
        const product = category?.products.find(
          (candidate) => candidate.slug === storedItem.productSlug,
        );

        return product ? [{ ...storedItem, product }] : [];
      }),
    [storedItems],
  );

  const addItem = useCallback((product: ProductListingItem, quantity: number) => {
    setStoredItems((current) => {
      const existingIndex = current.findIndex(
        (item) =>
          item.categorySlug === product.category &&
          item.productSlug === product.slug,
      );

      if (existingIndex === -1) {
        return [
          ...current,
          {
            categorySlug: product.category,
            productSlug: product.slug,
            quantity: Math.max(1, quantity),
          },
        ];
      }

      return current.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
          : item,
      );
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback(
    (categorySlug: string, productSlug: string) => {
      setStoredItems((current) =>
        current.filter(
          (item) =>
            item.categorySlug !== categorySlug ||
            item.productSlug !== productSlug,
        ),
      );
    },
    [],
  );

  const changeQuantity = useCallback(
    (categorySlug: string, productSlug: string, amount: number) => {
      setStoredItems((current) =>
        current.map((item) =>
          item.categorySlug === categorySlug && item.productSlug === productSlug
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item,
        ),
      );
    },
    [],
  );

  const increaseQuantity = useCallback(
    (categorySlug: string, productSlug: string) =>
      changeQuantity(categorySlug, productSlug, 1),
    [changeQuantity],
  );

  const decreaseQuantity = useCallback(
    (categorySlug: string, productSlug: string) =>
      changeQuantity(categorySlug, productSlug, -1),
    [changeQuantity],
  );
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
      isHydrated,
      isCartOpen,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      openCart,
      closeCart,
    }),
    [
      addItem,
      closeCart,
      decreaseQuantity,
      increaseQuantity,
      isHydrated,
      isCartOpen,
      items,
      openCart,
      removeItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}
