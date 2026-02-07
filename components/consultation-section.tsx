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
          className="max-w-2xl mx-auto space-y-8"
        >
          {/* Heading */}
          <div className="space-y-6 text-center">
            <SectionHeading as="h2" className="max-w-[700px] mx-auto">
              Besplatne konsultacije u Odalis centru
            </SectionHeading>
            
            {/* Intro text */}
            <p className="text-text-secondary text-lg md:text-xl leading-[1.85] break-words max-w-[600px] mx-auto">
              Bilo da imate konkretno pitanje ili želite stručno mišljenje, naše besplatne konsultacije pomažu vam da saznate koji tretmani su najbolji za vaše lice ili telo — prirodno, diskretno i bez ikakve obaveze. Konsultacije se obavljaju u Odalis centru u Beogradu.
            </p>
          </div>

          {/* Form */}
          <ConsultationForm 
            calendlyContainerId="calendly-container"
            showAnimations={true}
          />
        </motion.div>
      </div>
    </Section>
  );
}
