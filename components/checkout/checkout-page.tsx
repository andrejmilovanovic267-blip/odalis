"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Banknote, ChevronLeft, CreditCard, Truck } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/format-price";
import { calculateShipping } from "@/lib/shipping";
import {
  createOrderPayload,
  type CheckoutFormValues,
  type PreparedOrderPayload,
} from "@/lib/order-payload";

type CheckoutField = keyof CheckoutFormValues;
type CheckoutErrors = Partial<Record<CheckoutField, string>>;

const fieldMessages: Record<CheckoutField, string> = {
  fullName: "Unesite ime i prezime.",
  phone: "Unesite broj telefona.",
  email: "Unesite ispravnu email adresu.",
  street: "Unesite adresu za dostavu.",
  city: "Unesite grad ili mesto.",
  postalCode: "Unesite poštanski broj.",
  courierNote: "",
};

const initialValues: CheckoutFormValues = {
  fullName: "",
  phone: "",
  email: "",
  street: "",
  city: "",
  postalCode: "",
  courierNote: "",
};

export function CheckoutPage() {
  const { items, subtotal, isHydrated, openCart } = useCart();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitMessage, setSubmitMessage] = useState("");
  const preparedPayloadRef = useRef<PreparedOrderPayload | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const shipping = calculateShipping(subtotal);

  const updateField = (field: CheckoutField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitMessage("");
    preparedPayloadRef.current = null;
  };

  const validate = () => {
    const nextErrors: CheckoutErrors = {};
    if (!values.fullName.trim()) nextErrors.fullName = fieldMessages.fullName;
    if (!values.phone.trim()) nextErrors.phone = fieldMessages.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = fieldMessages.email;
    }
    if (!values.street.trim()) nextErrors.street = fieldMessages.street;
    if (!values.city.trim()) nextErrors.city = fieldMessages.city;
    if (!values.postalCode.trim()) {
      nextErrors.postalCode = fieldMessages.postalCode;
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");

    if (items.length === 0) {
      setSubmitMessage("Korpa je prazna. Dodajte proizvode pre poručivanja.");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as CheckoutField[])[0];
    if (firstInvalid) {
      const input = formRef.current?.querySelector<HTMLInputElement>(
        `[name="${firstInvalid}"]`,
      );
      input?.focus();
      input?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const payload = createOrderPayload(values, items, subtotal, shipping.cost);
    preparedPayloadRef.current = payload;
    setSubmitMessage(
      "Podaci su provereni, ali slanje porudžbine još nije dostupno. Vaša porudžbina nije poslata.",
    );
  };

  if (!isHydrated) {
    return (
      <main className="relative z-10 min-h-[calc(100vh-5rem)] px-4 pb-16 pt-28 md:min-h-[calc(100vh-6rem)] md:pt-36">
        <div className="container mx-auto max-w-4xl text-center text-sm text-text-muted">
          Učitavanje korpe...
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="relative z-10 min-h-[calc(100vh-5rem)] px-4 pb-16 pt-28 md:min-h-[calc(100vh-6rem)] md:pt-36">
        <div className="container mx-auto max-w-xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[#C9A24D]">
            SIGURNO PORUČIVANJE
          </p>
          <h1 className="font-heading text-3xl font-semibold text-text-primary">
            Vaša korpa je prazna
          </h1>
          <p className="mt-3 text-text-secondary">
            Dodajte proizvode u korpu da biste nastavili.
          </p>
          <Link
            href="/proizvodi"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-[#C9A24D] px-6 text-sm font-semibold text-[#0B1F33] transition-colors hover:bg-[#D6B45F] focus-visible:outline-2 focus-visible:outline-[#C9A24D] focus-visible:outline-offset-4"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            Pogledajte proizvode
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen px-4 pb-16 pt-28 sm:px-6 md:pt-36">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-8 max-w-2xl sm:mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#C9A24D]">
            SIGURNO PORUČIVANJE
          </p>
          <h1 className="font-heading text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">
            Završite porudžbinu
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
            Unesite podatke za dostavu i potvrdite porudžbinu.
          </p>
        </header>

        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:gap-12"
        >
          <div className="checkout-form-sections space-y-7 sm:space-y-8">
            <section aria-labelledby="contact-heading">
              <h2
                id="contact-heading"
                className="mb-4 font-heading text-xl font-semibold text-text-primary"
              >
                Kontakt
              </h2>
              <div className="space-y-4">
                <CheckoutInput
                  name="fullName"
                  label="Ime i prezime"
                  autoComplete="name"
                  autoCapitalize="words"
                  value={values.fullName}
                  error={errors.fullName}
                  onChange={(value) => updateField("fullName", value)}
                />
                <CheckoutInput
                  name="phone"
                  label="Broj telefona"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  autoCapitalize="none"
                  autoCorrect="off"
                  helper="Potreban kurirskoj službi za dostavu porudžbine."
                  value={values.phone}
                  error={errors.phone}
                  onChange={(value) => updateField("phone", value)}
                />
                <CheckoutInput
                  name="email"
                  label="Email adresa"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  helper="Na ovu adresu dobićete potvrdu porudžbine i besplatan Odalis eBook."
                  value={values.email}
                  error={errors.email}
                  onChange={(value) => updateField("email", value)}
                />
              </div>
            </section>

            <section aria-labelledby="address-heading">
              <h2
                id="address-heading"
                className="mb-4 font-heading text-xl font-semibold text-text-primary"
              >
                Adresa za dostavu
              </h2>
              <div className="space-y-4">
                <CheckoutInput
                  name="street"
                  label="Ulica i broj"
                  autoComplete="shipping address-line1"
                  value={values.street}
                  error={errors.street}
                  onChange={(value) => updateField("street", value)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <CheckoutInput
                    name="city"
                    label="Grad / mesto"
                    autoComplete="shipping address-level2"
                    value={values.city}
                    error={errors.city}
                    onChange={(value) => updateField("city", value)}
                  />
                  <CheckoutInput
                    name="postalCode"
                    label="Poštanski broj"
                    autoComplete="shipping postal-code"
                    inputMode="numeric"
                    autoCapitalize="none"
                    autoCorrect="off"
                    value={values.postalCode}
                    error={errors.postalCode}
                    onChange={(value) => updateField("postalCode", value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="courierNote"
                    className="mb-1.5 block text-sm text-text-secondary"
                  >
                    Napomena za kurira (opciono)
                  </label>
                  <textarea
                    id="courierNote"
                    name="courierNote"
                    rows={4}
                    value={values.courierNote}
                    onChange={(event) =>
                      updateField("courierNote", event.target.value)
                    }
                    autoComplete="shipping address-line2"
                    className="h-[100px] w-full resize-y rounded-[8px] border border-white/15 bg-[#10263A] px-3 py-3 text-base text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-[#C9A24D]/70 focus-visible:ring-2 focus-visible:ring-[#C9A24D]/30"
                  />
                </div>
              </div>
            </section>

            <section aria-labelledby="delivery-heading">
              <h2
                id="delivery-heading"
                className="mb-4 font-heading text-xl font-semibold text-text-primary"
              >
                Dostava
              </h2>
              <div className="flex items-start justify-between gap-4 rounded-[8px] border border-[#C9A24D]/30 bg-[#10263A] p-4">
                <div className="flex gap-3">
                  <Truck
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#C9A24D]"
                    strokeWidth={1.6}
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Dostava na adresu
                    </p>
                    <div className="mt-1 space-y-0.5">
                      <p className="text-xs text-text-muted">
                        Brzom poštom širom Srbije
                      </p>
                      <p className="text-[11px] leading-relaxed text-text-muted/80">
                        Očekivani rok isporuke: 1–3 radna dana
                      </p>
                    </div>
                  </div>
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-[#C9A24D]">
                  {shipping.isFree ? "BESPLATNO" : formatPrice(shipping.cost)}
                </span>
              </div>
              {!shipping.isFree && (
                <p className="mt-2 text-xs text-text-muted">
                  Još {formatPrice(shipping.remainingForFree)} do besplatne dostave.
                </p>
              )}
            </section>

            <section aria-labelledby="payment-heading">
              <h2
                id="payment-heading"
                className="mb-4 font-heading text-xl font-semibold text-text-primary"
              >
                Plaćanje
              </h2>
              <div className="space-y-3">
                <label className="flex min-h-[92px] cursor-pointer items-start gap-3 rounded-[8px] border border-[#C9A24D]/30 bg-[#10263A] p-4">
                  <Banknote
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#C9A24D]"
                    strokeWidth={1.6}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-text-primary">
                      Plaćanje pouzećem
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-text-muted">
                      Plaćate kuriru prilikom preuzimanja porudžbine.
                    </span>
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked
                    readOnly
                    aria-label="Plaćanje pouzećem"
                    className="ml-auto mt-1 h-4 w-4 flex-shrink-0 accent-[#C9A24D]"
                  />
                </label>

                <div
                  aria-disabled="true"
                  className="flex min-h-[92px] cursor-not-allowed items-start gap-3 rounded-[8px] border border-white/15 bg-[#10263A] p-4"
                >
                  <CreditCard
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-text-muted"
                    strokeWidth={1.6}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-secondary">
                      Plaćanje karticom
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">
                      Platite bezbedno platnom karticom.
                    </p>
                  </div>
                  <span className="ml-auto whitespace-nowrap pt-0.5 text-[10px] font-medium tracking-[0.08em] text-text-muted">
                    USKORO
                  </span>
                </div>
              </div>
            </section>
          </div>

          <section
            aria-labelledby="order-summary-heading"
            className="rounded-[12px] border border-[#C9A24D]/25 bg-[#10263A] p-4 sm:p-6 lg:sticky lg:top-28"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2
                id="order-summary-heading"
                className="font-heading text-xl font-semibold text-text-primary"
              >
                Vaša porudžbina
              </h2>
              <button
                type="button"
                onClick={openCart}
                className="min-h-10 text-sm text-[#C9A24D] transition-colors hover:text-[#D6B45F] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2"
              >
                Izmeni korpu
              </button>
            </div>

            <ul className="divide-y divide-white/10">
              {items.map(({ product, quantity, categorySlug, productSlug }) => (
                <li
                  key={`${categorySlug}/${productSlug}`}
                  className="flex items-center gap-3 py-3"
                >
                  <div
                    className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-[6px] ${
                      product.images ? "bg-[#E8E5E0]" : "bg-[#0D1F32]"
                    }`}
                  >
                    {product.images ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center px-1 text-center text-[8px] leading-tight text-text-muted">
                        Slika uskoro
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-text-primary">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {product.quantity} × {quantity}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm text-text-secondary">
                    {formatPrice(product.price * quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
              <PriceRow label="Međuzbir" value={formatPrice(subtotal)} />
              <PriceRow
                label="Dostava"
                value={shipping.isFree ? "BESPLATNO" : formatPrice(shipping.cost)}
                highlight={shipping.isFree}
              />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#C9A24D]/25 pt-4">
              <span className="text-sm font-semibold tracking-wide text-text-primary">
                UKUPNO
              </span>
              <span className="text-xl font-semibold text-[#C9A24D]">
                {formatPrice(subtotal + shipping.cost)}
              </span>
            </div>
            {shipping.isFree && (
              <p className="mt-2 text-xs font-medium text-[#C9A24D]">
                Ostvarili ste besplatnu dostavu.
              </p>
            )}
            <p className="mt-3 text-xs leading-relaxed text-text-muted">
              Na email adresu dobićete potvrdu porudžbine i besplatan Odalis eBook.
            </p>

            {submitMessage && (
              <p
                role="status"
                aria-live="polite"
                className="mt-4 border border-white/15 p-3 text-sm leading-relaxed text-text-secondary"
              >
                {submitMessage}
              </p>
            )}

            <button
              type="submit"
              className="mt-5 inline-flex min-h-14 w-full items-center justify-center bg-[#C9A24D] px-5 text-sm font-semibold tracking-[0.05em] text-[#0B1F33] transition-colors hover:bg-[#D6B45F] focus-visible:outline-2 focus-visible:outline-[#C9A24D] focus-visible:outline-offset-4"
            >
              POTVRDI PORUDŽBINU
            </button>
            <p className="mt-3 text-center text-xs text-text-muted">
              Plaćanje pouzećem · Dostava širom Srbije
            </p>
          </section>
        </form>
      </div>
    </main>
  );
}

function CheckoutInput({
  name,
  label,
  value,
  error,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
  autoCapitalize,
  autoCorrect,
  helper,
}: {
  name: Exclude<CheckoutField, "courierNote">;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: "text" | "tel" | "email";
  inputMode?: "text" | "tel" | "email" | "numeric";
  autoComplete: string;
  autoCapitalize?: string;
  autoCorrect?: string;
  helper?: string;
}) {
  const id = `checkout-${name}`;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const describedBy = [
    helper ? helperId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-text-secondary"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        required
        aria-required="true"
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-[50px] w-full rounded-[8px] border bg-[#10263A] px-3 text-base text-text-primary outline-none transition-colors placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-[#C9A24D]/30 ${
          error
            ? "border-[#E5A29A] focus:border-[#E5A29A]"
            : "border-white/15 focus:border-[#C9A24D]/70"
        }`}
      />
      {helper && (
        <p id={helperId} className="mt-1.5 text-xs leading-relaxed text-text-muted">
          {helper}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs leading-relaxed text-[#F0B8AF]">
          {error}
        </p>
      )}
    </div>
  );
}

function PriceRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-text-muted">{label}</span>
      <span className={highlight ? "font-medium text-[#C9A24D]" : "text-text-secondary"}>
        {value}
      </span>
    </div>
  );
}
