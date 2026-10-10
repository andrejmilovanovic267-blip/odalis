import "server-only";

import Stripe from "stripe";

let stripeClient: Stripe | undefined;

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey?.startsWith("sk_test_")) {
    throw new Error("A Stripe test secret key is required.");
  }

  stripeClient ??= new Stripe(secretKey);
  return stripeClient;
}

export function getAppOrigin() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) throw new Error("NEXT_PUBLIC_APP_URL is not configured.");

  const parsed = new URL(appUrl);
  const isLocalHttp =
    parsed.protocol === "http:" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
  if (parsed.protocol !== "https:" && !isLocalHttp) {
    throw new Error("NEXT_PUBLIC_APP_URL must use HTTPS except on localhost.");
  }

  return parsed.origin;
}
