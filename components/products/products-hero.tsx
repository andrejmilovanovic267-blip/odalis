"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/ui/button";

const productTypesId = "tipovi-nege";

export function ProductsHero() {
  const scrollToProductTypes = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(productTypesId)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div className="w-full max-w-xl space-y-5 md:space-y-7">
            <p className="text-text-muted text-xs font-medium uppercase tracking-[0.16em] sm:text-sm">
              Odalis nega kod kuće
            </p>

            <SectionHeading
              as="h1"
              className="mb-0 max-w-[620px] font-bold !leading-[1.15] text-[clamp(2.4rem,6vw,4.25rem)] tracking-[0.005em]"
            >
              Proizvodi za negu lica i kože
            </SectionHeading>

            <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg md:text-xl">
              Pažljivo odabrane kreme, maske i setovi za svakodnevnu negu kože.
              Jednostavna rutina prilagođena potrebama tvoje kože.
            </p>

            <div className="pt-1 sm:pt-2">
              <Button
                href={`#${productTypesId}`}
                onClick={scrollToProductTypes}
                variant="primary"
                className="w-full px-8 py-4 text-base hover:bg-[#C9A24D] hover:text-[#0B1F33] sm:w-auto md:text-lg"
                aria-label="Istraži proizvode"
              >
                Istraži proizvode
                <ArrowDown aria-hidden="true" className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] md:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 translate-x-2 translate-y-2 rounded-[160px] border border-[#C9A24D]/30 sm:-inset-4 md:translate-x-3 md:translate-y-3"
            />
            <div className="hero-shape relative h-[300px] w-full overflow-hidden sm:h-[360px] md:h-[430px] lg:h-[480px]">
              <Image
                src="/heroslika1.png"
                alt="Žena u trenutku nežne nege kože lica"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, (min-width: 768px) 45vw, 90vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
