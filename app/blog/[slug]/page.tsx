import type { Metadata } from "next";
import Link from "next/link";
import { slugToTitle } from "@/lib/blog";
import { blogPosts } from "../posts";
import { Button } from "@/ui/button";
import { Footer } from "@/components/footer";
import { Droplets } from "lucide-react";

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

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts[params.slug];
  const title = post?.title ?? slugToTitle(params.slug);
  const metaLine = post
    ? `${post.category} • ${post.location} • ${post.readTime}`
    : `Blog • Novi Beograd`;

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

  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      <div className="container mx-auto px-4 sm:px-6">
        <article className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-text-muted text-sm">
            <ol className="flex items-center gap-2 flex-wrap">
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

          {/* Blog Hero Section */}
          <div className="pt-6 md:pt-8 pb-12 md:pb-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-text-primary font-bold tracking-[0.01em] leading-[1.15] text-3xl sm:text-4xl md:text-5xl">
                {title}
              </h1>

              <div className="space-y-4 max-w-3xl mx-auto">
                {(post?.intro ?? ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."]).map((p, idx) => (
                  <p key={idx} className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Hero / Cover Image */}
          <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] rounded-3xl border border-[rgba(201,162,77,0.25)] overflow-hidden mb-12 md:mb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-800/30 via-navy-700/20 to-navy-900/40" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 bg-white/5 mb-4">
                <Droplets className="w-8 h-8 text-[#C9A24D]" aria-hidden="true" />
              </div>
              <p className="text-text-primary text-2xl md:text-3xl font-bold">
                {title.split('–')[0].trim()}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto pt-8 md:pt-12 pb-14 md:pb-20">
            <div className="space-y-12 md:space-y-16">
              {post ? (
                <>
                  {post.sections.map((section, sectionIdx) => (
                    <section key={section.id} id={section.id} className="scroll-mt-28">
                      <h2 className="text-text-primary text-2xl md:text-3xl font-bold tracking-[0.01em] mb-6">
                        {section.title}
                      </h2>

                      {section.paragraphs.length ? (
                        <div className="space-y-6">
                          {section.paragraphs.map((p, idx) => (
                            <p key={idx} className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                              {p}
                            </p>
                          ))}
                        </div>
                      ) : null}

                      {section.bullets?.length ? (
                        <ul className="mt-6 space-y-3 text-text-secondary text-base md:text-lg leading-relaxed font-light">
                          {section.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A24D] flex-shrink-0" aria-hidden="true" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {section.callout ? (
                        <div className="mt-8 border border-[rgba(201,162,77,0.25)] rounded-2xl p-6 md:p-7">
                          {section.callout.title ? (
                            <p className="text-text-primary font-semibold mb-3">{section.callout.title}</p>
                          ) : null}
                          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words">
                            {section.callout.text}
                          </p>
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

                  {/* Final CTA - discrete and calm */}
                  <section className="border-t border-white/10 pt-12 mt-12">
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light mb-6">
                      Ako želite da saznate da li je ovaj tretman za vas, možete zakazati besplatne konsultacije.
                    </p>
                    <div>
                      <Button href="#konsultacije" variant="primary" className="px-8 py-3 text-base">
                        Zakaži besplatne konsultacije
                      </Button>
                    </div>
                  </section>
                </>
              ) : (
                <section className="border border-white/10 rounded-2xl p-6 md:p-7">
                  <h2 className="text-text-primary text-xl md:text-2xl font-bold mb-4">U pripremi</h2>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light break-words mb-6">
                    Ovaj tekst je u pripremi. Uskoro objavljujemo stručno napisan vodič, sa jasnim odgovorima i mirnim preporukama iz Odalis centra na Novom Beogradu.
                  </p>
                  <div>
                    <Button href="#konsultacije" variant="primary" className="px-8 py-3 text-base">
                      Zakaži besplatne konsultacije
                    </Button>
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

