"use client";

import { useState, useEffect, useRef } from "react";
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
  // Counter animation state for first benefit card
  const [count, setCount] = useState(0);
  // Counter animation state for second benefit card (100%)
  const [count2, setCount2] = useState(1);
  // Counter animation state for third benefit card (0)
  const [count3, setCount3] = useState(100);
  // Flag to track if counters should start
  const [countersStarted, setCountersStarted] = useState(false);
  // Ref for the benefit cards wrapper
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to trigger counters when cards enter viewport
  useEffect(() => {
    const wrapper = cardsWrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, [countersStarted]);

  // Animation for first card: 0 → 10
  useEffect(() => {
    if (!countersStarted) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(10);
      return;
    }

    const targetCount = 10;
    
    // Fixed step intervals (no dynamic changes)
    const STEP_MS_NORMAL = 318; // Fixed interval for 0-8 (2550ms / 8 steps ≈ 318ms per step)
    const STEP_MS_FAST = 225; // Fixed interval for 8-10 (225ms per step)

    let currentValue = 0;
    let intervalId: NodeJS.Timeout | null = null;

    // Phase 1: 0-8 with fast step interval
    const startNormalPhase = () => {
      intervalId = setInterval(() => {
        currentValue++;
        setCount(currentValue);
        
        if (currentValue >= 8) {
          // Switch to slow phase when reaching 8
          if (intervalId) {
            clearInterval(intervalId);
          }
          startFastPhase();
        }
      }, STEP_MS_FAST);
    };

    // Phase 2: 8-10 with normal step interval
    const startFastPhase = () => {
      // Start from 8, then go to 9, then 10
      intervalId = setInterval(() => {
        currentValue++;
        if (currentValue <= targetCount) {
          setCount(currentValue);
        }
        
        if (currentValue >= targetCount) {
          // Animation complete
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      }, STEP_MS_NORMAL);
    };

    // Start animation
    startNormalPhase();

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countersStarted]);

  // Animation for second card: 1 → 100
  useEffect(() => {
    if (!countersStarted) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount2(100);
      return;
    }

    const startValue = 1;
    const targetCount = 100;
    // Calculate interval to match similar duration as first card (~2.5s)
    // First card: ~2436ms for 10 steps, so for 99 steps we need ~25ms per step
    const STEP_MS = 25;

    let currentValue = startValue;
    let intervalId: NodeJS.Timeout | null = null;

    intervalId = setInterval(() => {
      currentValue++;
      if (currentValue <= targetCount) {
        setCount2(currentValue);
      }
      
      if (currentValue >= targetCount) {
        // Animation complete
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    }, STEP_MS);

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countersStarted]);

  // Animation for third card: 100 → 0
  useEffect(() => {
    if (!countersStarted) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount3(0);
      return;
    }

    const startValue = 100;
    const targetCount = 0;
    // Use same interval as second card for visual consistency
    const STEP_MS = 25;

    let currentValue = startValue;
    let intervalId: NodeJS.Timeout | null = null;

    intervalId = setInterval(() => {
      currentValue--;
      if (currentValue >= targetCount) {
        setCount3(currentValue);
      }
      
      if (currentValue <= targetCount) {
        // Animation complete
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    }, STEP_MS);

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countersStarted]);

  return (
    <section
      id="hero"
      className="relative flex justify-start md:items-center md:justify-center min-h-[90vh] md:min-h-[calc(100vh-var(--header-height))] pt-24 pb-20 md:pt-0 md:pb-0 overflow-hidden scroll-mt-24"
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pb-10 md:pb-0">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-14 items-center md:items-end">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl space-y-6 md:space-y-8 w-full"
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
              className="w-full sm:w-auto px-8 py-4 text-base md:text-lg hover:bg-[#C9A24D] hover:text-[#0B1F33]"
            >
              {ctaText}
            </Button>
          </motion.div>

          {/* Decorative shape and benefits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="
              w-full
              flex flex-col items-center
              mt-8 md:mt-0
              md:relative md:h-[450px] md:lg:h-[540px]
              md:flex md:items-end md:justify-end
            "
          >
            {/* Wrapper for shape and benefits */}
            <div className="flex flex-col items-center md:absolute md:right-8 md:bottom-0">
              {/* Large decorative shape */}
              <div
                className="hero-shape card-surface w-[300px] h-[410px] md:w-[380px] md:h-[500px] relative overflow-hidden"
                aria-hidden="true"
              >
                <Image
                  src="/hero1.png"
                  alt="Hero image"
                  fill
                  sizes="(min-width: 1024px) 480px, 90vw"
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Benefit cards */}
              <div ref={cardsWrapperRef} className="grid grid-cols-3 gap-2 sm:gap-3 items-stretch justify-items-center w-full max-w-[360px] md:max-w-[420px] mx-auto mt-5 sm:mt-6">
                {/* Benefit card 1 */}
                <div className="card-surface bg-white/5 border-2 border-[#C9A24D]/60 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] w-full min-w-0 h-[60px] lg:h-[80px] flex flex-col items-center justify-center text-center px-2 py-2 sm:px-3 sm:py-3">
                  <div className="flex flex-col items-center justify-center text-center">
                    {/* Number with plus */}
                    <span className="text-2xl md:text-3xl text-text-secondary font-semibold leading-none">
                      {count}+
                    </span>
                    {/* Label */}
                    <span className="text-[10px] sm:text-[11px] text-text-secondary font-semibold leading-normal mt-0.5">
                      Tretmana
                    </span>
                  </div>
                </div>

                {/* Benefit card 2 */}
                <div className="card-surface bg-white/5 border-2 border-[#C9A24D]/60 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] w-full min-w-0 h-[60px] lg:h-[80px] flex flex-col items-center justify-center text-center px-2 py-2 sm:px-3 sm:py-3">
                  <div className="flex flex-col items-center justify-center text-center">
                    {/* Number with percent */}
                    <span className="text-2xl md:text-3xl text-text-secondary font-semibold leading-none">
                      {count2}%
                    </span>
                    {/* Label */}
                    <span className="text-[10px] sm:text-[11px] text-text-secondary font-semibold leading-normal mt-0.5">
                      Neinvazivan pristup
                    </span>
                  </div>
                </div>

                {/* Benefit card 3 */}
                <div className="card-surface bg-white/5 border-2 border-[#C9A24D]/60 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] w-full min-w-0 h-[60px] lg:h-[80px] flex flex-col items-center justify-center text-center px-2 py-2 sm:px-3 sm:py-3">
                  <div className="flex flex-col items-center justify-center text-center">
                    {/* Number without sign */}
                    <span className="text-2xl md:text-3xl text-text-secondary font-semibold leading-none">
                      {count3}
                    </span>
                    {/* Label */}
                    <span className="text-[10px] sm:text-[11px] text-text-secondary font-semibold leading-normal mt-0.5">
                      Dana oporavka
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
