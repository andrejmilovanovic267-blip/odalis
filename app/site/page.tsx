"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/ui/card";
import { Footer } from "@/components/footer";

export default function SitePage() {
  return (
    <main className="relative z-10">
      {/* Hero Section */}
      <Hero
        title="Dobrodošli u Odalis"
        ctaText="Kontaktirajte nas"
        ctaHref="#contact"
        imageSrc=""
        imageAlt="Odalis center"
      />

      {/* Naši tretmani Section */}
      <Section className="relative">
        <div className="absolute inset-0 bg-navy-950/20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <SectionHeading className="text-center mb-12">
              Naši tretmani
            </SectionHeading>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="space-y-4">
                      <div className="h-48 bg-navy-800/40 rounded-xl"></div>
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Zašto Odalis Section */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-800/30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <SectionHeading className="text-center mb-12">
              Zašto Odalis
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item * 0.1 }}
                >
                  <Card>
                    <div className="space-y-3">
                      <div className="h-6 bg-white/10 rounded w-2/3"></div>
                      <div className="h-4 bg-white/10 rounded w-full"></div>
                      <div className="h-4 bg-white/10 rounded w-5/6"></div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

