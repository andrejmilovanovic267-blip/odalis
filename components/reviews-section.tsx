"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

const reviews = [
  {
    rating: 5,
    headline: "Najbolji tretman koji sam ikada probala",
    text: "HydraFacial u Odalis centru je nešto što svaka žena treba da iskusi. Koža mi je posle prvog tretmana izgledala osveženo i blistavo. Najbolje od svega je što nema oporavka i mogu odmah da nastavim sa normalnim danom.",
    client: "Milica P.",
    age: 36,
    treatment: "HydraFacial",
    verified: true,
    image: "/reviews/review-1.jpg",
  },
  {
    rating: 5,
    headline: "Prirodni rezultati bez agresivnih metoda",
    text: "Nakon nekoliko tretmana Indiba, primetila sam da je koža na licu postala čvršća i elastičnija. Rezultati su dolazili postepeno, što mi je odgovaralo. Tretmani su prijatni i opuštajući.",
    client: "Jelena M.",
    age: 31,
    treatment: "Indiba",
    verified: true,
    image: "/reviews/review-2.jpg",
  },
  {
    rating: 5,
    headline: "Iskren pristup i stručno vođenje",
    text: "Besplatne konsultacije su bile ključne za moju odluku. Razgovor je bio iskren, bez pritiska, i dobila sam jasne preporuke koje su odgovarale mom stanju kože. Preporučujem svima.",
    client: "Ana K.",
    age: 42,
    treatment: "Konsultacije",
    verified: true,
    image: "/reviews/review-3.jpg",
  },
  {
    rating: 5,
    headline: "Endosfera je promenila moj stav o nezi",
    text: "Tretmani Endosfera su postali deo moje rutine nege. Osećam se opušteno, koža je glatka i tonizirana. Ambijent u Odalis centru je diskretan i prijatan.",
    client: "Snežana R.",
    age: 38,
    treatment: "Endosfera",
    verified: true,
    image: "/reviews/review-4.jpg",
  },
  {
    rating: 5,
    headline: "Radiotalasni lifting — vidljivi rezultati",
    text: "Posle serije tretmana radiotalasnog liftinga, koža na licu i vratu je postala zategnutija. Rezultati su prirodni i trajni. Stručan tim i individualan pristup su ono što čini razliku.",
    client: "Marija D.",
    age: 41,
    treatment: "Radiotalasni lifting",
    verified: true,
    image: "/reviews/review-5.jpg",
  },
  {
    rating: 5,
    headline: "Poverenje i profesionalnost na prvom mestu",
    text: "Odalis centar je mesto gde se osećam sigurno i poštovano. Tretmani su bezbedni, rezultati prirodni, a pristup iskren. Ne bih promenila ništa.",
    client: "Tijana S.",
    age: 34,
    treatment: "Indiba",
    verified: true,
    image: "/reviews/review-6.jpg",
  },
];

export function ReviewsSection() {
  return (
    <>
      {/* JSON-LD Schema for Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Odalis centar",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "120",
            },
            "review": reviews.map((review) => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.client,
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
              },
              "reviewBody": review.text,
            })),
          }),
        }}
      />

      <Section className="relative" id="reviews">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-8 md:mb-12"
            >
              <p className="text-text-muted text-sm md:text-base font-medium uppercase tracking-[0.15em] mb-4">
                ISKUSTVA KLIJENTKINJA
              </p>
              <SectionHeading as="h2" id="reviews-heading" className="text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
                Recenzije koje najviše govore o rezultatima
              </SectionHeading>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                Neinvazivni tretmani u Odalis centru donose prirodne rezultate podmlađivanja lica i tela.
                Iskustva naših klijentkinja govore o bezbednosti, individualnom pristupu i postepenim, trajnim rezultatima.
              </p>
              <p className="text-text-muted text-sm md:text-base font-light">
                Diskretno • Bez pritiska • Prirodno
              </p>
            </motion.div>

            {/* Reviews Cards - Mobile: Horizontal Scroll */}
            <div className="md:hidden relative">
              <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 pb-4">
                <div className="flex gap-4" style={{ width: "max-content" }}>
                  {reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="w-[85vw] max-w-sm flex-shrink-0 snap-start"
                    >
                      <div className="bg-white/5 border border-[rgba(201,162,76,0.25)] rounded-2xl overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-200">
                        {/* Image */}
                        <div className="relative w-full h-[170px]">
                          <Image
                            src={review.image}
                            alt="Rezultat tretmana – prirodno podmlađivanje kože"
                            fill
                            sizes="(max-width: 768px) 85vw, 33vw"
                            className="object-cover object-center rounded-t-2xl"
                          />
                          {/* Subtle dark overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent rounded-t-2xl pointer-events-none" />
                        </div>
                        <div className="p-6">
                          {/* Headline */}
                          <h3 className="text-text-primary text-lg font-bold mb-3 leading-tight">
                            {review.headline}
                          </h3>
                          {/* Review text */}
                          <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            {review.text}
                          </p>
                          {/* Treatment tag */}
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-[rgba(201,162,76,0.15)] text-[#C9A24D] text-xs font-light border border-[rgba(201,162,76,0.3)]">
                              {review.treatment}
                            </span>
                          </div>
                          {/* Client info */}
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-text-primary text-sm font-medium truncate">
                              {review.client}, {review.age}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Swipe hint gradient */}
              <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-navy-950 to-transparent pointer-events-none" />
            </div>

            {/* Desktop: 3 Column Grid - Centered */}
            <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative z-0 hover:z-10 w-full"
                >
                  <div className="bg-white/5 border border-[rgba(201,162,76,0.25)] rounded-2xl overflow-hidden h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform">
                    {/* Image */}
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={review.image}
                        alt="Rezultat tretmana – prirodno podmlađivanje kože"
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center rounded-t-2xl"
                      />
                      {/* Subtle dark overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent rounded-t-2xl pointer-events-none" />
                    </div>
                    <div className="p-6">
                      {/* Headline */}
                      <h3 className="text-text-primary text-lg font-bold mb-3 leading-tight">
                        {review.headline}
                      </h3>
                      {/* Review text */}
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {review.text}
                      </p>
                      {/* Treatment tag */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-[rgba(201,162,76,0.15)] text-[#C9A24D] text-xs font-light border border-[rgba(201,162,76,0.3)]">
                          {review.treatment}
                        </span>
                      </div>
                      {/* Client info */}
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-text-primary text-sm font-medium truncate">
                          {review.client}, {review.age}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
