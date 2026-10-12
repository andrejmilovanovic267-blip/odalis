import { NextRequest, NextResponse } from "next/server";
import {
  isMatchingEbookTokenHash,
  isValidEbookDownloadToken,
} from "@/lib/ebook-download";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function notFound() {
  return NextResponse.json(
    { error: "Link za preuzimanje nije važeći." },
    { status: 404, headers: privateHeaders },
  );
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return notFound();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return notFound();
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("token" in body) ||
    typeof body.token !== "string" ||
    body.token.length > 100
  ) {
    return notFound();
  }

  const token = body.token;
  if (!isValidEbookDownloadToken(token)) return notFound();
  const orderId = token.slice(0, token.indexOf("."));

  const supabase = getSupabaseAdmin();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      "payment_method,payment_status,order_status,ebook_eligible,ebook_download_token_hash",
    )
    .eq("id", orderId)
    .maybeSingle();

  if (orderError) {
    console.error(JSON.stringify({ event: "ebook.download_order_lookup_failed" }));
    return NextResponse.json(
      { error: "Preuzimanje trenutno nije dostupno." },
      { status: 503, headers: { ...privateHeaders, "Retry-After": "60" } },
    );
  }

  const eligible =
    order &&
    order.order_status !== "cancelled" &&
    ((order.payment_method === "cod" &&
      (order.payment_status === "pending" || order.payment_status === "paid")) ||
      (order.payment_method === "card" && order.payment_status === "paid"));
  if (
    !eligible ||
    order.ebook_eligible !== true ||
    typeof order.ebook_download_token_hash !== "string" ||
    !isMatchingEbookTokenHash(token, order.ebook_download_token_hash)
  ) {
    return notFound();
  }

  const { data: pdf, error: storageError } = await supabase.storage
    .from("ebooks")
    .download("bore-pod-kontrolom.pdf");

  if (storageError || !pdf) {
    console.error(JSON.stringify({ event: "ebook.download_storage_fetch_failed" }));
    return NextResponse.json(
      { error: "Preuzimanje trenutno nije dostupno." },
      { status: 503, headers: { ...privateHeaders, "Retry-After": "60" } },
    );
  }

  return new NextResponse(pdf, {
    status: 200,
    headers: {
      ...privateHeaders,
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="bore-pod-kontrolom.pdf"',
    },
  });
}
