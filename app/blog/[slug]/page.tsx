import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { slugToTitle } from "@/lib/blog";
import { blogPosts } from "../posts";
import { Footer } from "@/components/footer";
import { Droplets, Sparkles, Check } from "lucide-react";
import { ConsultationForm } from "@/components/consultation-form";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const post = blogPosts[params.slug];
  const title = post ? `${post.title} | Odalis Novi Beograd` : `${slugToTitle(params.slug)} | Odalis Novi Beograd`;
  const description = post
    ? post.description
    : "Blog tekst je u pripremi. Uskoro objavljujemo stručno napisan vodič sa jasnim odgovorima i savetima iz Odalis centra na Novom Beogradu.";

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}

// Calculate reading time from content
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return minutes;
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts[params.slug];
  const title = post?.title ?? slugToTitle(params.slug);
  
  // Calculate reading time from post content
  const readingTime = post
    ? (() => {
        const allText = [
          ...post.intro,
          ...post.sections.flatMap(s => [
            ...s.paragraphs,
            ...(s.bullets || []),
            s.callout?.text || "",
          ]),
        ].join(" ");
        return calculateReadingTime(allText);
      })()
    : 5;

  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        author: {
          "@type": "Organization",
          name: "Odalis",
        },
        areaServed: "Novi Beograd",
        inLanguage: "sr-RS",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://odalis.rs/blog/${post.slug}`,
        },
      }
    : null;

  // Top bar (36px) + Header (80px mobile, 96px desktop) = 116px mobile, 132px desktop
  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-[116px] md:pt-[132px]">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      {/* Hero Section - Featured Image with H1 and Badges */}
      <section className="relative w-full overflow-hidden h-[420px] md:h-[520px] lg:h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero1.png"
            alt={title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

        {/* H1 and Badges - Centered, No Panel, No Background */}
        <div className="absolute bottom-10 sm:bottom-14 left-0 right-0">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            {/* H1 - Centered */}
            <h1 className="text-white font-bold leading-tight text-3xl md:text-5xl text-center mb-4 max-w-[24ch] mx-auto">
              {title}
            </h1>

            {/* Badges - Centered, below H1, still over image */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {post && (
                <>
                  <span className="bg-white/10 border border-[#C9A24D]/40 text-[#C9A24D] rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                    {post.category}
                  </span>
                  <span className="bg-white/10 border border-[#C9A24D]/40 text-[#C9A24D] rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                    ~{readingTime} min čitanja
                  </span>
                </>
              )}
              {!post && (
                <>
                  <span className="bg-white/10 border border-[#C9A24D]/40 text-[#C9A24D] rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                    Blog
                  </span>
                  <span className="bg-white/10 border border-[#C9A24D]/40 text-[#C9A24D] rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                    ~{readingTime} min čitanja
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Below Hero - All Centered */}
      <div className="max-w-[900px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <article>
          {/* Breadcrumb - Centered */}
          <nav aria-label="Breadcrumb" className="text-text-muted text-sm mb-6 flex justify-center">
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

          {/* Podnaslov / Uvodni Tekst - Centered wrapper, left-aligned text */}
          <div className="mb-8">
            {post?.intro && post.intro.length > 0 && (
              <div className="space-y-4">
                {post.intro.map((p, idx) => (
                  <p key={idx} className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {!post && (
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            )}
          </div>

          {/* Main Content - Centered wrapper, left-aligned text */}
          <div>
            {post ? (
              <>
                {post.sections.map((section, sectionIdx) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="text-text-primary text-2xl sm:text-3xl font-bold tracking-[0.01em] mt-14 mb-6">
                      {section.title}
                    </h2>

                    {section.paragraphs.length ? (
                      <div className="space-y-5 mb-6">
                        {section.paragraphs.map((p, idx) => (
                          <p key={idx} className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                            {p}
                          </p>
                        ))}
                      </div>
                    ) : null}

                    {section.bullets?.length ? (
                      <ul className="mt-6 space-y-5 text-text-secondary text-base md:text-lg leading-relaxed font-light">
                        {section.bullets.map((b, idx) => {
                          // Extract first phrase (before first comma or colon, or first ~10 words)
                          const textParts = b.split(/[,:]/);
                          const firstPhrase = textParts[0]?.trim() || b.split(' ').slice(0, 8).join(' ');
                          const restOfText = textParts.length > 1 ? textParts.slice(1).join('').trim() : b.replace(firstPhrase, '').trim();
                          
                          return (
                            <li key={idx} className="flex items-start gap-4">
                              <div className="mt-1 flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-[#C9A24D]" strokeWidth={1.5} aria-hidden="true" />
                              </div>
                              <span className="flex-1">
                                {restOfText ? (
                                  <>
                                    <span className="text-text-primary font-medium">{firstPhrase}</span>
                                    {restOfText && <span className="text-text-secondary">{restOfText.startsWith(':') || restOfText.startsWith(',') ? restOfText : `: ${restOfText}`}</span>}
                                  </>
                                ) : (
                                  <span className="text-text-secondary">{b}</span>
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}

                    {section.callout ? (
                      <div className="mt-10 mb-6 max-w-[680px] mx-auto">
                        <div className="border border-[#C9A24D]/30 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-navy-900/20 via-navy-800/10 to-transparent backdrop-blur-sm">
                          {/* Icon at top */}
                          <div className="flex items-center justify-center mb-5">
                            <div className="w-10 h-10 rounded-full bg-[#C9A24D]/10 flex items-center justify-center border border-[#C9A24D]/20">
                              <Check className="w-5 h-5 text-[#C9A24D]" strokeWidth={2} aria-hidden="true" />
                            </div>
                          </div>
                          {section.callout.title ? (
                            <p className="text-text-primary font-semibold mb-4 text-center text-lg md:text-xl">{section.callout.title}</p>
                          ) : null}
                          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words text-center max-w-[540px] mx-auto">
                            {section.callout.text}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {/* Secondary image - inserted after second section */}
                    {sectionIdx === 1 ? (
                      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] rounded-3xl border border-[rgba(201,162,77,0.25)] overflow-hidden mt-10 mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-navy-800/25 via-navy-700/15 to-navy-900/30" aria-hidden="true" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-white/5">
                            <Droplets className="w-6 h-6 text-[#C9A24D]" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </section>
                ))}

                {/* Consultation Form */}
                <section className="border-t border-white/10 pt-12 mt-12">
                  <div className="max-w-[720px] w-full mx-auto px-4 sm:px-6">
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
                <section className="border border-white/10 rounded-2xl p-6 md:p-7 mb-12">
                  <h2 className="text-text-primary text-xl md:text-2xl font-bold mb-4">U pripremi</h2>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words mb-6">
                    Ovaj tekst je u pripremi. Uskoro objavljujemo stručno napisan vodič, sa jasnim odgovorima i mirnim preporukama iz Odalis centra na Novom Beogradu.
                  </p>
                </section>
                {/* Consultation Form */}
                <section className="border-t border-white/10 pt-12 mt-12">
                  <div className="max-w-[720px] w-full mx-auto px-4 sm:px-6">
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
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

