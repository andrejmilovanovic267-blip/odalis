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
    <section className="min-h-screen flex items-center py-24 md:py-40 relative z-10">
      {/* Unified dark canvas with layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/50 via-transparent to-navy-800/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-800/15 via-transparent to-transparent pointer-events-none" />
      
      {/* Soft radial gradient behind text for depth */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-3xl pointer-events-none opacity-50 overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(26, 47, 71, 0.2) 0%, transparent 70%)' }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-full overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 md:space-y-8 min-w-0"
          >
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-text-muted text-sm md:text-base font-medium uppercase tracking-[0.15em] break-words"
              >
                {eyebrow}
              </motion.p>
            )}

            <SectionHeading as="h1" className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold break-words">
              {title}
            </SectionHeading>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 pt-2 min-w-0"
            >
              <div className="relative inline-block w-full md:w-auto">
                {/* Subtle glow behind CTA */}
                <div className="absolute inset-0 bg-white/5 blur-xl rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Button href={ctaHref} variant="primary" className="w-full md:w-auto group">
                  {ctaText}
                </Button>
              </div>

              {supportingText && (
                <p className="text-text-secondary text-lg md:text-xl max-w-lg leading-[1.85] font-light break-words">
                  {supportingText}
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] rounded-3xl overflow-hidden glass-premium w-full"
          >
            {/* Gradient overlay for image desaturation effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/40 via-transparent to-navy-950/30 z-10 pointer-events-none" />
            
            {/* Vignette edges */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 15, 26, 0.4) 100%)' }} />
            
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover brightness-[0.85] saturate-[0.75] contrast-[1.05]"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-800/40 to-navy-950/60">
                <div className="text-text-muted text-sm font-light">Image placeholder</div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

