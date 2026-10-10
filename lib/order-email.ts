import "server-only";

import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type RecipientType = "customer" | "owner";

type ClaimedNotification = {
  notification_id: string;
  order_id: string;
  recipient_type: RecipientType;
  recipient_email: string;
  attempt_count: number;
  claim_token: string;
};

type EmailOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  customer_note: string | null;
  payment_method: "cod" | "card";
  payment_status: "pending" | "paid" | "failed";
  subtotal_rsd: number;
  shipping_rsd: number;
  total_rsd: number;
  created_at: string;
};

type EmailOrderItem = {
  product_name: string;
  variant_name: string | null;
  quantity: number;
  unit_price_rsd: number;
  line_total_rsd: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isClaimedNotification(value: unknown): value is ClaimedNotification {
  return (
    isRecord(value) &&
    typeof value.notification_id === "string" &&
    typeof value.order_id === "string" &&
    (value.recipient_type === "customer" || value.recipient_type === "owner") &&
    typeof value.recipient_email === "string" &&
    typeof value.attempt_count === "number" &&
    typeof value.claim_token === "string"
  );
}

function isEmailOrder(value: unknown): value is EmailOrder {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.order_number === "string" &&
    typeof value.customer_name === "string" &&
    typeof value.customer_email === "string" &&
    typeof value.customer_phone === "string" &&
    typeof value.shipping_address === "string" &&
    typeof value.shipping_city === "string" &&
    typeof value.shipping_postal_code === "string" &&
    typeof value.shipping_country === "string" &&
    (typeof value.customer_note === "string" || value.customer_note === null) &&
    (value.payment_method === "cod" || value.payment_method === "card") &&
    (value.payment_status === "pending" ||
      value.payment_status === "paid" ||
      value.payment_status === "failed") &&
    typeof value.subtotal_rsd === "number" &&
    typeof value.shipping_rsd === "number" &&
    typeof value.total_rsd === "number" &&
    typeof value.created_at === "string"
  );
}

function isEmailOrderItem(value: unknown): value is EmailOrderItem {
  return (
    isRecord(value) &&
    typeof value.product_name === "string" &&
    (typeof value.variant_name === "string" || value.variant_name === null) &&
    typeof value.quantity === "number" &&
    typeof value.unit_price_rsd === "number" &&
    typeof value.line_total_rsd === "number"
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function formatRsd(amount: number) {
  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "RSD",
    maximumFractionDigits: 0,
  }).format(amount).replace(/\u00a0/g, " ");
}

function paymentLabel(order: EmailOrder) {
  return order.payment_method === "cod"
    ? "Plaćanje pouzećem — plaćanje prilikom preuzimanja"
    : order.payment_status === "paid"
      ? "Plaćanje karticom — plaćeno"
      : "Plaćanje karticom — na čekanju";
}

