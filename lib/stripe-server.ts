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

export function isAllowedAppOrigin(requestOrigin: string, appOrigin: string) {
  let requestUrl: URL;
  let configuredUrl: URL;
  try {
    requestUrl = new URL(requestOrigin);
    configuredUrl = new URL(appOrigin);
  } catch {
    return false;
  }

  if (requestUrl.origin !== requestOrigin) return false;
  if (requestUrl.origin === configuredUrl.origin) return true;

  const odalisOrigins = ["https://odalis.rs", "https://www.odalis.rs"];
  return (
    configuredUrl.protocol === "https:" &&
    odalisOrigins.includes(configuredUrl.origin) &&
    odalisOrigins.includes(requestUrl.origin)
  );
}
