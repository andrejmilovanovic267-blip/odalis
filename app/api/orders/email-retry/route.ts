import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { retryFailedOrderEmailNotifications } from "@/lib/order-email";

export const runtime = "nodejs";

function hasValidAuthorization(request: NextRequest) {
  const configuredSecret = process.env.ODALIS_EMAIL_RETRY_SECRET;
  const authorization = request.headers.get("authorization");
  if (!configuredSecret || configuredSecret.length < 32 || !authorization) {
    return false;
  }

  const expected = Buffer.from(`Bearer ${configuredSecret}`);
  const received = Buffer.from(authorization);
  return (
    expected.length === received.length &&
    timingSafeEqual(expected, received)
  );
}

export async function POST(request: NextRequest) {
  if (!hasValidAuthorization(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (
    typeof body !== "object" ||
    body === null ||
    !("orderNumber" in body) ||
    typeof body.orderNumber !== "string" ||
    !/^OD-\d{8}-[A-F0-9]{8}$/.test(body.orderNumber)
  ) {
    return NextResponse.json({ error: "Invalid order number." }, { status: 400 });
  }

  try {
    const retriedCount = await retryFailedOrderEmailNotifications(body.orderNumber);
    return NextResponse.json({ retryQueued: retriedCount });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "order.email_retry_failed",
        errorType: error instanceof Error ? error.name : "unknown",
      }),
    );
    return NextResponse.json(
      { error: "Email notifications could not be retried." },
      { status: 503 },
    );
  }
}
