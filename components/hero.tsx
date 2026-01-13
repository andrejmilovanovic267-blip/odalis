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
      className="relative flex justify-start md:items-center md:justify-center min-h-[calc(100vh-var(--header-height))] pt-24 pb-20 md:pt-0 md:pb-0 overflow-hidden scroll-mt-24"
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
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
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
                font-bold !leading-[1.25] tracking-[0.01em]
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
              h-[315px] sm:h-[390px] md:h-[450px] lg:h-[540px]
              flex items-center justify-center
              mt-12 md:mt-0
            "
          >
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/10 to-transparent z-10 pointer-events-none" />

            {imageSrc && (
              <div className="relative inline-block w-fit max-w-full">
                {/* Image wrapper with border - border on same element that clips the image */}
                <div className="relative inline-block max-w-[calc(100vw-2rem)] sm:max-w-[calc(50vw-3rem)] border-[3px] border-[#C9A24D] rounded-2xl overflow-hidden bg-transparent p-0 m-0 block">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={400}
                    height={533}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center max-h-[315px] sm:max-h-[390px] md:max-h-[450px] lg:max-h-[540px] w-auto h-auto block m-0 p-0"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
