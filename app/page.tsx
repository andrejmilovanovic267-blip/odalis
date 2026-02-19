"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle } from "lucide-react";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { FeatureList } from "@/components/feature-list";
import { Footer } from "@/components/footer";
import { ConsultationSection } from "@/components/consultation-section";
import { ReviewsSection } from "@/components/reviews-section";
import { scrollToSection } from "@/lib/scroll-utils";

type ViewType = 'home' | 'treatments-face' | 'treatments-body';

export default function LandingPage() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  
  // Process steps connector animation
  const processStepsRef = useRef<HTMLDivElement>(null);
  const [connectorActive, setConnectorActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setIsNavigatingBack(true);
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        // Going back to initial state (homepage)
        setCurrentView('home');
      }
      // Browser will automatically restore scroll position
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Only scroll to top when navigating forward to a treatment view, not when going back
  useEffect(() => {
    if (currentView !== 'home' && !isNavigatingBack) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsNavigatingBack(false);
  }, [currentView, isNavigatingBack]);

  // Prefers-reduced-motion detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // IntersectionObserver for process steps connector animation
  useEffect(() => {
    if (!processStepsRef.current || connectorActive) return;
    const el = processStepsRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setConnectorActive(true);
          obs.disconnect();
        }
      },
      { threshold: [0, 0.35, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [connectorActive]);

  // If reduced motion, show lines immediately
  useEffect(() => {
    if (reduceMotion) setConnectorActive(true);
  }, [reduceMotion]);

  const handleViewChange = (view: ViewType) => {
    // Push state to history when navigating to treatment views
    // This creates a history entry so back button can restore scroll position
    if (view !== 'home') {
      window.history.pushState({ view }, '', window.location.pathname);
    }
    setCurrentView(view);
  };

  const handleBackToHome = () => {
    // Navigate to the treatment selection section (same as header "Tretmani" link)
    // This section contains the "Svi tretmani za lice" and "Svi tretmani za telo" buttons
    setCurrentView('home');
    router.push("/", { scroll: false });
    
    requestAnimationFrame(() => {
      const el = document.getElementById("treatments");
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
    });
  };

  const handleConsultationClick = () => {
    setCurrentView('home');
    // Wait for home view to render, then scroll
    setTimeout(() => {
      scrollToSection('#konsultacije', { behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const faceTreatments = [
    {
      title: "HydraFacial",
      description: "Dubinsko čišćenje, hidratacija i osveženje kože u jednom tretmanu. Idealan za umorno lice, neujednačen ten i trenutni sjaj."
    },
    {
      title: "Indiba",
      description: "Nežan tretman koji podstiče regeneraciju kože, poboljšava elastičnost i vraća prirodan, zdrav izgled licu."
    },
    {
      title: "Endosfera",
      description: "Mikrovibracioni tretman koji stimuliše cirkulaciju, tonizira kožu i doprinosi anti-age efektu lica i vrata."
    },
    {
      title: "Radiotalasni lifting",
      description: "Zatezanje i lifting kože kroz stimulaciju kolagena i elastina, za čvršće i zategnutije lice bez invazivnih metoda."
    }
  ];

  const bodyTreatments = [
    {
      title: "Indiba – regeneracija i oporavak tela",
      description: "Poboljšava cirkulaciju, ubrzava regeneraciju tkiva i smanjuje bolove u mišićima i zglobovima."
    },
    {
      title: "Endosfera",
      description: "Mikrovibracioni tretman za smanjenje celulita, limfnu drenažu i oblikovanje kontura tela."
    },
    {
      title: "Kavitacija",
      description: "Neinvazivno razbijanje masnih naslaga i redukcija obima, idealna za stomak, butine i bokove."
    },
    {
      title: "Radiotalasni lifting tela",
      description: "Zatezanje i učvršćivanje kože, poboljšanje tonusa i vidljivo glađa koža bez hirurških zahvata."
    },
    {
      title: "Ručna masaža",
      description: "Duboko opuštanje, oslobađanje napetosti i poboljšanje opšteg stanja tela i cirkulacije."
    }
  ];

  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
      {/* Hero Section - H1 with primary keyword */}
      <Hero
        eyebrow="Centar za podmlađivanje lica i tela"
        title="Prirodno podmlađivanje lica i tela u Odalisu"
        ctaText="Zakaži besplatne konsultacije"
        ctaHref="#konsultacije"
        supportingText="Savetovanje bez obaveza. Razgovarajmo o vašim željama i očekivanjima. Dobrodošli u Odalis centar za podmlađivanje lica i tela u Beogradu."
        imageSrc="/heroslika1.png"
        imageAlt="Prirodno podmlađivanje lica i tela - Neinvazivni tretmani u Odalis centru za podmlađivanje"
      />

      {/* Problem Awareness Section */}
      <Section className="relative problem-section-unified-bg">
        <section className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto space-y-12 overflow-hidden"
          >
            {/* Intro */}
            <div className="space-y-6 text-center mb-16">
              <SectionHeading as="h2" className="max-w-3xl mx-auto">
                Kada želite da se ponovo osećate dobro u svom telu i licu
            </SectionHeading>
            
              <div className="text-text-secondary text-lg md:text-xl leading-relaxed font-light break-words max-w-2xl mx-auto">
              <p>
                  Promene na koži i telu dolaze prirodno. Zato i podmlađivanje treba da bude takvo. U Odalisu nudimo neinvazivne tretmane za prirodne, dugotrajne rezultate bez pritiska i bez agresivnih metoda.
                </p>
              </div>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Desktop: Horizontal connector line */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24D]/40 to-transparent" />
              
              <div className="flex flex-col md:flex-row md:items-stretch gap-12 md:gap-8 relative">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  className="flex-1 relative"
                >
                  {/* Mobile: Vertical connector line */}
                  <div className="md:hidden absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-transparent to-[#C9A24D]/40" />
                  
                  <div className="text-center space-y-4 max-w-sm mx-auto bg-white/5 border border-[#C9A24D]/60 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] h-full flex flex-col">
                    {/* Icon */}
                    <div className="flex justify-center mb-2">
                      <svg className="w-12 h-12 text-[#C9A24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-text-primary text-xl md:text-2xl font-bold leading-tight break-words">
                      Umoran izgled lica i gubitak sjaja
                    </h3>
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                      Suvoća, bore i neujednačen ten mogu učiniti da lice izgleda umorno. Neinvazivni tretmani za podmlađivanje lica pomažu koži da povrati sjaj, svežinu i elastičnost.
              </p>
            </div>
                  
                  {/* Desktop: Right connector line */}
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-[#C9A24D]/40 to-transparent" />
          </motion.div>

                {/* Step 2 */}
          <motion.div
                  initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  className="flex-1 relative"
                >
                  {/* Mobile: Vertical connector lines */}
                  <div className="md:hidden absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-transparent to-[#C9A24D]/40" />
                  <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-[#C9A24D]/40 to-transparent" />
                  
                  <div className="text-center space-y-4 max-w-sm mx-auto bg-white/5 border border-[#C9A24D]/60 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] h-full flex flex-col">
                    {/* Icon */}
                    <div className="flex justify-center mb-2">
                      <svg className="w-12 h-12 text-[#C9A24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-text-primary text-xl md:text-2xl font-bold leading-tight break-words">
                      Gubitak čvrstoće i kontura tela
                    </h3>
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                      Pad tonusa, celulit i lokalne masne naslage često ne reaguju na vežbanje. Tretmani za zatezanje i oblikovanje tela deluju prirodno i postepeno.
                    </p>
                  </div>
                  
                  {/* Desktop: Left and right connector lines */}
                  <div className="hidden md:block absolute top-12 -left-4 w-8 h-px bg-gradient-to-r from-transparent to-[#C9A24D]/40" />
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-[#C9A24D]/40 to-transparent" />
                </motion.div>

                {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  className="flex-1 relative"
                >
                  {/* Mobile: Vertical connector line */}
                  <div className="md:hidden absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-transparent to-[#C9A24D]/40" />
                  
                  <div className="text-center space-y-4 max-w-sm mx-auto bg-white/5 border border-[#C9A24D]/60 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] h-full flex flex-col">
                    {/* Icon */}
                    <div className="flex justify-center mb-2">
                      <svg className="w-12 h-12 text-[#C9A24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-text-primary text-xl md:text-2xl font-bold leading-tight break-words">
                      Niste sigurni šta je pravi izbor za vas
                  </h3>
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                      Veliki izbor tretmana može zbuniti. Besplatne konsultacije vam pomažu da bez pritiska odaberete rešenje prilagođeno vašem telu i ciljevima.
                    </p>
                  </div>
                  
                  {/* Desktop: Left connector line */}
                  <div className="hidden md:block absolute top-12 -left-4 w-8 h-px bg-gradient-to-r from-transparent to-[#C9A24D]/40" />
                </motion.div>
              </div>
            </div>
              </motion.div>
        </section>
      </Section>

      {/* Treatment Selection Section */}
      <Section id="treatments" className="relative scroll-mt-[135px] md:scroll-mt-[151px] treatment-cards-unified-bg">
        {/* Hidden anchor for backward compatibility with header link */}
        <div id="tretmani" className="absolute top-0 pointer-events-none" aria-hidden="true" />
        <section className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto overflow-visible"
          >
            <div id="tretmani-cards" className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-1">
              {/* Facial Rejuvenation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="group relative z-0 hover:z-10"
              >
                <div className="h-full grid grid-rows-2 rounded-3xl card-surface hover:shadow-soft hover:scale-[1.01] transition-all duration-200 ease-out will-change-transform">
                  {/* Top Part - Image (Square) */}
                  <div className="relative w-full h-full overflow-hidden rounded-t-3xl">
                    <Image
                      src="/tretmani.lice.jpg"
                      alt="Neinvazivni tretmani za podmlađivanje lica u Odalisu"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-200 ease-out"
                    />
                  </div>
                  
                  {/* Bottom Part - Content (~60%) */}
                  <div className="h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 space-y-6 rounded-b-3xl overflow-hidden bg-transparent">
                    <div className="space-y-4">
                      <h3 className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words">
                        Podmlađivanje lica
                  </h3>
                      <div className="space-y-3 text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                        <p>
                          Neinvazivni tretmani za svežiju, zategnutiju i blistaviju kožu.
                        </p>
                        <p>
                          Fokusirani na regeneraciju, hidrataciju i prirodan lifting, bez oporavka.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/tretmani/lice"
                      className="btn-cta w-full md:w-auto cursor-pointer inline-flex items-center justify-center"
                    >
                      Svi tretmani za lice
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Body Rejuvenation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="group relative z-0 hover:z-10"
              >
                <div className="h-full grid grid-rows-2 rounded-3xl card-surface hover:shadow-soft hover:scale-[1.01] transition-all duration-200 ease-out will-change-transform">
                  {/* Top Part - Image (Square) */}
                  <div className="relative w-full h-full overflow-hidden rounded-t-3xl">
                    <Image
                      src="/tretmani.telo.jpeg"
                      alt="Neinvazivni tretmani za zatezanje i oblikovanje tela u Odalisu"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-200 ease-out"
                    />
            </div>
            
                  {/* Bottom Part - Content (~60%) */}
                  <div className="h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 space-y-6 rounded-b-3xl overflow-hidden bg-transparent">
                    <div className="space-y-4">
                      <h3 className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words">
                        Podmlađivanje tela
                      </h3>
                      <div className="space-y-3 text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                        <p>
                          Tretmani za oblikovanje tela, zatezanje kože i osećaj lakoće.
                        </p>
                        <p>
                          Podrška cirkulaciji, limfnoj drenaži i prirodnoj regeneraciji.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/tretmani/telo"
                      className="btn-cta w-full md:w-auto cursor-pointer inline-flex items-center justify-center"
                    >
                      Svi tretmani za telo
                    </Link>
                  </div>
                </div>
          </motion.div>
        </div>
            {/* Anchor for desktop scroll target - positioned after cards */}
            <div id="tretmani-end" className="hidden md:block h-0 pointer-events-none" />
          </motion.div>
        </section>
      </Section>

      {/* How Odalis Works Section */}
      <Section id="proces" className="relative proces-section-no-overlay" noOverlay>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl mx-auto space-y-10"
          >
            {/* Header */}
            <div className="space-y-5 text-center max-w-3xl mx-auto">
              <SectionHeading
                as="h2"
                className="mx-auto text-3xl md:text-4xl lg:text-5xl mb-4"
              >
                Kako izgleda vaš Odalis put do prirodnog podmlađivanja
            </SectionHeading>
            
              <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words max-w-[720px] mx-auto">
                Kroz konsultacije, plan po meri i pažljivo odabrane tretmane dolazite do rezultata koji izgledaju prirodno.
              </p>

              <p className="text-text-muted text-sm md:text-base font-light">
                Bez oporavka • Bez obaveza • Prirodni, postepeni rezultati
              </p>
            </div>

            {/* Text-only steps (centered) */}
            <div id="process-steps" ref={processStepsRef} className="mx-auto max-w-6xl pb-16 md:pb-20">
              <ol className="grid gap-6 md:gap-8 lg:grid-cols-3 mb-10 md:mb-12">
                {/* Step 1 */}
                <li className="relative">
                  <div className="flex flex-row items-start gap-4 lg:flex-col lg:items-center lg:gap-0">
                    {/* Testimonials card wrapper classes: card-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform */}
                    <div className="card-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform flex-1 lg:w-full flex flex-col">
                      {/* Step badge row - centered at top */}
                      <div className="flex justify-center pt-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#C9A24D] bg-transparent flex items-center justify-center">
                          <span className="text-[#C9A24D] font-semibold text-lg md:text-xl">1</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-5 pb-5 mt-4">
                        <h3 className="text-text-primary text-lg font-bold mb-2 leading-tight">
                          Konsultacije i procena
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-3">
                          Kratko upoznajemo vašu kožu i ciljeve, pa dobijate jasnu preporuku za prirodan rezultat.
                        </p>
                        <ul className="space-y-2 text-text-secondary text-sm leading-relaxed mb-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Razgovor o željama i prioritetima</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Procena kože lica ili tela</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Preporuka bez pritiska</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Step 2 */}
                <li className="relative">
                  <div className="flex flex-row items-start gap-4 lg:flex-col lg:items-center lg:gap-0">
                    {/* Testimonials card wrapper classes: card-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform */}
                    <div className="card-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform flex-1 lg:w-full flex flex-col">
                      {/* Step badge row - centered at top */}
                      <div className="flex justify-center pt-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#C9A24D] bg-transparent flex items-center justify-center">
                          <span className="text-[#C9A24D] font-semibold text-lg md:text-xl">2</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-5 pb-5 mt-4">
                        <h3 className="text-text-primary text-lg font-bold mb-2 leading-tight">
                          Individualni plan
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-3">
                          Kreiramo plan nege i tretmana koji je realan, postepen i prilagođen vašem ritmu.
                        </p>
                        <ul className="space-y-2 text-text-secondary text-sm leading-relaxed mb-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Jasna očekivanja</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Odabir tretmana po meri</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Plan bez iznenađenja</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Step 3 */}
                <li className="relative">
                  <div className="flex flex-row items-start gap-4 lg:flex-col lg:items-center lg:gap-0">
                    {/* Testimonials card wrapper classes: card-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform */}
                    <div className="card-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform flex-1 lg:w-full flex flex-col">
                      {/* Step badge row - centered at top */}
                      <div className="flex justify-center pt-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#C9A24D] bg-transparent flex items-center justify-center">
                          <span className="text-[#C9A24D] font-semibold text-lg md:text-xl">3</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-5 pb-5 mt-4">
                        <h3 className="text-text-primary text-lg font-bold mb-2 leading-tight">
                          Neinvazivni tretmani i rezultati
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-3">
                          Sprovodimo neinvazivne tretmane koji podižu kvalitet kože bez agresivnih metoda.
                        </p>
                        <ul className="space-y-2 text-text-secondary text-sm leading-relaxed mb-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Bez pauze u rutini</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Prirodni rezultati</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4" />
                            <span>Praćenje napretka</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>

              {/* Mini CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="mt-10 flex flex-col items-center"
              >
              <Button href="#konsultacije" variant="primary" className="w-full md:w-auto px-6 py-2.5 text-sm">
                Zakaži besplatne konsultacije
              </Button>
            </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Šta jeste / šta nije Section */}
      <Section className="relative py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto overflow-hidden"
          >
            {/* Heading */}
            <div className="text-center mb-8 md:mb-12">
              <SectionHeading as="h2" className="text-3xl md:text-5xl mb-4 md:mb-6">
                Zašto klijentkinje biraju Odalis centar za podmlađivanje
            </SectionHeading>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Podmlađivanje nije samo tretman — to je odluka o poverenju.
                U Odalis centru verujemo u iskren pristup, realna očekivanja i prirodne rezultate.
                Zato želimo jasno da znate šta možete da očekujete i kako radimo — bez pritiska, bez agresivnih metoda i bez lažnih obećanja.
              </p>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16 items-stretch">
              {/* Leva kolona - ŠTA JESTE */}
              <div
                className="card-surface overflow-hidden p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform h-full flex flex-col"
              >
                <h3 className="text-text-primary text-lg font-bold mb-3 leading-tight">
                  Šta možete da očekujete u Odalis centru
                </h3>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Neinvazivne i bezbedne tretmane</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Bez igala, bez oporavka i bez agresivnih intervencija, samo metode koje poštuju vašu kožu i telo.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Individualan pristup vašem licu i telu</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Svaki tretman biramo prema vašim ciljevima, stanju kože i tempu koji vama odgovara.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Prirodne i postepene rezultate</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Naš cilj nije da promenimo vaš izgled, već da istaknemo ono najbolje, diskretno i skladno.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Prijatno i opuštajuće iskustvo</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Tretmani su deo nege i brige o sebi, a ne stres ili neprijatnost.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#C9A24D]/75 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Stručno vođene preporuke</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Dobijate iskren savet, jasno objašnjenje i realan plan, bez ulepšavanja i bez pritiska.</span>
                    </div>
                  </li>
                </ul>
                {/* Divider line matching testimonials */}
                <div className="mt-auto border-t border-white/10 mb-2.5">
                  <div className="h-[44px] flex items-center justify-center p-0 leading-none">
                  </div>
                </div>
              </div>

              {/* Desna kolona - ŠTA NIJE */}
              <div
                className="card-surface overflow-hidden p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform h-full flex flex-col"
              >
                <h3 className="text-text-primary text-lg font-bold mb-3 leading-tight">
                  Naš pristup u praksi: iskreno i transparentno
                </h3>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start gap-3">
                    <XCircle className="text-white/40 flex-shrink-0 mt-0.5 w-5 h-5 md:w-6 md:h-6" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Ne jurimo instant efekte</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Verujemo u rezultate koji dolaze prirodno i traju duže, bez šoka za kožu.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="text-white/40 flex-shrink-0 mt-0.5 w-5 h-5 md:w-6 md:h-6" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Ne menjamo vaš identitet</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Podmlađivanje kod nas znači osvežen, zdrav i odmoran izgled, ne &ldquo;novo lice&rdquo;.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="text-white/40 flex-shrink-0 mt-0.5 w-5 h-5 md:w-6 md:h-6" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Bez bola i neprijatnih iskustava</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Tretmani su blagi, sigurni i prilagođeni vašem komforu.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="text-white/40 flex-shrink-0 mt-0.5 w-5 h-5 md:w-6 md:h-6" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Bez obaveze i pritiska</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Besplatne konsultacije služe da dobijete odgovor i jasnoću, odluka je uvek vaša.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="text-white/40 flex-shrink-0 mt-0.5 w-5 h-5 md:w-6 md:h-6" />
                    <div>
                      <span className="text-text-primary text-base md:text-lg font-medium block mb-1 text-text-primary/90">Ako tretman nije za vas, reći ćemo vam</span>
                      <span className="text-text-secondary text-sm leading-relaxed">Iskren odnos je važniji od prodaje. Vaše poverenje nam je prioritet.</span>
                    </div>
                  </li>
                </ul>
                {/* Divider line matching testimonials */}
                <div className="mt-auto border-t border-white/10 mb-2.5">
                  <div className="h-[44px] flex items-center justify-center p-0 leading-none">
                  </div>
            </div>
              </div>
            </div>

            {/* Mini CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center space-y-4"
            >
              <h3 className="text-text-primary text-xl md:text-2xl font-bold">
                Imate dodatna pitanja ili dileme?
              </h3>
              <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
                Besplatne konsultacije su pravo mesto da dobijete iskrene odgovore.
              </p>
              <div className="pt-2">
                <Button
                  href="#konsultacije"
                  variant="primary"
                  className="w-full md:w-auto px-8 py-3 text-base"
                >
                  Zakažite besplatne konsultacije
                </Button>
            </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Reviews Section */}
      {false && <ReviewsSection />}

      {/* FAQ Section - SEO Optimized */}
      <Section id="faq" className="relative scroll-mt-24 md:scroll-mt-28" aria-labelledby="faq">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto overflow-hidden pt-4 md:pt-6"
          >
            <SectionHeading as="h2" id="faq" className="text-center mb-20 md:mb-24">
              Najčešća pitanja o tretmanima za podmlađivanje
            </SectionHeading>
            
            <div className="space-y-10">
              <article className="card-surface rounded-3xl py-6 px-6 hover:shadow-xl transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 0}
                  aria-controls="faq-answer-0"
                  aria-label="Koliko traje jedan tretman za podmlađivanje lica?"
                >
                  <h3 
                    className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                  >
                  Koliko traje jedan tretman za podmlađivanje lica?
                </h3>
                  <span 
                    className="text-2xl md:text-3xl font-light flex-shrink-0 mt-1 transition-all duration-250 ease-out"
                    style={{ color: '#C9A24D' }}
                  >
                    {openFAQ === 0 ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  id="faq-answer-0"
                  animate={{
                    height: openFAQ === 0 ? "auto" : 0,
                    opacity: openFAQ === 0 ? 1 : 0
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words pb-2">
                  Trajanje tretmana zavisi od vrste tretmana i vaših individualnih potreba. 
                  Većina neinvazivnih tretmana traje između 40 i 60 minuta. Prilikom besplatne 
                  konsultacije u Odalis centru, detaljno ćemo razgovarati o trajanju i očekivanim 
                  rezultatima svakog tretmana, tako da možete da planirate svoj poset.
                </p>
                </motion.div>
              </article>
              
              <article className="card-surface rounded-3xl py-6 px-6 hover:shadow-xl transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 1}
                  aria-controls="faq-answer-1"
                  aria-label="Da li tretmani za podmlađivanje kože zahtevaju oporavak?"
                  type="button"
                >
                  <h3 
                    className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                  >
                  Da li tretmani za podmlađivanje kože zahtevaju oporavak?
                </h3>
                  <span 
                    className="text-2xl md:text-3xl font-light flex-shrink-0 mt-1 transition-all duration-250 ease-out"
                    style={{ color: '#C9A24D' }}
                  >
                    {openFAQ === 1 ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  id="faq-answer-1"
                  animate={{
                    height: openFAQ === 1 ? "auto" : 0,
                    opacity: openFAQ === 1 ? 1 : 0
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words pb-2">
                  Ne. Naši neinvazivni tretmani za podmlađivanje lica i tela ne zahtevaju period 
                  oporavka. Možete se odmah vratiti svom normalnom životu. Ako postoji bilo kakav 
                  blagi crvenilo ili osetljivost, to je privremeno i nestaje u roku od nekoliko sati. 
                  Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost i komfor.
                </p>
                </motion.div>
              </article>
              
              <article className="card-surface rounded-3xl py-6 px-6 hover:shadow-xl transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 2}
                  aria-controls="faq-answer-2"
                  aria-label="Da li su tretmani u Odalis centru neinvazivni i bezbedni?"
                  type="button"
                >
                  <h3 
                    className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                  >
                  Da li su tretmani u Odalis centru neinvazivni i bezbedni?
                </h3>
                  <span 
                    className="text-2xl md:text-3xl font-light flex-shrink-0 mt-1 transition-all duration-250 ease-out"
                    style={{ color: '#C9A24D' }}
                  >
                    {openFAQ === 2 ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  id="faq-answer-2"
                  animate={{
                    height: openFAQ === 2 ? "auto" : 0,
                    opacity: openFAQ === 2 ? 1 : 0
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words pb-2">
                  Da. Odalis centar koristi isključivo neinvazivne i bezbedne tretmane. Ne koristimo 
                  agresivne metode, hirurške intervencije ili bilo šta što bi moglo da ošteti vašu 
                  prirodnu strukturu kože. Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost. 
                  Svaki tretman je pažljivo osmišljen da poštuje vašu prirodnu lepotu.
                </p>
                </motion.div>
              </article>
              
              <article className="card-surface rounded-3xl py-6 px-6 hover:shadow-xl transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 3}
                  aria-controls="faq-answer-3"
                  aria-label="Koliko tretmana je potrebno za vidljive rezultate podmlađivanja?"
                  type="button"
                >
                  <h3 
                    className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                  >
                  Koliko tretmana je potrebno za vidljive rezultate podmlađivanja?
                </h3>
                  <span 
                    className="text-2xl md:text-3xl font-light flex-shrink-0 mt-1 transition-all duration-250 ease-out"
                    style={{ color: '#C9A24D' }}
                  >
                    {openFAQ === 3 ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  id="faq-answer-3"
                  animate={{
                    height: openFAQ === 3 ? "auto" : 0,
                    opacity: openFAQ === 3 ? 1 : 0
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words pb-2">
                  Broj tretmana zavisi od stanja kože, vaših želja i ciljeva. Tokom besplatne 
                  konsultacije, zajedno ćemo razgovarati o vašim očekivanjima i kreirati individualni 
                  plan koji odgovara vašim potrebama. Neki klijenti vide rezultate već posle prvog 
                  tretmana, dok drugi preferiraju seriju tretmana za optimalne rezultate.
                </p>
                </motion.div>
              </article>
              
              <article className="card-surface rounded-3xl py-6 px-6 hover:shadow-xl transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 4}
                  aria-controls="faq-answer-4"
                  aria-label="Da li će tretmani promeniti moj prirodni izgled?"
                  type="button"
                >
                  <h3 
                    className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                  >
                  Da li će tretmani promeniti moj prirodni izgled?
                </h3>
                  <span 
                    className="text-2xl md:text-3xl font-light flex-shrink-0 mt-1 transition-all duration-250 ease-out"
                    style={{ color: '#C9A24D' }}
                  >
                    {openFAQ === 4 ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  id="faq-answer-4"
                  animate={{
                    height: openFAQ === 4 ? "auto" : 0,
                    opacity: openFAQ === 4 ? 1 : 0
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words pb-2">
                  Ne. Cilj naših tretmana za podmlađivanje nije da promenimo vaš izgled, već da 
                  istaknemo vašu prirodnu lepotu. Koristimo metode koje podstiču prirodno podmlađivanje 
                  kože, poboljšavaju tonus i elastičnost, ali ne menjaju vaše prirodne karakteristike. 
                  Rezultati su prirodni i diskretni.
                </p>
                </motion.div>
              </article>
              
              <article className="card-surface rounded-3xl py-6 px-6 hover:shadow-xl transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 5}
                  aria-controls="faq-answer-5"
                  aria-label="Kolika je cena tretmana za podmlađivanje?"
                  type="button"
                >
                  <h3 
                    className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                  >
                  Kolika je cena tretmana za podmlađivanje?
                </h3>
                  <span 
                    className="text-2xl md:text-3xl font-light flex-shrink-0 mt-1 transition-all duration-250 ease-out"
                    style={{ color: '#C9A24D' }}
                  >
                    {openFAQ === 5 ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  id="faq-answer-5"
                  animate={{
                    height: openFAQ === 5 ? "auto" : 0,
                    opacity: openFAQ === 5 ? 1 : 0
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words pb-2">
                  Cena tretmana zavisi od individualnog plana koji kreiramo za vas. Pošto svaki 
                  pristup podmlađivanju je personalizovan, cene se razlikuju. Najbolji način da 
                  saznate tačnu cenu je da zakažete besplatnu konsultaciju. Tokom konsultacije, 
                  detaljno ćemo razgovarati o vašim ciljevima i definisati plan koji odgovara vašim 
                  potrebama i budžetu.
                </p>
                </motion.div>
              </article>
              
              <article className="card-surface rounded-3xl py-6 px-6 hover:shadow-xl transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 6}
                  aria-controls="faq-answer-6"
                  aria-label="Mogu li kombinovati različite tretmane za podmlađivanje?"
                  type="button"
                >
                  <h3 
                    className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                  >
                  Mogu li kombinovati različite tretmane za podmlađivanje?
                </h3>
                  <span 
                    className="text-2xl md:text-3xl font-light flex-shrink-0 mt-1 transition-all duration-250 ease-out"
                    style={{ color: '#C9A24D' }}
                  >
                    {openFAQ === 6 ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  id="faq-answer-6"
                  animate={{
                    height: openFAQ === 6 ? "auto" : 0,
                    opacity: openFAQ === 6 ? 1 : 0
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words pb-2">
                  Da. Mnogi naši klijenti kombinuju različite tretmane za optimalne rezultate. 
                  Tokom besplatne konsultacije, lično ćemo razgovarati sa vama o vašim željama i 
                  kreirati kombinovani plan koji odgovara vašim ciljevima. Možemo da planiramo 
                  tretmane za podmlađivanje lica i tela u skladu sa vašim potrebama i rasporedom.
                </p>
                </motion.div>
              </article>

              <article className="card-surface rounded-3xl py-6 px-6 hover:shadow-xl transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 7 ? null : 7)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 7}
                  aria-controls="faq-answer-7"
                  aria-label="Gde se nalazi Odalis centar?"
                  type="button"
                >
                  <h3
                    className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                  >
                    Gde se nalazi Odalis centar?
                  </h3>
                  <span
                    className="text-2xl md:text-3xl font-light flex-shrink-0 mt-1 transition-all duration-250 ease-out"
                    style={{ color: "#C9A24D" }}
                  >
                    {openFAQ === 7 ? "−" : "+"}
                  </span>
                </button>
                <motion.div
                  id="faq-answer-7"
                  animate={{
                    height: openFAQ === 7 ? "auto" : 0,
                    opacity: openFAQ === 7 ? 1 : 0
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="overflow-hidden mt-4"
                >
                  <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words pb-2">
                    Odalis je centar za podmlađivanje lica i tela i nalazi se u TC Piramida Plus u Nehruovoj 51 na Novom Beogradu. 
                  </p>
                </motion.div>
              </article>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Consultation Section */}
      <ConsultationSection />

      <Footer />
          </motion.div>
        ) : (
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen"
            data-debug="treatments-root"
          >
            {/* Treatments View */}
            <Section className="relative !pt-4" noOverlay data-debug="treatments-section">
              <section className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
                  className="max-w-7xl mx-auto space-y-12 overflow-hidden"
                >
                  {/* Back Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <button
                      onClick={handleBackToHome}
                      className="inline-flex items-center gap-2 text-text-primary hover:text-text-secondary transition-colors duration-250 ease-out focus:outline-none focus:ring-0 group"
          >
                      <svg
                        className="w-5 h-5 transition-transform duration-250 ease-out group-hover:-translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="text-lg font-light">Nazad</span>
                    </button>
                  </motion.div>

                  {/* Title */}
                  <div className="space-y-6 text-center">
                    <SectionHeading as="h1" className="max-w-[700px] mx-auto">
                      {currentView === 'treatments-face' 
                        ? 'Tretmani za podmlađivanje lica'
                        : 'Tretmani za podmlađivanje tela'
                      }
            </SectionHeading>
                  </div>

                  {/* Treatments Grid */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${currentView === 'treatments-body' ? 'lg:grid-cols-3 xl:grid-cols-5' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-6 md:gap-8`}>
                    {(currentView === 'treatments-face' ? faceTreatments : bodyTreatments).map((treatment, index) => (
                      <motion.div
                        key={treatment.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        className="group"
                      >
                        {treatment.title === "HydraFacial" ? (
                          <div
                            className="h-full cursor-pointer"
                            role="link"
                            tabIndex={0}
                            aria-label="Otvori blog: HydraFacial tretman"
                            onClick={() => router.push("/blog/hydrafacial")}
                            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                router.push("/blog/hydrafacial");
                              }
                            }}
                          >
                            <Card className="h-full overflow-hidden hover:shadow-soft hover:scale-[1.02] transition-all duration-200 ease-out !bg-transparent">
                              <div className="aspect-[4/3] bg-navy-800/30 rounded-2xl mb-6 overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-navy-800/40 to-navy-900/40 group-hover:scale-105 transition-transform duration-200 ease-out" />
                              </div>
                              <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-4 leading-tight break-words">
                                {treatment.title}
                              </h3>
                              <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                                {treatment.description}
                              </p>
                            </Card>
                          </div>
                        ) : (
                          <Card className="h-full overflow-hidden hover:shadow-soft hover:scale-[1.02] transition-all duration-200 ease-out !bg-transparent">
                          <div className="aspect-[4/3] bg-navy-800/30 rounded-2xl mb-6 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-navy-800/40 to-navy-900/40 group-hover:scale-105 transition-transform duration-200 ease-out" />
                          </div>
                          <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-4 leading-tight break-words">
                            {treatment.title}
                          </h3>
                          <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                            {treatment.description}
                          </p>
                          </Card>
                        )}
          </motion.div>
                    ))}
        </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center space-y-3 pt-8"
                  >
                    <button
                      onClick={handleConsultationClick}
                      className="btn-cta w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                    >
                      Zakažite besplatne konsultacije
                    </button>
                    <p className="text-text-muted text-sm md:text-base font-light">
                      Individualan pristup • Neinvazivni tretmani • Prirodni rezultati
                    </p>
                  </motion.div>
                </motion.div>
              </section>
      </Section>
      <ConsultationSection />
      <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
