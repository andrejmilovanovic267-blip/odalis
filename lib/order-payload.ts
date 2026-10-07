import type { CartItem } from "@/components/cart/cart-context";

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
    unitPrice: number;
    quantity: number;
    lineTotal: number;
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
    items: items.map(({ product, quantity }) => ({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      unitPrice: product.price,
      quantity,
      lineTotal: product.price * quantity,
    })),
    pricing: {
      subtotal,
      shipping,
      total: subtotal + shipping,
    },
  };
}
