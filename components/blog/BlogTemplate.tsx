import Link from "next/link";
import { Footer } from "@/components/footer";
import { Droplets, Check } from "lucide-react";
import { ConsultationForm } from "@/components/consultation-form";
import { BlogContainer } from "@/components/blog/blog-container";
import { getListType, BlogList, BlogListItem } from "@/components/blog/blog-list";
import { validateTemplateSections, logValidationWarnings } from "@/lib/validateTemplate";
import { BlogBackButton } from "@/components/blog/blog-back-button";
import type { BlogPost } from "@/app/blog/posts";

type BlogTemplateProps = {
  post: BlogPost | null;
  title: string;
  readingTime: number;
};

// Calculate reading time from content
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function BlogTemplate({ post, title, readingTime }: BlogTemplateProps) {
  // Template Section Mapping (for validation and documentation)
  // This maps JSX sections to BLOG_TEMPLATE_SECTIONS schema IDs:
  // - "hero" -> Hero section with placeholder
  // - "breadcrumb" -> Breadcrumb navigation
  // - "intro" -> Intro section
  // - Dynamic sections from post.sections map to schema IDs:
  //   * "sta-je-hydrafacial-tretman" -> "whatIs"
  //   * "kako-izgleda-tretman-u-praksi" -> "inPractice"
  //   * "kome-je-hydrafacial-namenjen" -> "forWhom"
  //   * "koji-su-benefiti-hydrafacial-tretmana" -> "benefits"
  //   * "koliko-cesto-se-radi-hydrafacial" -> "frequency"
  //   * Other sections -> "additionalContent"
  // - "ctaConsultations" -> Consultation form section

  // Template validation (dev mode only)
  if (process.env.NODE_ENV !== "production" && post) {
    const sectionIdMap: Record<string, string> = {
      "sta-je-hydrafacial-tretman": "whatIs",
      "kako-izgleda-tretman-u-praksi": "inPractice",
      "kome-je-hydrafacial-namenjen": "forWhom",
      "koji-su-benefiti-hydrafacial-tretmana": "benefits",
      "koliko-cesto-se-radi-hydrafacial": "frequency",
    };

    const presentSectionIds = [
      "hero",
      "breadcrumb",
      "intro",
      ...post.sections.map(s => sectionIdMap[s.id] || "additionalContent"),
      "ctaConsultations",
    ];

    const validationResult = validateTemplateSections(presentSectionIds);
    if (!validationResult.isValid || validationResult.warnings.length > 0) {
      logValidationWarnings(validationResult);
    }
  }

  // Top bar (36px) + Header (80px mobile, 96px desktop) = 116px mobile, 132px desktop
  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-[116px] md:pt-[132px]">
      {/* SECTION: hero - Hero Section with Placeholder (NO IMAGE) */}
      <section className="relative w-full overflow-hidden h-[420px] md:h-[520px] lg:h-[600px]">
        {/* Hero Placeholder - Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          {/* Subtle pattern overlay for texture */}
          <div className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201, 162, 76, 0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
            aria-hidden="true"
          />
        </div>

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

        {/* Back Navigation - Top left corner, above overlay */}
        <div className="absolute left-4 top-4 md:left-8 md:top-8 z-20">
          <BlogBackButton />
        </div>

        {/* H1 and Badges - Vertically centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            {/* H1 - Centered */}
            <h1 className="text-white font-bold leading-tight text-3xl md:text-5xl text-center mb-4 max-w-[24ch] mx-auto">
              {title}
            </h1>

            {/* Badges - Centered, below H1 */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {post && (
                <>
                  <span className="bg-white/25 backdrop-blur-sm border border-[#C9A24D]/40 text-[#C9A24D] rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                    {post.category}
                  </span>
                  <span className="bg-white/25 backdrop-blur-sm border border-[#C9A24D]/40 text-[#C9A24D] rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                    ~{readingTime} min čitanja
                  </span>
                </>
              )}
              {!post && (
                <>
                  <span className="bg-white/25 backdrop-blur-sm border border-[#C9A24D]/40 text-[#C9A24D] rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                    Blog
                  </span>
                  <span className="bg-white/25 backdrop-blur-sm border border-[#C9A24D]/40 text-[#C9A24D] rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                    ~{readingTime} min čitanja
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Below Hero */}
      <article>
        {/* SECTION: breadcrumb - Breadcrumb Section - Full width wrapper */}
        <section className="w-full relative py-12 md:py-16">
          <BlogContainer>
            <nav aria-label="Breadcrumb" className="text-text-muted text-xs mb-12 flex justify-center">
              <ol className="flex items-center gap-2 flex-wrap justify-center">
                <li className="flex items-center gap-2">
                  <Link href="/" className="hover:text-text-secondary transition-colors">
                    Početna
                  </Link>
                  <span className="text-text-muted">/</span>
                </li>
                <li className="flex items-center gap-2">
                  <Link href="/blog" className="hover:text-text-secondary transition-colors">
                    Blog
                  </Link>
                  <span className="text-text-muted">/</span>
                </li>
                <li>
                  <span aria-current="page" className="text-text-secondary">
                    {title}
                  </span>
                </li>
              </ol>
            </nav>

            {/* SECTION: intro - Uvodni Blok - Strukturisan */}
            {post?.intro && post.intro.length > 0 ? (
              <div className="space-y-6 max-w-[680px] mx-auto">
                {/* Eyebrow / Tag Line */}
                <p className="text-text-muted text-xs uppercase tracking-wider text-center">
                  Profesionalna nega lica • Novi Beograd
                </p>

                {/* Kratak uvod - renderuj sve intro paragrafe */}
                <div className="space-y-4 pb-8">
                  {post.intro.map((paragraph, idx) => (
                    <p key={idx} className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words text-center">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-[680px] mx-auto">
                <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            )}
          </BlogContainer>
        </section>

        {/* Main Content Sections - Full width wrappers with centered content */}
        {/* SECTION: Dynamic sections (whatIs, inPractice, forWhom, benefits, frequency, additionalContent) */}
        {post ? (
          <>
            {post.sections.map((section, sectionIdx) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 w-full relative py-12 md:py-16">
                <BlogContainer>
                  <h2 className="text-text-primary text-2xl sm:text-3xl font-bold tracking-[0.01em] mb-6 text-center">
                    {section.title}
                  </h2>

                  {section.paragraphs.length ? (
                    <div className="space-y-5 mb-6">
                      {section.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words text-center">
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets?.length ? (() => {
                    const listType = getListType(section.id, section.title);
                    return (
                      <BlogList 
                        type={listType}
                        className="mt-6 space-y-5 text-text-secondary text-base md:text-lg leading-relaxed font-light mx-auto max-w-[680px]"
                      >
                        {section.bullets.map((b, idx) => {
                          // Extract first phrase (before first comma or colon, or first ~10 words)
                          const textParts = b.split(/[,:]/);
                          const firstPhrase = textParts[0]?.trim() || b.split(' ').slice(0, 8).join(' ');
                          const restOfText = textParts.length > 1 ? textParts.slice(1).join('').trim() : b.replace(firstPhrase, '').trim();
                          
                          return (
                            <BlogListItem key={idx} type={listType} index={listType === "process" ? idx : undefined}>
                              {restOfText ? (
                                <>
                                  <span className="text-text-primary font-medium text-text-primary/90">{firstPhrase}</span>
                                  {restOfText && <span className="text-text-secondary">{restOfText.startsWith(':') || restOfText.startsWith(',') ? restOfText : `: ${restOfText}`}</span>}
                                </>
                              ) : (
                                <span className="text-text-secondary">{b}</span>
                              )}
                            </BlogListItem>
                          );
                        })}
                      </BlogList>
                    );
                  })() : null}

                  {section.callout ? (
                    <div className="mt-10 mb-6 w-full max-w-[680px] mx-auto">
                      <div className="card-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform p-6 sm:p-8 md:p-10 text-center">
                        {/* Icon at top */}
                        <div className="flex items-center justify-center mb-5">
                          <div className="w-10 h-10 rounded-full bg-[#C9A24D]/10 flex items-center justify-center border border-[#C9A24D]/20">
                            <Check className="w-5 h-5 text-[#C9A24D]" strokeWidth={2} aria-hidden="true" />
                          </div>
                        </div>
                        {section.callout.title ? (
                          <p className="text-text-primary font-medium mb-4 text-lg md:text-xl text-text-primary/90">{section.callout.title}</p>
                        ) : null}
                        <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                          {section.callout.text}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {/* Secondary image - inserted after second section */}
                  {sectionIdx === 1 ? (
                    <div className="mt-10 mb-6 w-full max-w-[680px] mx-auto">
                      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] rounded-2xl border border-[rgba(201,162,77,0.25)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-navy-800/25 via-navy-700/15 to-navy-900/30" aria-hidden="true" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-white/5">
                            <Droplets className="w-6 h-6 text-[#C9A24D]" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </BlogContainer>
              </section>
            ))}

            {/* SECTION: ctaConsultations - Consultation Form Section - Full width wrapper */}
            <section className="w-full relative border-t border-white/10">
              <div className="max-w-[720px] w-full mx-auto px-4 sm:px-6 py-12 mt-12">
                <h2 className="text-text-primary text-2xl sm:text-3xl font-bold tracking-[0.01em] mb-6 text-center">
                  Besplatne konsultacije
                </h2>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light mb-8 text-center">
                  Ako želite da saznate da li je ovaj tretman za vas, možete zakazati besplatne konsultacije.
                </p>
                <ConsultationForm 
                  calendlyContainerId="blog-calendly-container"
                  showAnimations={false}
                />
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="w-full relative py-12 md:py-16">
              <BlogContainer>
                <div className="card-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 will-change-transform p-6 sm:p-8 md:p-10 max-w-[680px] mx-auto text-center">
                  <h2 className="text-text-primary text-xl md:text-2xl font-bold mb-4">U pripremi</h2>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                    Ovaj tekst je u pripremi. Uskoro objavljujemo stručno napisan vodič, sa jasnim odgovorima i mirnim preporukama iz Odalis centra na Novom Beogradu.
                  </p>
                </div>
              </BlogContainer>
            </section>
            {/* SECTION: ctaConsultations - Consultation Form Section - Full width wrapper */}
            <section className="w-full relative border-t border-white/10">
              <div className="max-w-[720px] w-full mx-auto px-4 sm:px-6 py-12 mt-12">
                <h2 className="text-text-primary text-2xl sm:text-3xl font-bold tracking-[0.01em] mb-6 text-center">
                  Besplatne konsultacije
                </h2>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light mb-8 text-center">
                  Ako želite da saznate više, možete zakazati besplatne konsultacije.
                </p>
                <ConsultationForm 
                  calendlyContainerId="blog-calendly-container"
                  showAnimations={false}
                />
              </div>
            </section>
          </>
        )}
      </article>

      <Footer />
    </main>
  );
}
