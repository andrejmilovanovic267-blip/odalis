"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { FeatureList } from "@/components/feature-list";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      {/* Hero Section - H1 with primary keyword */}
      <Hero
        eyebrow="Centar za podmlađivanje lica i tela"
        title="Prirodno podmlađivanje lica i tela u centru Odalis"
        ctaText="Zakaži besplatne konsultacije"
        ctaHref="#kontakt"
        supportingText="Savetovanje bez obaveza. Razgovarajmo o vašim željama i očekivanjima."
        imageSrc=""
        imageAlt="Žena koja koristi neinvazivne tretmane za podmlađivanje lica"
      />

      {/* Problem Section */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800/25 via-transparent to-transparent pointer-events-none" />
        <section className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto space-y-8 overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-text-muted text-sm md:text-base font-medium uppercase tracking-[0.15em] text-center"
            >
              ODALIS · CENTAR ZA PODMLAĐIVANJE
            </motion.p>
            
            <SectionHeading as="h2" className="text-center mb-8 max-w-[700px] mx-auto">
              Kada osećaj u ogledalu više ne prati kako se osećate iznutra
            </SectionHeading>
            
            <div className="space-y-6 text-text-secondary text-xl md:text-2xl leading-[1.85] font-light break-words max-w-[600px] mx-auto">
              <p>
                Vremenom, lice i telo se menjaju na suptilan način.
                Koža gubi svežinu, tonus i sjaj, a tragovi umora postaju vidljiviji nego ranije.
              </p>
              
              <p>
                To ne znači da ste izgubili lepotu.
                To samo znači da Vašoj koži i telu sada treba pažnja koja je nežna, stručna i prilagođena baš Vama.
              </p>
            </div>
          </motion.div>
        </section>
      </Section>

      {/* Solution Section - Odalis Approach */}
      <Section id="pristup" className="relative scroll-mt-24 md:scroll-mt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/20 to-transparent pointer-events-none" />
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

      {/* Common Desires Section */}
      <Section id="tretmani" className="relative scroll-mt-24 md:scroll-mt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto overflow-hidden"
          >
            <SectionHeading as="h2" className="text-center mb-12">
              Najčešće želje žena koje razmišljaju o podmlađivanju
            </SectionHeading>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full overflow-hidden">
                  <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-5 leading-tight break-words">
                    Podmlađivanje lica
                  </h3>
                  <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                    Da lice izgleda mladje i svežije, sa prirodnim sjajem i elastičnošću kože. 
                    Neinvazivni tretmani protiv bora mogu da pomognu bez agresivnih metoda.
                  </p>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full overflow-hidden">
                  <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-5 leading-tight break-words">
                    Negovanje kože
                  </h3>
                  <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                    Da koža povrati prirodan sjaj i elastičnost kroz savremene tretmane 
                    koji poštuju prirodnu strukturu kože i njen individualni karakter.
                  </p>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full overflow-hidden">
                  <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-5 leading-tight break-words">
                    Samopouzdanje
                  </h3>
                  <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                    Da se osećaju negovano i samopouzdano, sa osećajem da su uložile 
                    u sebe na način koji odgovara njihovim vrednostima i očekivanjima.
                  </p>
                </Card>
              </motion.div>
            </div>
            
            <p className="text-text-secondary text-center text-xl md:text-2xl mt-12 leading-[1.85] font-light break-words">
              Želja za prirodnim podmlađivanjem je prirodna i opravdana. 
              Važno je pronaći pristup koji poštuje vašu prirodnu lepotu.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Odalis Approach - Authority Section */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/30 to-transparent pointer-events-none" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/15 to-transparent pointer-events-none" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto overflow-hidden"
          >
            <SectionHeading as="h2" id="faq" className="text-center mb-12">
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
                {openFAQ === 0 && (
                  <motion.p
                    id="faq-answer-0"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words"
                  >
                    Trajanje tretmana zavisi od vrste tretmana i vaših individualnih potreba. 
                    Većina neinvazivnih tretmana traje između 40 i 60 minuta. Prilikom besplatne 
                    konsultacije u Odalis centru, detaljno ćemo razgovarati o trajanju i očekivanim 
                    rezultatima svakog tretmana, tako da možete da planirate svoj poset.
                  </motion.p>
                )}
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
                {openFAQ === 1 && (
                  <motion.p
                    id="faq-answer-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words"
                  >
                    Ne. Naši neinvazivni tretmani za podmlađivanje lica i tela ne zahtevaju period 
                    oporavka. Možete se odmah vratiti svom normalnom životu. Ako postoji bilo kakav 
                    blagi crvenilo ili osetljivost, to je privremeno i nestaje u roku od nekoliko sati. 
                    Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost i komfor.
                  </motion.p>
                )}
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
                {openFAQ === 2 && (
                  <motion.p
                    id="faq-answer-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words"
                  >
                    Da. Odalis centar koristi isključivo neinvazivne i bezbedne tretmane. Ne koristimo 
                    agresivne metode, hirurške intervencije ili bilo šta što bi moglo da ošteti vašu 
                    prirodnu strukturu kože. Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost. 
                    Svaki tretman je pažljivo osmišljen da poštuje vašu prirodnu lepotu.
                  </motion.p>
                )}
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
                {openFAQ === 3 && (
                  <motion.p
                    id="faq-answer-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words"
                  >
                    Broj tretmana zavisi od stanja kože, vaših želja i ciljeva. Tokom besplatne 
                    konsultacije, zajedno ćemo razgovarati o vašim očekivanjima i kreirati individualni 
                    plan koji odgovara vašim potrebama. Neki klijenti vide rezultate već posle prvog 
                    tretmana, dok drugi preferiraju seriju tretmana za optimalne rezultate.
                  </motion.p>
                )}
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
                {openFAQ === 4 && (
                  <motion.p
                    id="faq-answer-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words"
                  >
                    Ne. Cilj naših tretmana za podmlađivanje nije da promenimo vaš izgled, već da 
                    istaknemo vašu prirodnu lepotu. Koristimo metode koje podstiču prirodno podmlađivanje 
                    kože, poboljšavaju tonus i elastičnost, ali ne menjaju vaše prirodne karakteristike. 
                    Rezultati su prirodni i diskretni.
                  </motion.p>
                )}
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
                {openFAQ === 5 && (
                  <motion.p
                    id="faq-answer-5"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words"
                  >
                    Cena tretmana zavisi od individualnog plana koji kreiramo za vas. Pošto svaki 
                    pristup podmlađivanju je personalizovan, cene se razlikuju. Najbolji način da 
                    saznate tačnu cenu je da zakažete besplatnu konsultaciju. Tokom konsultacije, 
                    detaljno ćemo razgovarati o vašim ciljevima i definisati plan koji odgovara vašim 
                    potrebama i budžetu.
                  </motion.p>
                )}
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
                {openFAQ === 6 && (
                  <motion.p
                    id="faq-answer-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words"
                  >
                    Da. Mnogi naši klijenti kombinuju različite tretmane za optimalne rezultate. 
                    Tokom besplatne konsultacije, lično ćemo razgovarati sa vama o vašim željama i 
                    kreirati kombinovani plan koji odgovara vašim ciljevima. Možemo da planiramo 
                    tretmane za podmlađivanje lica i tela u skladu sa vašim potrebama i rasporedom.
                  </motion.p>
                )}
              </article>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/25 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-8 overflow-hidden"
          >
            <SectionHeading as="h2">
              Spremni da započnete putovanje ka prirodnom podmlađivanju?
            </SectionHeading>
            <p className="text-text-secondary text-xl md:text-2xl leading-[1.85] font-light max-w-2xl mx-auto break-words">
              Zakažite besplatnu konsultaciju i razgovarajmo o vašim željama i očekivanjima. 
              Bez obaveza, samo iskren razgovor.
            </p>
            <Button href="#kontakt" variant="primary" className="mx-auto">
              Zakaži besplatne konsultacije
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section id="kontakt" className="relative scroll-mt-24 md:scroll-mt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/20 to-transparent pointer-events-none" />
        <section className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[520px] mx-auto space-y-8 overflow-hidden"
          >
            <div className="space-y-6 text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-text-muted text-sm md:text-base font-medium uppercase tracking-[0.15em]"
              >
                KONTAKT
              </motion.p>
              
              <SectionHeading as="h2" className="mb-6">
                Započnite sa besplatnim konsultacijama
              </SectionHeading>
              
              <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                Ostavite svoje podatke i javićemo Vam se kako bismo zajedno pronašli najbolje rešenje za Vas - bez obaveza i bez pritiska.
              </p>
            </div>

            <ContactForm />
          </motion.div>
        </section>
      </Section>

      <Footer />
    </main>
  );
}
