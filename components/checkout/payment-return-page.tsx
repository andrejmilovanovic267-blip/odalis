import Link from "next/link";

export function PaymentReturnPage({
  title,
  description,
  action,
  href,
  orderNumber,
}: {
  title: string;
  description: string;
  action: string;
  href: string;
  orderNumber?: string;
}) {
  return (
    <main className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center px-4 pb-16 pt-28 md:min-h-[calc(100vh-6rem)] md:pt-36">
      <section className="mx-auto w-full max-w-xl rounded-xl border border-[#C9A24D]/25 bg-[#10263A] p-6 text-center sm:p-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[#C9A24D]">
          SIGURNO PORUČIVANJE
        </p>
        <h1 className="font-heading text-2xl font-semibold text-text-primary sm:text-3xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
          {description}
        </p>
        {orderNumber && (
          <p className="mt-3 text-sm font-medium text-[#C9A24D]">
            Broj porudžbine: {orderNumber}
          </p>
        )}
        <Link
          href={href}
          className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#C9A24D] px-6 text-sm font-semibold text-[#0B1F33] transition-colors hover:bg-[#D6B45F] focus-visible:outline-2 focus-visible:outline-[#C9A24D] focus-visible:outline-offset-4"
        >
          {action}
        </Link>
      </section>
    </main>
  );
}
