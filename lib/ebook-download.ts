import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const ebookUrl = "https://www.odalis.rs/ebook";
const orderIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const tokenPattern =
  /^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\.([A-Za-z0-9_-]{43})$/i;

function getTokenSecret() {
  const secret = process.env.ODALIS_EBOOK_TOKEN_SECRET;
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("ODALIS_EBOOK_TOKEN_SECRET must be at least 32 bytes.");
  }
  return secret;
}

function createTokenMac(orderId: string) {
  return createHmac("sha256", getTokenSecret())
    .update("odalis-ebook-download:v1\0")
    .update(orderId.toLowerCase())
    .digest();
}

export function createEbookDownloadToken(orderId: string) {
  if (!orderIdPattern.test(orderId)) {
    throw new Error("Invalid order ID for eBook download token.");
  }
  return `${orderId.toLowerCase()}.${createTokenMac(orderId).toString("base64url")}`;
}

export function isValidEbookDownloadToken(token: string) {
  const match = tokenPattern.exec(token);
  if (!match) return false;

  const [, orderId, encodedMac] = match;
  const suppliedMac = Buffer.from(encodedMac, "base64url");
  const expectedMac = createTokenMac(orderId);
  return (
    suppliedMac.length === expectedMac.length &&
    timingSafeEqual(suppliedMac, expectedMac)
  );
}

export function hashEbookDownloadToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function isMatchingEbookTokenHash(token: string, storedHash: string) {
  if (!/^[0-9a-f]{64}$/.test(storedHash)) return false;
  const tokenHash = Buffer.from(hashEbookDownloadToken(token), "hex");
  const persistedHash = Buffer.from(storedHash, "hex");
  return timingSafeEqual(tokenHash, persistedHash);
}

export function getEbookDownloadUrl(token: string) {
  return `${ebookUrl}#token=${encodeURIComponent(token)}`;
}

export async function ensureEbookDownloadTokenHash(orderId: string) {
  const token = createEbookDownloadToken(orderId);
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc(
    "ensure_order_ebook_download_token_hash",
    {
      p_order_id: orderId,
      p_token_hash: hashEbookDownloadToken(token),
    },
  );

  if (error) {
    throw new Error("Unable to persist eBook download token hash.");
  }
  if (data !== true) {
    throw new Error("Order is not eligible for eBook delivery.");
  }
  return token;
}