function createItemsHtml(items: EmailOrderItem[]) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="width:42%;padding:14px 10px;border-bottom:1px solid #e8e2d5;color:#172c3f;font-family:Arial,sans-serif;font-size:13px;line-height:1.5;vertical-align:top">
            ${escapeHtml(item.product_name)}${item.variant_name ? `<br><span style="color:#6d7882;font-size:12px">${escapeHtml(item.variant_name)}</span>` : ""}
          </td>
          <td style="width:10%;padding:14px 4px;border-bottom:1px solid #e8e2d5;color:#172c3f;font-family:Arial,sans-serif;font-size:13px;text-align:center;vertical-align:top">${item.quantity}</td>
          <td style="width:23%;padding:14px 4px;border-bottom:1px solid #e8e2d5;color:#53616e;font-family:Arial,sans-serif;font-size:12px;text-align:right;vertical-align:top;white-space:nowrap">${formatRsd(item.unit_price_rsd)}</td>
          <td style="width:25%;padding:14px 10px;border-bottom:1px solid #e8e2d5;color:#172c3f;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;text-align:right;vertical-align:top;white-space:nowrap">${formatRsd(item.line_total_rsd)}</td>
        </tr>`,
    )
    .join("");
}

function createTotalsHtml(order: EmailOrder) {
  const totalLabelStyle =
    "padding:14px 0 0;border-top:1px solid #e8e2d5;color:#0b1f33;font-family:Arial,sans-serif;font-size:17px;font-weight:bold";
  const totalValueStyle = `${totalLabelStyle};color:#9a7426;text-align:right`;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:7px 0;color:#53616e;font-family:Arial,sans-serif;font-size:13px">Međuzbir</td>
        <td style="padding:7px 0;color:#334657;font-family:Arial,sans-serif;font-size:13px;text-align:right">${formatRsd(order.subtotal_rsd)}</td>
      </tr>
      <tr>
        <td style="padding:7px 0;color:#53616e;font-family:Arial,sans-serif;font-size:13px">Dostava</td>
        <td style="padding:7px 0;color:#334657;font-family:Arial,sans-serif;font-size:13px;text-align:right">${order.shipping_rsd === 0 ? "Besplatna" : formatRsd(order.shipping_rsd)}</td>
      </tr>
      <tr>
        <td style="${totalLabelStyle}">Ukupno</td>
        <td style="${totalValueStyle}">${formatRsd(order.total_rsd)}</td>
      </tr>
    </table>`;
}

function createCustomerDetailsHtml(order: EmailOrder) {
  const address = [
    order.shipping_address,
    [order.shipping_postal_code, order.shipping_city].filter(Boolean).join(" "),
    order.shipping_country,
  ]
    .filter(Boolean)
    .map(escapeHtml)
    .join("<br>");
  const rows = [
    ["Ime i prezime", order.customer_name],
    ["Email", order.customer_email],
    ["Telefon", order.customer_phone],
    ["Adresa za dostavu", address],
  ];
  if (order.customer_note?.trim()) {
    rows.push(["Napomena", escapeHtml(order.customer_note)]);
  }
  return rows
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([label, value], index) => `
        <tr>
          <td style="width:36%;padding:10px 12px;${index ? "border-top:1px solid #ece8df;" : ""}color:#71808c;font-family:Arial,sans-serif;font-size:12px;vertical-align:top">${label}</td>
          <td style="padding:10px 12px;${index ? "border-top:1px solid #ece8df;" : ""}color:#24384a;font-family:Arial,sans-serif;font-size:13px;line-height:1.6;word-break:break-word">${value}</td>
        </tr>`,
    )
    .join("");
}

function formatCreatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("sr-Latn-RS", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Belgrade",
  }).format(date);
}

function createEmailHtml(order: EmailOrder, items: EmailOrderItem[], owner: boolean) {
  const createdAt = formatCreatedAt(order.created_at);
  const title = owner ? "Nova porudžbina" : "Vaša porudžbina je potvrđena";
  const intro = owner
    ? "Primljena je nova porudžbina. Pregledajte stavke i podatke za obradu."
    : "Uspešno smo zabeležili vašu porudžbinu. U nastavku su detalji narudžbine i informacije o isporuci.";
  const infoText = owner
    ? "Porudžbina je spremna za pregled i dalju obradu."
    : "Naš tim će uskoro obraditi porudžbinu. Ako ste izabrali plaćanje pouzećem, plaćanje vršite prilikom preuzimanja. Za sva pitanja možete odgovoriti na ovaj email ili posetiti naš sajt.";
  const supportLink =
    '<a href="https://odalis.rs" style="color:#9a7426;text-decoration:underline">odalis.rs</a>';

  return `<!doctype html>
