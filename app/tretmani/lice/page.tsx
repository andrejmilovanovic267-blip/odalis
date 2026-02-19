import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/section";
import { Button } from "@/ui/button";
import { faceTreatments } from "@/lib/treatmentsIndex";

// Featured treatments for face (in exact order)
const featuredFaceSlugs = [
  "dermapen-tretman-u-odalisu",
  "hydrafacial",
  "indiba-tretman-lica-u-odalisu",
  "led-maska-za-lice-u-odalisu",
  "radiotalasni-lifting-lica-u-odalisu",
  "ultrazvucni-tretman-lica-u-odalisu",
];

const featuredFaceOrder = new Map(
  featuredFaceSlugs.map((slug, index) => [slug, index])
);

// Base URL for absolute canonical URLs
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://odalis.rs";

export const metadata: Metadata = {
  title: "Tretmani za podmlađivanje lica | Odalis Novi Beograd",
  description:
    "Neinvazivni tretmani za podmlađivanje lica u Odalis centru na Novom Beogradu. HydraFacial, Dermapen, Indiba, Radiotalasni lifting i drugi tretmani za prirodno podmlađivanje kože.",
  alternates: {
    canonical: "/tretmani/lice",
  },
  openGraph: {
    url: "/tretmani/lice",
    title: "Tretmani za podmlađivanje lica | Odalis Novi Beograd",
    description:
      "Neinvazivni tretmani za podmlađivanje lica u Odalis centru na Novom Beogradu. HydraFacial, Dermapen, Indiba, Radiotalasni lifting i drugi tretmani za prirodno podmlađivanje kože.",
  },
};

export default function FaceTreatmentsPage() {
  // Separate featured and other treatments
  const featuredSlugsSet = new Set(featuredFaceSlugs);
  
  const featured = faceTreatments
    .filter((t) => featuredSlugsSet.has(t.slug))
    .sort((a, b) => {
      const aIndex = featuredFaceOrder.get(a.slug) ?? Infinity;
      const bIndex = featuredFaceOrder.get(b.slug) ?? Infinity;
      return aIndex - bIndex;
    });

  const others = faceTreatments
    .filter((t) => !featuredSlugsSet.has(t.slug))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Warn in dev if featured slugs are missing
  if (process.env.NODE_ENV === "development") {
    const foundSlugs = new Set(featured.map((t) => t.slug));
    const missingSlugs = featuredFaceSlugs.filter((slug) => !foundSlugs.has(slug));
    if (missingSlugs.length > 0) {
      console.warn(
        `[treatmentsIndex] Missing featured face treatment slugs:`,
        missingSlugs
      );
    }
  }

  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      {/* Hero Section */}
      <Section className="relative">
        {/* Back Navigation - Top left corner */}
        <Link
          href="/"
          className="absolute left-4 top-10 md:left-8 md:top-14 z-20 inline-flex items-center gap-2 text-white/90 hover:text-[#C9A24D] transition-colors duration-200 hover:-translate-x-1 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:ring-offset-2 focus:ring-offset-navy-900 rounded-sm"
          aria-label="Nazad na početnu"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-medium">Nazad</span>
        </Link>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <SectionHeading as="h1" className="max-w-[900px] mx-auto">
              Tretmani za podmlađivanje lica
            </SectionHeading>

            <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto break-words">
              Neinvazivni tretmani za svežiju, zategnutiju i blistaviju kožu. U Odalis centru na Novom Beogradu nudimo profesionalne tretmane koji podržavaju prirodne procese regeneracije kože bez agresivnih metoda.
            </p>

            <div className="pt-4">
              <Button href="#konsultacije" variant="primary">
                Zakaži konsultacije
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Treatments Grid */}
      <Section className="relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((treatment) => (
              <Link key={treatment.slug} href={treatment.href} className="group">
                <article className="card-surface rounded-3xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-navy-800/40 via-navy-700/30 to-navy-900/50">
                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-[#C9A24D] border border-[#C9A24D]/30 bg-[#C9A24D]/10 rounded-full">
                        {treatment.badge}
                      </span>
                    </div>

                    <h3 className="text-text-primary text-lg font-bold mb-3 leading-tight line-clamp-2 group-hover:opacity-90 transition-opacity duration-250 motion-reduce:transition-none">
                      {treatment.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed font-light line-clamp-3 mb-4 flex-1">
                      {treatment.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/10">
                      <span className="text-[#C9A24D] text-sm font-medium group-hover:underline">
                        Saznaj više →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Other Treatments Section */}
      {others.length > 0 && (
        <Section className="relative mt-12 md:mt-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
              Drugi su čitali i
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {others.map((treatment) => (
                <Link key={treatment.slug} href={treatment.href} className="group">
                  <article className="card-surface rounded-3xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    {/* Thumbnail */}
                    <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-navy-800/40 via-navy-700/30 to-navy-900/50">
                      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-[#C9A24D] border border-[#C9A24D]/30 bg-[#C9A24D]/10 rounded-full">
                          {treatment.badge}
                        </span>
                      </div>

                      <h3 className="text-text-primary text-lg font-bold mb-3 leading-tight line-clamp-2 group-hover:opacity-90 transition-opacity duration-250 motion-reduce:transition-none">
                        {treatment.title}
                      </h3>

                      <p className="text-text-secondary text-sm leading-relaxed font-light line-clamp-3 mb-4 flex-1">
                        {treatment.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/10">
                        <span className="text-[#C9A24D] text-sm font-medium group-hover:underline">
                          Saznaj više →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </main>
  );
}
