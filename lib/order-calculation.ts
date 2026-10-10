import "server-only";

import {
  getPackageOption,
  getProductBySlug,
  type ProductListingItem,
  type ProductPackageOption,
} from "@/lib/product-catalog";
import { calculateShipping } from "@/lib/shipping";

export type CheckoutOrderItemInput = {
  categorySlug: string;
  productSlug: string;
  quantity: number;
  packageOptionId?: string;
};

export type CheckoutCustomer = {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  courierNote: string;
};

export type TrustedOrderLine = {
  categorySlug: string;
  product: ProductListingItem;
  quantity: number;
  packageOption?: ProductPackageOption;
  unitPrice: number;
  lineTotal: number;
};

export type TrustedOrder = {
  items: TrustedOrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidString(value: unknown, maxLength: number): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLength
  );
}

export function parseCheckoutItems(value: unknown): CheckoutOrderItemInput[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 50) {
    return null;
  }

  const items: CheckoutOrderItemInput[] = [];
  for (const item of value) {
    if (
      !isRecord(item) ||
      !isValidString(item.categorySlug, 100) ||
      !isValidString(item.productSlug, 150) ||
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 99 ||
      (item.packageOptionId !== undefined &&
        !isValidString(item.packageOptionId, 100))
    ) {
      return null;
    }

    items.push({
      categorySlug: item.categorySlug.trim(),
      productSlug: item.productSlug.trim(),
      quantity: item.quantity,
      ...(typeof item.packageOptionId === "string"
        ? { packageOptionId: item.packageOptionId.trim() }
        : {}),
    });
  }

  return items;
}

export function parseCheckoutCustomer(value: unknown): CheckoutCustomer | null {
  if (!isRecord(value)) return null;
  const fields = [
    ["fullName", 200],
    ["phone", 50],
    ["email", 200],
    ["street", 200],
    ["city", 100],
    ["postalCode", 40],
  ] as const;

  for (const [field, maxLength] of fields) {
    const fieldValue = value[field];
    if (typeof fieldValue !== "string" || fieldValue.length > maxLength) {
      return null;
    }
  }

  const courierNote = value.courierNote;
  if (
    courierNote !== undefined &&
    (typeof courierNote !== "string" || courierNote.length > 500)
  ) {
    return null;
  }

  if (
    !isValidString(value.fullName, 200) ||
    !isValidString(value.phone, 50) ||
    !isValidString(value.email, 200) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) ||
    !isValidString(value.street, 200) ||
    !isValidString(value.city, 100) ||
    !isValidString(value.postalCode, 40)
  ) {
    return null;
  }

  return {
    fullName: value.fullName.trim(),
    phone: value.phone.trim(),
    email: value.email.trim(),
    street: value.street.trim(),
    city: value.city.trim(),
    postalCode: value.postalCode.trim(),
    courierNote: typeof courierNote === "string" ? courierNote.trim() : "",
  };
}

export function isValidIdempotencyKey(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

export function calculateTrustedOrder(
  items: CheckoutOrderItemInput[],
): TrustedOrder | null {
  const trustedItems: TrustedOrderLine[] = [];
  let subtotal = 0;
  let hasFreeShippingEligibleProduct = false;

  for (const item of items) {
    const result = getProductBySlug(item.categorySlug, item.productSlug);
    if (!result || result.product.availableForPurchase === false) return null;

    const { product } = result;
    const hasVariants = Boolean(product.packageOptions?.length);
    const packageOption = hasVariants
      ? getPackageOption(product, item.packageOptionId)
      : undefined;
    if (
      (hasVariants && (!item.packageOptionId || !packageOption)) ||
      (!hasVariants && item.packageOptionId)
    ) {
      return null;
    }

    const unitPrice = packageOption?.price ?? product.price;
    const lineTotal = unitPrice * item.quantity;
    if (
      !Number.isSafeInteger(unitPrice) ||
      unitPrice < 0 ||
      !Number.isSafeInteger(lineTotal)
    ) {
      return null;
    }

    subtotal += lineTotal;
    if (!Number.isSafeInteger(subtotal)) return null;
    hasFreeShippingEligibleProduct ||= product.freeShippingEligible === true;
    trustedItems.push({
      categorySlug: result.category.slug,
      product,
      quantity: item.quantity,
      ...(packageOption ? { packageOption } : {}),
      unitPrice,
      lineTotal,
    });
  }

  const shipping = calculateShipping(subtotal, hasFreeShippingEligibleProduct);
  const total = subtotal + shipping.cost;
  if (!Number.isSafeInteger(total)) return null;

  return {
    items: trustedItems,
    subtotal,
    shipping: shipping.cost,
    total,
  };
}
