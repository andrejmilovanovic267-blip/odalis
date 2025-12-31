"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { FeatureList } from "@/components/feature-list";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      {/* Hero Section - H1 with primary keyword */}
      <Hero
        eyebrow="Centar za podmlađivanje lica i tela"
        title="Prirodno podmlađivanje lica i tela u centru Odalis"
        ctaText="Zakažite besplatne konsultacije"
        ctaHref="/site"
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
      <Section className="relative">
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
                transition={{ duration: 0.6, delay: 0.2 }}
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
                transition={{ duration: 0.6, delay: 0.3 }}
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
                transition={{ duration: 0.6, delay: 0.4 }}
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
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-text-secondary text-xl md:text-2xl leading-[1.85] font-light break-words text-center max-w-3xl mx-auto mt-8"
            >
              Kod nas nema žurbe, pritiska niti osuđivanja - samo posvećenost, pažnja i vreme rezervisano za Vas.
            </motion.p>

            {/* Soft CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center pt-4"
            >
              <Button href="/site" variant="ghost" className="w-full md:w-auto">
                Započnite besplatnim konsultacijama
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </Section>

      {/* Common Desires Section */}
      <Section className="relative">
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
      <Section className="relative" aria-labelledby="faq">
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
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-500 overflow-hidden">
                <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 leading-tight break-words">
                  Koliko traje jedan tretman za podmlađivanje lica?
                </h3>
                <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Trajanje tretmana zavisi od vrste tretmana i vaših individualnih potreba. 
                  Većina neinvazivnih tretmana traje između 40 i 60 minuta. Prilikom besplatne 
                  konsultacije u Odalis centru, detaljno ćemo razgovarati o trajanju i očekivanim 
                  rezultatima svakog tretmana, tako da možete da planirate svoj poset.
                </p>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-500 overflow-hidden">
                <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 leading-tight break-words">
                  Da li tretmani za podmlađivanje kože zahtevaju oporavak?
                </h3>
                <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Ne. Naši neinvazivni tretmani za podmlađivanje lica i tela ne zahtevaju period 
                  oporavka. Možete se odmah vratiti svom normalnom životu. Ako postoji bilo kakav 
                  blagi crvenilo ili osetljivost, to je privremeno i nestaje u roku od nekoliko sati. 
                  Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost i komfor.
                </p>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-500 overflow-hidden">
                <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 leading-tight break-words">
                  Da li su tretmani u Odalis centru neinvazivni i bezbedni?
                </h3>
                <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Da. Odalis centar koristi isključivo neinvazivne i bezbedne tretmane. Ne koristimo 
                  agresivne metode, hirurške intervencije ili bilo šta što bi moglo da ošteti vašu 
                  prirodnu strukturu kože. Fokus je na prirodnom podmlađivanju uz maksimalnu sigurnost. 
                  Svaki tretman je pažljivo osmišljen da poštuje vašu prirodnu lepotu.
                </p>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-500 overflow-hidden">
                <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 leading-tight break-words">
                  Koliko tretmana je potrebno za vidljive rezultate podmlađivanja?
                </h3>
                <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Broj tretmana zavisi od stanja kože, vaših želja i ciljeva. Tokom besplatne 
                  konsultacije, zajedno ćemo razgovarati o vašim očekivanjima i kreirati individualni 
                  plan koji odgovara vašim potrebama. Neki klijenti vide rezultate već posle prvog 
                  tretmana, dok drugi preferiraju seriju tretmana za optimalne rezultate.
                </p>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-500 overflow-hidden">
                <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 leading-tight break-words">
                  Da li će tretmani promeniti moj prirodni izgled?
                </h3>
                <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Ne. Cilj naših tretmana za podmlađivanje nije da promenimo vaš izgled, već da 
                  istaknemo vašu prirodnu lepotu. Koristimo metode koje podstiču prirodno podmlađivanje 
                  kože, poboljšavaju tonus i elastičnost, ali ne menjaju vaše prirodne karakteristike. 
                  Rezultati su prirodni i diskretni.
                </p>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-500 overflow-hidden">
                <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 leading-tight break-words">
                  Kolika je cena tretmana za podmlađivanje?
                </h3>
                <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Cena tretmana zavisi od individualnog plana koji kreiramo za vas. Pošto svaki 
                  pristup podmlađivanju je personalizovan, cene se razlikuju. Najbolji način da 
                  saznate tačnu cenu je da zakažete besplatnu konsultaciju. Tokom konsultacije, 
                  detaljno ćemo razgovarati o vašim ciljevima i definisati plan koji odgovara vašim 
                  potrebama i budžetu.
                </p>
              </article>
              
              <article className="glass-premium rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-navy-800/15 transition-all duration-500 overflow-hidden">
                <h3 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 leading-tight break-words">
                  Mogu li kombinovati različite tretmane za podmlađivanje?
                </h3>
                <p className="text-text-secondary text-lg md:text-xl leading-[1.85] font-light break-words">
                  Da. Mnogi naši klijenti kombinuju različite tretmane za optimalne rezultate. 
                  Tokom besplatne konsultacije, lično ćemo razgovarati sa vama o vašim željama i 
                  kreirati kombinovani plan koji odgovara vašim ciljevima. Možemo da planiramo 
                  tretmane za podmlađivanje lica i tela u skladu sa vašim potrebama i rasporedom.
                </p>
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
            <Button href="/site" variant="primary" className="mx-auto">
              Upoznajte Odalis pristup
            </Button>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
