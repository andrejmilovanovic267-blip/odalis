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
  getPackageOption,
  getProductBySlug,
  productCategories,
  type ProductListingItem,
} from "@/lib/product-catalog";

const CART_STORAGE_KEY = "odalis-cart";

interface StoredCartItem {
  categorySlug: string;
  productSlug: string;
  quantity: number;
  packageOptionId?: string;
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

    const product =
      getProductBySlug(item.categorySlug, item.productSlug)?.product;
    const isAvailable = product?.availableForPurchase !== false;
    const storedPackageOptionId =
      "packageOptionId" in item && typeof item.packageOptionId === "string"
        ? item.packageOptionId
        : undefined;
    const packageOption = product
      ? getPackageOption(product, storedPackageOptionId) ??
        getPackageOption(product)
      : undefined;

    return product && isAvailable
      ? [
          {
            categorySlug: item.categorySlug,
            productSlug: item.productSlug,
            quantity: item.quantity,
            ...(packageOption ? { packageOptionId: packageOption.id } : {}),
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
        const packageOption = product
          ? getPackageOption(product, storedItem.packageOptionId)
          : undefined;

        return product && product.availableForPurchase !== false
          ? [{ ...storedItem, packageOption, product }]
          : [];
      }),
    [storedItems],
  );

  const addItem = useCallback(
    (
      product: ProductListingItem,
      quantity: number,
      requestedPackageOptionId?: string,
    ) => {
      if (product.availableForPurchase === false) return;

      const packageOption =
        getPackageOption(product, requestedPackageOptionId) ??
        getPackageOption(product);
      const packageOptionId = packageOption?.id;

      setStoredItems((current) => {
        const existingIndex = current.findIndex(
          (item) =>
            item.categorySlug === product.category &&
            item.productSlug === product.slug &&
            item.packageOptionId === packageOptionId,
        );

        if (existingIndex === -1) {
          return [
            ...current,
            {
              categorySlug: product.category,
              productSlug: product.slug,
              quantity: Math.max(1, quantity),
              ...(packageOptionId ? { packageOptionId } : {}),
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
    },
    [],
  );

  const getSelectedPackageOptionId = useCallback(
    (
      categorySlug: string,
      productSlug: string,
      requestedPackageOptionId?: string,
    ) => {
      const product = getProductBySlug(categorySlug, productSlug)?.product;
      if (!product) return undefined;
      const packageOption =
        getPackageOption(product, requestedPackageOptionId) ??
        getPackageOption(product);
      return packageOption?.id;
    },
    [],
  );

  const removeItem = useCallback(
    (
      categorySlug: string,
      productSlug: string,
      requestedPackageOptionId?: string,
    ) => {
      const packageOptionId = getSelectedPackageOptionId(
        categorySlug,
        productSlug,
        requestedPackageOptionId,
      );
      setStoredItems((current) =>
        current.filter(
          (item) =>
            item.categorySlug !== categorySlug ||
            item.productSlug !== productSlug ||
            item.packageOptionId !== packageOptionId,
        ),
      );
    },
    [getSelectedPackageOptionId],
  );

  const changeQuantity = useCallback(
    (
      categorySlug: string,
      productSlug: string,
      amount: number,
      requestedPackageOptionId?: string,
    ) => {
      const packageOptionId = getSelectedPackageOptionId(
        categorySlug,
        productSlug,
        requestedPackageOptionId,
      );
      setStoredItems((current) =>
        current.map((item) =>
          item.categorySlug === categorySlug &&
          item.productSlug === productSlug &&
          item.packageOptionId === packageOptionId
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item,
        ),
      );
    },
    [getSelectedPackageOptionId],
  );

  const increaseQuantity = useCallback(
    (categorySlug: string, productSlug: string, packageOptionId?: string) =>
      changeQuantity(categorySlug, productSlug, 1, packageOptionId),
    [changeQuantity],
  );

  const decreaseQuantity = useCallback(
    (categorySlug: string, productSlug: string, packageOptionId?: string) =>
      changeQuantity(categorySlug, productSlug, -1, packageOptionId),
    [changeQuantity],
  );
  const clearPurchasedItems = useCallback(
    (
      purchasedItems: Array<{
        productId: string;
        variantId: string | null;
        quantity: number;
      }>,
    ) => {
      setStoredItems((current) => {
        const remaining = [...current];
        for (const purchasedItem of purchasedItems) {
          let quantityToRemove = purchasedItem.quantity;
          for (let index = 0; index < remaining.length && quantityToRemove > 0;) {
            const item = remaining[index];
            const product = getProductBySlug(
              item.categorySlug,
              item.productSlug,
            )?.product;
            if (
              product?.id !== purchasedItem.productId ||
              (item.packageOptionId ?? null) !== purchasedItem.variantId
            ) {
              index += 1;
              continue;
            }

            if (item.quantity <= quantityToRemove) {
              quantityToRemove -= item.quantity;
              remaining.splice(index, 1);
            } else {
              remaining[index] = {
                ...item,
                quantity: item.quantity - quantityToRemove,
              };
              quantityToRemove = 0;
            }
          }
        }
        return remaining;
      });
    },
    [],
  );
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) =>
          total +
          (item.packageOption?.price ?? item.product.price) * item.quantity,
        0,
      ),
      isHydrated,
      isCartOpen,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearPurchasedItems,
      openCart,
      closeCart,
    }),
    [
      addItem,
      closeCart,
      clearPurchasedItems,
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
