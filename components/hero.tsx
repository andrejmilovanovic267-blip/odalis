"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Button } from "@/ui/button";

interface HeroProps {
  eyebrow?: string;
  title: string;
  ctaText: string;
  ctaHref: string;
  supportingText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({
  eyebrow,
  title,
  ctaText,
  ctaHref,
  supportingText,
  imageSrc,
  imageAlt = "Woman",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex items-end min-h-[100svh] pt-8 md:pt-12 lg:pt-16 pb-0 overflow-hidden scroll-mt-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/60 via-transparent to-navy-800/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-800/20 via-transparent to-transparent pointer-events-none" />

      {/* Soft radial glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[420px] md:w-[640px] h-[420px] md:h-[640px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(26,47,71,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl space-y-6 md:space-y-8"
          >
            {eyebrow && (
              <p className="text-text-muted text-sm md:text-base uppercase tracking-[0.15em]">
                {eyebrow}
              </p>
            )}

            <SectionHeading
              as="h1"
              className="
                font-bold leading-[1.1]
                text-[clamp(2.75rem,6vw,4.5rem)]
              "
            >
              {title}
            </SectionHeading>

            {supportingText && (
              <p className="text-text-secondary text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed">
                {supportingText}
              </p>
            )}

            <Button
              href={ctaHref}
              variant="primary"
              className="w-full sm:w-auto px-8 py-4 text-base md:text-lg"
            >
              {ctaText}
            </Button>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="
              relative w-full
              h-[420px] sm:h-[520px] md:h-[600px] lg:h-[720px]
              self-end
            "
          >
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/10 to-transparent z-10 pointer-events-none" />

            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-bottom"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
