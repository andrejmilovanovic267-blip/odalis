"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { FeatureList } from "@/components/feature-list";
import { Footer } from "@/components/footer";
import { ConsultationSection } from "@/components/consultation-section";
import { scrollToSection } from "@/lib/scroll-utils";

type ViewType = 'home' | 'treatments-face' | 'treatments-body';

export default function LandingPage() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);

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
      const target = document.querySelector('#kontakt');
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
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
        title="Prirodno podmlađivanje lica i tela u centru Odalis"
        ctaText="Zakaži besplatne konsultacije"
        ctaHref="#kontakt"
        supportingText="Savetovanje bez obaveza. Razgovarajmo o vašim željama i očekivanjima."
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
            
              <div className="space-y-4 text-text-secondary text-lg md:text-xl leading-relaxed font-light break-words max-w-2xl mx-auto">
                <p>
                  Promene na koži i telu dolaze prirodno.
                </p>
                <p>
                  U Odalisu nudimo neinvazivne tretmane za prirodno, dugotrajno podmlađivanje bez pritiska.
                </p>
              </div>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Desktop: Horizontal connector line */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24D]/40 to-transparent" />
              
              <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-8 relative">
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
                  
                  <div className="text-center space-y-4 max-w-sm mx-auto">
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
                  
                  <div className="text-center space-y-4 max-w-sm mx-auto">
                    {/* Icon */}
                    <div className="flex justify-center mb-2">
                      <svg className="w-12 h-12 text-[#C9A24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-text-primary text-xl md:text-2xl font-bold leading-tight break-words">
                      Gubitak čvrstoće i promena kontura tela
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
                  
                  <div className="text-center space-y-4 max-w-sm mx-auto">
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
      <Section id="treatments" className="relative scroll-mt-[115px] md:scroll-mt-[131px] treatment-cards-unified-bg">
        {/* Hidden anchor for backward compatibility with header link */}
        <div id="tretmani" className="absolute top-0 pointer-events-none" aria-hidden="true" />
        <section className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto overflow-hidden"
          >
            <div id="tretmani-cards" className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Facial Rejuvenation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="group"
              >
                <div className="h-full flex flex-col rounded-3xl border border-blue-500/20 overflow-hidden hover:shadow-soft hover:scale-[1.01] transition-all duration-200 ease-out">
                  {/* Top Part - Image (Square) */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-200 ease-out" />
                  </div>
                  
                  {/* Bottom Part - Content (~60%) */}
                  <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-10 space-y-6">
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
                    <button
                      onClick={() => handleViewChange('treatments-face')}
                      className="inline-flex items-center justify-center rounded-lg font-light px-6 py-2.5 text-sm text-[#C9A24D] border border-[#C9A24D] bg-transparent hover:!bg-[#C9A24D] hover:!text-[#0B1F33] transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:ring-offset-2 w-full md:w-auto whitespace-nowrap cursor-pointer"
                    >
                      Svi tretmani za lice
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Body Rejuvenation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="group"
              >
                <div className="h-full flex flex-col rounded-3xl border border-blue-500/20 overflow-hidden hover:shadow-soft hover:scale-[1.01] transition-all duration-200 ease-out">
                  {/* Top Part - Image (Square) */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-200 ease-out" />
                  </div>
                  
                  {/* Bottom Part - Content (~60%) */}
                  <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-10 space-y-6">
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
                    <button
                      onClick={() => handleViewChange('treatments-body')}
                      className="inline-flex items-center justify-center rounded-lg font-light px-6 py-2.5 text-sm text-[#C9A24D] border border-[#C9A24D] bg-transparent hover:!bg-[#C9A24D] hover:!text-[#0B1F33] transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:ring-offset-2 w-full md:w-auto whitespace-nowrap cursor-pointer"
                    >
                      Svi tretmani za telo
                    </button>
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
      <Section className="relative journey-section-unified-bg">
        <section className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto space-y-12 overflow-hidden"
          >
            {/* Title and Intro */}
            <div className="space-y-6 text-center">
              <SectionHeading as="h2" className="max-w-[700px] mx-auto">
                How your journey to natural rejuvenation begins
              </SectionHeading>
              
              <div className="space-y-3 text-text-secondary text-xl md:text-2xl leading-[1.85] font-light break-words max-w-[650px] mx-auto">
                <p>
                  At Odalis, we believe that real results come from understanding — not quick fixes.
                </p>
                <p>
                  Our approach is simple, personalized, and fully adapted to you.
                </p>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-soft hover:scale-[1.02] transition-all duration-200 ease-out">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon Circle */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-navy-800/40 border border-blue-500/20 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-navy-700/50 to-navy-900/50" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#C9A24D] flex items-center justify-center text-[#0B1F33] font-bold text-sm">
                        1
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words">
                        Free consultations & understanding your needs
                      </h3>
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                        Every treatment begins with a conversation. We listen to your wishes, concerns, and expectations in order to understand what truly matters to you and your skin or body.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-soft hover:scale-[1.02] transition-all duration-200 ease-out">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon Circle */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-navy-800/40 border border-blue-500/20 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-navy-700/50 to-navy-900/50" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#C9A24D] flex items-center justify-center text-[#0B1F33] font-bold text-sm">
                        2
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words">
                        Defining goals and a personalized plan
                      </h3>
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                        Based on the consultation, we create an individual treatment plan aligned with your goals — whether it&apos;s facial rejuvenation, skin tightening, or body shaping. No universal solutions.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-soft hover:scale-[1.02] transition-all duration-200 ease-out">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon Circle */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-navy-800/40 border border-blue-500/20 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-navy-700/50 to-navy-900/50" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#C9A24D] flex items-center justify-center text-[#0B1F33] font-bold text-sm">
                        3
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-text-primary text-2xl md:text-3xl font-bold leading-tight break-words">
                        Enjoying treatments & natural results
                      </h3>
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                        Treatments are pleasant, non-invasive, and require no recovery time. Results appear gradually and naturally, enhancing your confidence and sense of well-being.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Mini CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center space-y-3 pt-4"
            >
              <Button href="#kontakt" variant="primary" className="w-full md:w-auto">
                Start your Odalis experience
              </Button>
              <p className="text-text-muted text-sm md:text-base font-light">
                No pressure • No obligation • At your own pace
              </p>
            </motion.div>
          </motion.div>
        </section>
      </Section>

      {/* Solution Section - Odalis Approach */}
      <Section id="pristup" className="relative scroll-mt-24 md:scroll-mt-28 approach-section-unified-bg">
        <section className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto space-y-12 overflow-hidden"
          >
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-text-muted text-sm md:text-base font-medium uppercase tracking-[0.15em] text-center"
              >
                NAŠ PRISTUP
              </motion.p>
              
              <SectionHeading as="h2" className="text-center mb-6 max-w-[700px] mx-auto">
                Podmlađivanje koje poštuje Vašu prirodnu lepotu
            </SectionHeading>
            
              <p className="text-text-secondary text-xl md:text-2xl leading-[1.85] font-light break-words max-w-[650px] mx-auto text-center">
                U Odalis centru ne verujemo u brza i agresivna rešenja.
                Naš pristup je nežan, neinvazivan i u potpunosti prilagođen svakoj ženi - jer podmlađivanje treba da izgleda prirodno i da se oseća dobro.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                <Card className="h-full overflow-hidden">
                  <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-5 leading-tight break-words">
                    Neinvazivni i bezbedni tretmani
                  </h3>
                  <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                    Bez igala, bez oporavka i bez rizika — samo pažljivo odabrane metode koje poštuju Vašu kožu i telo.
                  </p>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                <Card className="h-full overflow-hidden">
                  <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-5 leading-tight break-words">
                    Individualan pristup svakoj klijentici
                  </h3>
                  <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                    Svaka žena ima drugačije potrebe. Zato svaki tretman započinjemo razgovorom i planom prilagođenim baš Vama.
                  </p>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              >
                <Card className="h-full overflow-hidden">
                  <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-5 leading-tight break-words">
                    Prirodni i postepeni rezultati
                  </h3>
                  <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                    Cilj nam nije da Vas promenimo, već da istaknemo ono najbolje što već imate — diskretno i skladno.
                  </p>
                </Card>
              </motion.div>
            </div>
            
            {/* Trust Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="text-text-secondary text-xl md:text-2xl leading-[1.85] font-light break-words text-center max-w-3xl mx-auto mt-8"
            >
              Kod nas nema žurbe, pritiska niti osuđivanja - samo posvećenost, pažnja i vreme rezervisano za Vas.
            </motion.p>

            {/* Soft CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              className="flex justify-center pt-4"
            >
              <Button href="#kontakt" variant="ghost" className="w-full md:w-auto">
                Zakaži besplatne konsultacije
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </Section>

      {/* Odalis Approach - Authority Section */}
      <Section className="relative">
        <article className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-8 overflow-hidden"
          >
            <SectionHeading as="h2" className="text-center">
              Odalis pristup: podmlađivanje sa pažnjom i razumevanjem
            </SectionHeading>
            
            <div className="space-y-8 text-text-secondary text-xl md:text-2xl leading-[1.85] font-light break-words">
              <p>
                U centru Odalis verujemo da podmlađivanje lica i tela može biti individualan pristup, 
                razumevanje i vreme. Naši tretmani su osmišljeni da poštuju vašu prirodnu lepotu, 
                a ne da je menjaju.
              </p>
              
              <p>
                Naša filozofija se zasniva na bezbednosti, personalizaciji i prirodnim rezultatima. 
                Svaki tretman za podmlađivanje počinje detaljnim razgovorom gde slušamo vaše želje, 
                razumevamo vaše strahove i zajedno kreiramo plan koji odgovara vašim ciljevima.
              </p>
              
              <p>
                Fokus je na neinvazivnim tretmanima koji su bezbolni i sigurni. Ne koristimo agresivne 
                metode niti intervencije koje menjaju vaš prirodni izgled. Umesto toga, koristimo 
                savremene tehnike koje podstiču prirodno podmlađivanje kože i tkiva.
              </p>
              
              <p>
                Ambijent u Odalis centru je prijatan, topao i diskretan. Razumemo da razgovor o 
                podmlađivanju može biti osetljiv, i zato stvaramo prostor gde se možete osetiti 
                sigurno i poštovano.
              </p>
            </div>
          </motion.div>
        </article>
      </Section>

      {/* What to Expect Section */}
      <Section className="relative">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto overflow-hidden"
          >
            <SectionHeading as="h2" className="text-center mb-12">
              Šta možete očekivati od tretmana u Odalis centru
            </SectionHeading>
            
            <div className="space-y-6">
              <FeatureList items={[
                { text: "Maksimalno iskren razgovor o vašim željama, strahovima i očekivanjima" },
                { text: "Individualni plan podmlađivanja prilagođen vašim specifičnim potrebama" },
                { text: "Neinvazivne tretmane sa prirodnim rezultatima koji poštuju vašu prirodnu lepotu" },
                { text: "Prijatan, topao i diskretan ambijent gde se osećate sigurno i poštovano" },
                { text: "Postupak koji poštuje vašu prirodnu lepotu bez agresivnih intervencija" },
              ]} />
            </div>
          </motion.div>
        </div>
      </Section>

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
            <SectionHeading as="h2" id="faq" className="text-center -mt-6 md:-mt-8 mb-16">
              Najčešća pitanja o tretmanima za podmlađivanje
            </SectionHeading>
            
            <div className="space-y-10">
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 0}
                  aria-controls="faq-answer-0"
                  aria-label="Koliko traje jedan tretman za podmlađivanje lica?"
                >
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-6 leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                    style={{ 
                      background: 'linear-gradient(to bottom, #D6B45F, #C9A24D)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: openFAQ === 0 ? '#C9A24D' : undefined,
                      textShadow: openFAQ === 0 ? '0 0 6px rgba(201, 162, 77, 0.14)' : undefined
                    }}
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
                <AnimatePresence>
                  {openFAQ === 0 && (
                    <motion.div
                      key="faq-0"
                      id="faq-answer-0"
                      initial={{ opacity: 0, maxHeight: 0 }}
                      animate={{ opacity: 1, maxHeight: 1000 }}
                      exit={{ opacity: 0, maxHeight: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Trajanje tretmana zavisi od vrste tretmana i vaših individualnih potreba. 
                  Većina neinvazivnih tretmana traje između 40 i 60 minuta. Prilikom besplatne 
                  konsultacije u Odalis centru, detaljno ćemo razgovarati o trajanju i očekivanim 
                  rezultatima svakog tretmana, tako da možete da planirate svoj poset.
                </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 1}
                  aria-controls="faq-answer-1"
                  aria-label="Da li tretmani za podmlađivanje kože zahtevaju oporavak?"
                  type="button"
                >
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-6 leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                    style={{ 
                      background: 'linear-gradient(to bottom, #D6B45F, #C9A24D)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: openFAQ === 1 ? '#C9A24D' : undefined,
                      textShadow: openFAQ === 1 ? '0 0 6px rgba(201, 162, 77, 0.14)' : undefined
                    }}
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
                <AnimatePresence>
                  {openFAQ === 1 && (
                    <motion.div
                      key="faq-1"
                      id="faq-answer-1"
                      initial={{ opacity: 0, maxHeight: 0 }}
                      animate={{ opacity: 1, maxHeight: 1000 }}
                      exit={{ opacity: 0, maxHeight: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Ne. Naši neinvazivni tretmani za podmlađivanje lica i tela ne zahtevaju period 
                  oporavka. Možete se odmah vratiti svom normalnom životu. Ako postoji bilo kakav 
                  blagi crvenilo ili osetljivost, to je privremeno i nestaje u roku od nekoliko sati. 
                  Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost i komfor.
                </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 2}
                  aria-controls="faq-answer-2"
                  aria-label="Da li su tretmani u Odalis centru neinvazivni i bezbedni?"
                  type="button"
                >
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-6 leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                    style={{ 
                      background: 'linear-gradient(to bottom, #D6B45F, #C9A24D)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: openFAQ === 2 ? '#C9A24D' : undefined,
                      textShadow: openFAQ === 2 ? '0 0 6px rgba(201, 162, 77, 0.14)' : undefined
                    }}
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
                <AnimatePresence>
                  {openFAQ === 2 && (
                    <motion.div
                      key="faq-2"
                      id="faq-answer-2"
                      initial={{ opacity: 0, maxHeight: 0 }}
                      animate={{ opacity: 1, maxHeight: 1000 }}
                      exit={{ opacity: 0, maxHeight: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Da. Odalis centar koristi isključivo neinvazivne i bezbedne tretmane. Ne koristimo 
                  agresivne metode, hirurške intervencije ili bilo šta što bi moglo da ošteti vašu 
                  prirodnu strukturu kože. Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost. 
                  Svaki tretman je pažljivo osmišljen da poštuje vašu prirodnu lepotu.
                </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 3}
                  aria-controls="faq-answer-3"
                  aria-label="Koliko tretmana je potrebno za vidljive rezultate podmlađivanja?"
                  type="button"
                >
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-6 leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                    style={{ 
                      background: 'linear-gradient(to bottom, #D6B45F, #C9A24D)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: openFAQ === 3 ? '#C9A24D' : undefined,
                      textShadow: openFAQ === 3 ? '0 0 6px rgba(201, 162, 77, 0.14)' : undefined
                    }}
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
                <AnimatePresence>
                  {openFAQ === 3 && (
                    <motion.div
                      key="faq-3"
                      id="faq-answer-3"
                      initial={{ opacity: 0, maxHeight: 0 }}
                      animate={{ opacity: 1, maxHeight: 1000 }}
                      exit={{ opacity: 0, maxHeight: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Broj tretmana zavisi od stanja kože, vaših želja i ciljeva. Tokom besplatne 
                  konsultacije, zajedno ćemo razgovarati o vašim očekivanjima i kreirati individualni 
                  plan koji odgovara vašim potrebama. Neki klijenti vide rezultate već posle prvog 
                  tretmana, dok drugi preferiraju seriju tretmana za optimalne rezultate.
                </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 4}
                  aria-controls="faq-answer-4"
                  aria-label="Da li će tretmani promeniti moj prirodni izgled?"
                  type="button"
                >
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-6 leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                    style={{ 
                      background: 'linear-gradient(to bottom, #D6B45F, #C9A24D)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: openFAQ === 4 ? '#C9A24D' : undefined,
                      textShadow: openFAQ === 4 ? '0 0 6px rgba(201, 162, 77, 0.14)' : undefined
                    }}
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
                <AnimatePresence>
                  {openFAQ === 4 && (
                    <motion.div
                      key="faq-4"
                      id="faq-answer-4"
                      initial={{ opacity: 0, maxHeight: 0 }}
                      animate={{ opacity: 1, maxHeight: 1000 }}
                      exit={{ opacity: 0, maxHeight: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Ne. Cilj naših tretmana za podmlađivanje nije da promenimo vaš izgled, već da 
                  istaknemo vašu prirodnu lepotu. Koristimo metode koje podstiču prirodno podmlađivanje 
                  kože, poboljšavaju tonus i elastičnost, ali ne menjaju vaše prirodne karakteristike. 
                  Rezultati su prirodni i diskretni.
                </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 5}
                  aria-controls="faq-answer-5"
                  aria-label="Kolika je cena tretmana za podmlađivanje?"
                  type="button"
                >
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-6 leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                    style={{ 
                      background: 'linear-gradient(to bottom, #D6B45F, #C9A24D)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: openFAQ === 5 ? '#C9A24D' : undefined,
                      textShadow: openFAQ === 5 ? '0 0 6px rgba(201, 162, 77, 0.14)' : undefined
                    }}
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
                <AnimatePresence>
                  {openFAQ === 5 && (
                    <motion.div
                      key="faq-5"
                      id="faq-answer-5"
                      initial={{ opacity: 0, maxHeight: 0 }}
                      animate={{ opacity: 1, maxHeight: 1000 }}
                      exit={{ opacity: 0, maxHeight: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Cena tretmana zavisi od individualnog plana koji kreiramo za vas. Pošto svaki 
                  pristup podmlađivanju je personalizovan, cene se razlikuju. Najbolji način da 
                  saznate tačnu cenu je da zakažete besplatnu konsultaciju. Tokom konsultacije, 
                  detaljno ćemo razgovarati o vašim ciljevima i definisati plan koji odgovara vašim 
                  potrebama i budžetu.
                </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-250 ease-out overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
                  className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none focus:ring-0 border-none ring-0 rounded-lg p-2 -m-2"
                  aria-expanded={openFAQ === 6}
                  aria-controls="faq-answer-6"
                  aria-label="Mogu li kombinovati različite tretmane za podmlađivanje?"
                  type="button"
                >
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-6 leading-tight break-words flex-1 transition-all duration-250 ease-out group-hover:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)] group-focus:drop-shadow-[0_0_4px_rgba(201,162,77,0.09)]"
                    style={{ 
                      background: 'linear-gradient(to bottom, #D6B45F, #C9A24D)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: openFAQ === 6 ? '#C9A24D' : undefined,
                      textShadow: openFAQ === 6 ? '0 0 6px rgba(201, 162, 77, 0.14)' : undefined
                    }}
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
                <AnimatePresence>
                  {openFAQ === 6 && (
                    <motion.div
                      key="faq-6"
                      id="faq-answer-6"
                      initial={{ opacity: 0, maxHeight: 0 }}
                      animate={{ opacity: 1, maxHeight: 1000 }}
                      exit={{ opacity: 0, maxHeight: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Da. Mnogi naši klijenti kombinuju različite tretmane za optimalne rezultate. 
                  Tokom besplatne konsultacije, lično ćemo razgovarati sa vama o vašim željama i 
                  kreirati kombinovani plan koji odgovara vašim ciljevima. Možemo da planiramo 
                  tretmane za podmlađivanje lica i tela u skladu sa vašim potrebama i rasporedom.
                </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          >
            {/* Treatments View */}
            <Section className="relative">
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
                    className="pt-8"
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
                        <Card className="h-full overflow-hidden hover:shadow-soft hover:scale-[1.02] transition-all duration-200 ease-out">
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
                      className="inline-flex items-center justify-center rounded-lg font-light px-6 py-2.5 text-sm text-[#C9A24D] border border-[#C9A24D] bg-transparent hover:bg-[#C9A24D] hover:text-[#0B1F33] transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none w-full md:w-auto whitespace-nowrap"
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
      <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
