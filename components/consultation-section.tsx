"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { ConsultationForm } from "@/components/consultation-form";

export function ConsultationSection() {
  return (
    <Section id="konsultacije" className="relative pb-20 md:pb-28 lg:pb-32 before:content-none scroll-mt-24 md:scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-6 pb-6 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-6 text-center">
            <SectionHeading as="h2" className="max-w-[700px] mx-auto">
              Kontaktirajte nas
            </SectionHeading>
            <p className="text-text-secondary text-lg md:text-xl leading-[1.85] break-words max-w-[600px] mx-auto">
              Imate pitanje ili želite više informacija o tretmanima? Pošaljite nam upit i naš tim će vam odgovoriti u najkraćem roku.
            </p>
          </div>

          <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-navy-900/20 p-5 backdrop-blur-sm sm:p-8">
            <ConsultationForm showAnimations={true} />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