<html lang="sr-Latn">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${escapeHtml(title)} #${escapeHtml(order.order_number)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f2f3f4">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#f2f3f4;border-collapse:collapse">
      <tr>
        <td align="center" style="padding:28px 12px">
          <!--[if mso]>
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td>
          <![endif]-->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e5e1d8;border-radius:12px;border-collapse:separate;border-spacing:0;overflow:hidden">
            <tr>
              <td align="center" style="padding:30px 24px 27px;background-color:#0b1f3a">
                <div style="color:#c9a14a;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:bold;letter-spacing:6px;line-height:1.2">ODALIS</div>
                <div style="padding-top:9px;color:#e8e2d5;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1.8px;line-height:1.5">NEGA PO MERI VAŠE KOŽE</div>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 28px 20px">
                <p style="margin:0 0 9px;color:#a17b2c;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.6px;line-height:1.4;text-transform:uppercase">${owner ? "Obaveštenje za prodavnicu" : "Hvala na poverenju"}</p>
                <h1 style="margin:0;color:#0b1f3a;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:normal;line-height:1.3">${escapeHtml(title)}</h1>
                <p style="margin:12px 0 0;color:#53616e;font-family:Arial,sans-serif;font-size:14px;line-height:1.75">${intro}</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;border:1px solid #e7dfce;border-radius:8px;background-color:#fbfaf7">
                  <tr>
                    <td style="padding:12px 16px;color:#71808c;font-family:Arial,sans-serif;font-size:11px;letter-spacing:.8px;text-transform:uppercase">Broj porudžbine</td>
                    <td style="padding:12px 16px;color:#9a7426;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;letter-spacing:.4px">#${escapeHtml(order.order_number)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            ${
              owner
                ? `<tr><td style="padding:0 28px 22px">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #e8e2d5;border-radius:8px;border-collapse:separate">
                      <tr>
                        <td style="width:50%;padding:14px 16px;border-bottom:1px solid #ece8df;color:#71808c;font-family:Arial,sans-serif;font-size:12px">Status plaćanja</td>
                        <td style="padding:14px 16px;border-bottom:1px solid #ece8df;color:#24384a;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;text-align:right">${escapeHtml(order.payment_status === "paid" ? "Plaćeno" : order.payment_status === "failed" ? "Neuspešno" : "Na čekanju")}</td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px;border-bottom:1px solid #ece8df;color:#71808c;font-family:Arial,sans-serif;font-size:12px">Način plaćanja</td>
                        <td style="padding:14px 16px;border-bottom:1px solid #ece8df;color:#24384a;font-family:Arial,sans-serif;font-size:13px;text-align:right">${escapeHtml(paymentLabel(order))}</td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px;color:#71808c;font-family:Arial,sans-serif;font-size:12px">Ukupan iznos</td>
                        <td style="padding:14px 16px;color:#9a7426;font-family:Arial,sans-serif;font-size:18px;font-weight:bold;text-align:right">${formatRsd(order.total_rsd)}</td>
                      </tr>
                      ${createdAt ? `<tr><td colspan="2" style="padding:0 16px 14px;color:#71808c;font-family:Arial,sans-serif;font-size:12px">Primljeno: ${escapeHtml(createdAt)}</td></tr>` : ""}
                    </table>
                  </td></tr>`
                : ""
            }
            <tr>
              <td style="padding:0 28px 22px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #e8e2d5;border-radius:8px;border-collapse:separate;border-spacing:0">
                  <tr>
                    <td colspan="4" style="padding:17px 16px 13px;color:#0b1f3a;font-family:Arial,sans-serif;font-size:14px;font-weight:bold">Pregled porudžbine</td>
                  </tr>
                  <tr style="background-color:#f7f5f0">
                    <th scope="col" align="left" style="width:42%;padding:11px 10px;color:#71808c;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.6px;text-transform:uppercase">Proizvod</th>
                    <th scope="col" align="center" style="width:10%;padding:11px 4px;color:#71808c;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.4px;text-transform:uppercase">Kol.</th>
                    <th scope="col" align="right" style="width:23%;padding:11px 4px;color:#71808c;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.4px;text-transform:uppercase">Cena</th>
                    <th scope="col" align="right" style="width:25%;padding:11px 10px;color:#71808c;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.4px;text-transform:uppercase">Ukupno</th>
                  </tr>
                  ${createItemsHtml(items)}
                  <tr>
                    <td colspan="4" style="padding:14px 16px 17px">${createTotalsHtml(order)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 22px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #e8e2d5;border-radius:8px;background-color:#ffffff;border-collapse:separate;border-spacing:0">
                  <tr><td colspan="2" style="padding:17px 16px 7px;color:#0b1f3a;font-family:Arial,sans-serif;font-size:14px;font-weight:bold">${owner ? "Podaci kupca i dostave" : "Podaci za porudžbinu"}</td></tr>
                  ${createCustomerDetailsHtml(order)}
                  <tr><td colspan="2" style="padding:5px 16px 15px;color:#53616e;font-family:Arial,sans-serif;font-size:12px;line-height:1.5"><strong style="color:#71808c">Način plaćanja:</strong> ${escapeHtml(paymentLabel(order))}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-left:3px solid #c9a14a;background-color:#fbfaf7">
                  <tr><td style="padding:15px 16px;color:#53616e;font-family:Arial,sans-serif;font-size:13px;line-height:1.7">${infoText}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px 24px;background-color:#0b1f3a">
                <div style="color:#c9a14a;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-weight:bold;letter-spacing:3px">ODALIS</div>
                <div style="padding-top:8px;color:#e8e2d5;font-family:Arial,sans-serif;font-size:12px;line-height:1.6">${supportLink}</div>
                <div style="padding-top:8px;color:#aeb9c2;font-family:Arial,sans-serif;font-size:10px;line-height:1.5">Nega sa pažnjom · © ODALIS</div>
              </td>
            </tr>
          </table>
          <!--[if mso]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function getOrderEmailSettings() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ODALIS_EMAIL_FROM;
  if (!apiKey || !from) throw new Error("Email delivery is not configured.");
  return { apiKey, from };
}

function safeErrorCode(error: unknown) {
  const candidate =
    isRecord(error) && typeof error.code === "string"
        ? error.code
        : isRecord(error) && typeof error.name === "string"
          ? error.name
        : "resend_error";
  return candidate.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || "resend_error";
}

