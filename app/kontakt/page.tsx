import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";

export default function ContactPage() {
  return (
    <main className="relative z-10 w-full pt-20 md:pt-24">
      <Section className="relative pb-20 md:pb-28 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-9">
            <header className="space-y-5 text-center">
              <SectionHeading as="h1" className="mx-auto max-w-[760px]">
                Zainteresovani ste za naše tretmane?
              </SectionHeading>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-[1.85]">
                Svaka koža ima svoju priču. Recite nam šta želite da poboljšate, a naš tim će vam pomoći da pronađete tretman koji odgovara vašim potrebama.
              </p>
            </header>

            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-[#C9A24D]/20 bg-navy-900/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
