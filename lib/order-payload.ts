import type { CartItem } from "@/components/cart/cart-context";
import { getPackageOption, getProductBySlug } from "@/lib/product-catalog";

export interface CheckoutFormValues {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  courierNote: string;
}

export interface PreparedOrderPayload {
  customer: {
    fullName: string;
    phone: string;
    email: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: "Serbia";
    courierNote?: string;
  };
  paymentMethod: "cash_on_delivery";
  items: Array<{
    productId: string;
    productSlug: string;
    productName: string;
    packageOptionId?: string;
    packageLabel?: string;
    maskCountPerPackage?: number;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
    includedProducts?: Array<{
      productId: string;
      productSlug: string;
      productName: string;
      quantityPerSet: number;
      packageOptionId?: string;
      packageLabel?: string;
      packageCountPerSet?: number;
    }>;
  }>;
  pricing: {
    subtotal: number;
    shipping: number;
    total: number;
  };
}

export function createOrderPayload(
  values: CheckoutFormValues,
  items: CartItem[],
  subtotal: number,
  shipping: number,
): PreparedOrderPayload {
  if (items.some(({ product }) => product.availableForPurchase === false)) {
    throw new Error("Unavailable products cannot be added to an order.");
  }

  return {
    customer: {
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
    },
    shippingAddress: {
      street: values.street.trim(),
      city: values.city.trim(),
      postalCode: values.postalCode.trim(),
      country: "Serbia",
      ...(values.courierNote.trim()
        ? { courierNote: values.courierNote.trim() }
        : {}),
    },
    paymentMethod: "cash_on_delivery",
    items: items.map(({ product, quantity, packageOption }) => {
      const unitPrice = packageOption?.price ?? product.price;
      const includedProducts = product.includedProducts?.map((includedItem) => {
        const includedProduct = getProductBySlug(
          includedItem.categorySlug,
          includedItem.productSlug,
        )?.product;
        if (!includedProduct) {
          throw new Error(
            `Set product ${product.slug} references missing product ${includedItem.productSlug}.`,
          );
        }
        const includedPackageOption = includedItem.packageOptionId
          ? getPackageOption(includedProduct, includedItem.packageOptionId)
          : undefined;
        if (includedItem.packageOptionId && !includedPackageOption) {
          throw new Error(
            `Set product ${product.slug} references missing package option ${includedItem.packageOptionId} for ${includedProduct.slug}.`,
          );
        }

        return {
          productId: includedProduct.id,
          productSlug: includedProduct.slug,
          productName: includedProduct.name,
          quantityPerSet: includedItem.quantity,
          ...(includedPackageOption
            ? {
                packageOptionId: includedPackageOption.id,
                packageLabel: includedPackageOption.label,
                packageCountPerSet: includedPackageOption.count,
              }
            : {}),
        };
      });
      return {
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        ...(packageOption
          ? {
              packageOptionId: packageOption.id,
              packageLabel: packageOption.label,
              maskCountPerPackage: packageOption.count,
            }
          : {}),
        unitPrice,
        quantity,
        lineTotal: unitPrice * quantity,
        ...(includedProducts?.length ? { includedProducts } : {}),
      };
    }),
    pricing: {
      subtotal,
      shipping,
      total: subtotal + shipping,
    },
  };
}