async function recordNotificationFailure(
  notification: ClaimedNotification,
  errorCode: string,
) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("mark_order_email_failed", {
    p_notification_id: notification.notification_id,
    p_claim_token: notification.claim_token,
    p_error_code: errorCode,
  });
  if (error || data !== true) {
    throw new Error("Unable to record email notification failure.");
  }
}

export async function sendOrderEmailNotifications(orderId?: string) {
  let settings: ReturnType<typeof getOrderEmailSettings>;
  try {
    settings = getOrderEmailSettings();
  } catch {
    console.error(
      JSON.stringify({
        event: "order.email_dispatch_deferred",
        orderId,
        reason: "email_configuration_missing",
      }),
    );
    return;
  }

  const supabase = getSupabaseAdmin();
  const { data: claimsData, error: claimError } = await supabase.rpc(
    "claim_order_email_notifications",
    { p_order_id: orderId ?? null, p_limit: 50 },
  );
  if (claimError) {
    throw new Error("Unable to claim order email notifications.");
  }

  if (!Array.isArray(claimsData)) {
    throw new Error("Email notification claim returned an invalid result.");
  }
  const claims = claimsData.filter(isClaimedNotification);
  if (claims.length !== claimsData.length) {
    throw new Error("Email notification claim returned invalid notification data.");
  }
  const resend = new Resend(settings.apiKey);

  for (const notification of claims) {
    try {
      const [{ data: orderData, error: orderError }, { data: itemsData, error: itemsError }] =
        await Promise.all([
          supabase
            .from("orders")
            .select(
              "id,order_number,customer_name,customer_email,customer_phone,shipping_address,shipping_city,shipping_postal_code,shipping_country,customer_note,payment_method,payment_status,subtotal_rsd,shipping_rsd,total_rsd,created_at",
            )
            .eq("id", notification.order_id)
            .maybeSingle(),
          supabase
            .from("order_items")
            .select("product_name,variant_name,quantity,unit_price_rsd,line_total_rsd")
            .eq("order_id", notification.order_id)
            .order("id"),
        ]);
      if (orderError || itemsError || !isEmailOrder(orderData)) {
        throw new Error("order_data_unavailable");
      }
      const items = Array.isArray(itemsData)
        ? itemsData.filter(isEmailOrderItem)
        : [];
      if (items.length === 0) throw new Error("order_items_unavailable");

      const owner = notification.recipient_type === "owner";
      const subject = owner
        ? `Nova ODALIS porudžbina #${orderData.order_number}`
        : `ODALIS | Potvrda porudžbine #${orderData.order_number}`;
      const { data, error } = await resend.emails.send(
        {
          from: settings.from,
          to: notification.recipient_email,
          subject,
          html: createEmailHtml(orderData, items, owner),
        },
        { idempotencyKey: notification.notification_id },
      );

      if (error || !data?.id) {
        const errorCode = safeErrorCode(error ?? new Error("resend_no_id"));
        await recordNotificationFailure(notification, errorCode);
        console.error(
          JSON.stringify({
            event: "order.email_delivery_failed",
            orderId: notification.order_id,
            notificationId: notification.notification_id,
            recipientType: notification.recipient_type,
            errorCode,
          }),
        );
        continue;
      }

      const { data: sent, error: sentError } = await supabase.rpc(
        "mark_order_email_sent",
        {
          p_notification_id: notification.notification_id,
          p_claim_token: notification.claim_token,
          p_resend_email_id: data.id,
        },
      );
      if (sentError || sent !== true) {
        throw new Error("Unable to persist Resend acceptance.");
      }
      console.info(
        JSON.stringify({
          event: "order.email_sent",
          orderId: notification.order_id,
          notificationId: notification.notification_id,
          recipientType: notification.recipient_type,
        }),
      );
    } catch (error) {
      const errorCode = safeErrorCode(error);
      await recordNotificationFailure(notification, errorCode);
      console.error(
        JSON.stringify({
          event: "order.email_delivery_failed",
          orderId: notification.order_id,
          notificationId: notification.notification_id,
          recipientType: notification.recipient_type,
          errorCode,
        }),
      );
    }
  }
}

export async function retryFailedOrderEmailNotifications(orderNumber: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("retry_failed_order_emails", {
    p_order_number: orderNumber,
  });
  if (error || typeof data !== "number") {
    throw new Error("Unable to requeue failed order email notifications.");
  }

  const { data: order, error: lookupError } = await supabase
    .from("orders")
    .select("id")
    .eq("order_number", orderNumber)
    .maybeSingle();
  if (lookupError || !order || typeof order.id !== "string") {
    throw new Error("Unable to find order for email retry.");
  }
  await sendOrderEmailNotifications(order.id);
  return data;
}
