import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmailNotifications } from "@/lib/order-email";

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

  try {
    await sendOrderEmailNotifications();
    return NextResponse.json({ processed: true });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "order.email_outbox_processing_failed",
        errorType: error instanceof Error ? error.name : "unknown",
      }),
    );
    return NextResponse.json(
      { error: "Email notifications could not be processed." },
      { status: 503 },
    );
  }
}
