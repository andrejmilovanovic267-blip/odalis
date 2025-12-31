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
    <section className="min-h-screen flex items-center py-20 md:py-32 relative z-10">
      {/* Subtle gradient beam behind text */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-800/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-text-muted text-sm md:text-base font-medium uppercase tracking-wider"
              >
                {eyebrow}
              </motion.p>
            )}

            <SectionHeading as="h1" className="text-4xl md:text-5xl lg:text-6xl">
              {title}
            </SectionHeading>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="space-y-4"
            >
              <Button href={ctaHref} variant="primary" className="w-full md:w-auto">
                {ctaText}
              </Button>

              {supportingText && (
                <p className="text-text-muted text-base md:text-lg max-w-md leading-relaxed">
                  {supportingText}
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-navy-800/30"
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover brightness-75 saturate-80"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-text-muted text-sm">Image placeholder</div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

