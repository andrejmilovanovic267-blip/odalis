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

          {/* Header */}
          <header className="pt-6 md:pt-8 pb-8 md:pb-10">
            <h1 className="text-text-primary font-bold tracking-[0.01em] leading-[1.15] text-3xl sm:text-4xl md:text-5xl max-w-[920px]">
              {title}
            </h1>

            <p className="text-text-muted text-sm md:text-base font-light mt-4">
              {metaLine}
            </p>

            <div className="mt-6 space-y-4 max-w-[820px]">
              {(post?.intro ?? ["Ovaj blog tekst je u pripremi."]).map((p, idx) => (
                <p key={idx} className="text-text-secondary text-base md:text-lg leading-[1.9] font-light break-words">
                  {p}
                </p>
              ))}
            </div>

            {/* Mobile inline CTA after intro */}
            <div className="mt-8 lg:hidden">
              <div className="border border-[rgba(201,162,77,0.25)] rounded-3xl p-6">
                <p className="text-text-primary text-lg font-bold">Zakažite besplatne konsultacije</p>
                <ul className="mt-3 space-y-2 text-text-secondary text-base font-light">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A24D] flex-shrink-0" aria-hidden="true" />
                    <span>Bez pritiska</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A24D] flex-shrink-0" aria-hidden="true" />
                    <span>Personalizovan plan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A24D] flex-shrink-0" aria-hidden="true" />
                    <span>Novi Beograd</span>
                  </li>
                </ul>
                <div className="pt-5">
                  <Button href="/#kontakt" variant="primary" className="w-full px-8 py-3 text-base">
                    Zakažite besplatne konsultacije
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Featured visual placeholder (neutral, no gradients) */}
          <div className="relative w-full h-[240px] sm:h-[260px] rounded-3xl border border-[rgba(201,162,77,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-navy-900/20" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 mb-4">
                <Droplets className="w-6 h-6 text-[#C9A24D]" aria-hidden="true" />
              </div>
              <p className="text-text-primary text-xl md:text-2xl font-bold">
                HydraFacial
              </p>
              <p className="text-text-secondary text-sm md:text-base font-light mt-2">
                Dubinska hidratacija • Bez iritacija
              </p>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-12 gap-8 lg:gap-12 pt-10 md:pt-12 pb-14 md:pb-16">
            {/* Content */}
            <div className="col-span-12 lg:col-span-8">
              <div className="max-w-[820px]">
                {/* TOC */}
                {post ? (
                  <nav aria-label="Sadržaj" className="border border-white/10 rounded-2xl p-5 md:p-6">
                    <p className="text-text-primary font-semibold mb-3">Sadržaj</p>
                    <ul className="space-y-2 text-text-secondary text-sm md:text-base">
                      {post.sections.map((s) => (
                        <li key={s.id}>
                          <a className="hover:text-text-primary transition-colors" href={`#${s.id}`}>
                            {s.title}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a className="hover:text-text-primary transition-colors" href="#final-cta">
                          Sledeći korak
                        </a>
                      </li>
                    </ul>
                  </nav>
                ) : null}

                <div className="pt-10 space-y-12">
                  {post ? (
                    <>
                      {post.sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-28">
                          <h2 className="text-text-primary text-2xl md:text-3xl font-bold tracking-[0.01em]">
                            {section.title}
                          </h2>

                          {section.paragraphs.length ? (
                            <div className="mt-4 space-y-4">
                              {section.paragraphs.map((p, idx) => (
                                <p key={idx} className="text-text-secondary text-base md:text-lg leading-[1.9] font-light break-words">
                                  {p}
                                </p>
                              ))}
                            </div>
                          ) : null}

                          {section.bullets?.length ? (
                            <ul className="mt-5 space-y-3 text-text-secondary text-base md:text-lg leading-[1.9] font-light">
                              {section.bullets.map((b, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A24D] flex-shrink-0" aria-hidden="true" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          {section.callout ? (
                            <div className="mt-6 border border-[rgba(201,162,77,0.25)] rounded-2xl p-5 md:p-6">
                              {section.callout.title ? (
                                <p className="text-text-primary font-semibold mb-2">{section.callout.title}</p>
                              ) : null}
                              <p className="text-text-secondary text-base md:text-lg leading-[1.9] font-light break-words">
                                {section.callout.text}
                              </p>
                            </div>
                          ) : null}

                          {/* Internal links (at least two) – placed once in a natural spot */}
                          {section.id === "hydrafacial-kao-prvi-korak-ka-podmladjivanju" ? (
                            <p className="mt-6 text-text-secondary text-base md:text-lg leading-[1.9] font-light break-words">
                              Ako želite da vidite sve tretmane na sajtu, pogledajte{" "}
                              <Link href="/#tretmani" className="text-[#C9A24D] underline underline-offset-4 hover:text-[#D4AF37]">
                                tretmane
                              </Link>{" "}
                              ili pređite direktno na{" "}
                              <Link href="/#kontakt" className="text-[#C9A24D] underline underline-offset-4 hover:text-[#D4AF37]">
                                kontakt
                              </Link>
                              .
                            </p>
                          ) : null}
                        </section>
                      ))}

                      <section id="final-cta" className="scroll-mt-28 border-t border-white/10 pt-10">
                        <h2 className="text-text-primary text-2xl md:text-3xl font-bold tracking-[0.01em]">
                          Sledeći korak
                        </h2>
                        <p className="mt-4 text-text-secondary text-base md:text-lg leading-[1.9] font-light break-words">
                          {post.finalCta}
                        </p>
                        <div className="pt-6">
                          <Button href="/#kontakt" variant="primary" className="w-full sm:w-auto px-8 py-3 text-base">
                            Zakažite besplatne konsultacije
                          </Button>
                        </div>
                      </section>
                    </>
                  ) : (
                    <section className="border border-white/10 rounded-2xl p-6 md:p-7">
                      <h2 className="text-text-primary text-xl md:text-2xl font-bold">U pripremi</h2>
                      <p className="mt-3 text-text-secondary text-base md:text-lg leading-[1.9] font-light break-words">
                        Ovaj tekst je u pripremi. Uskoro objavljujemo stručno napisan vodič, sa jasnim odgovorima i mirnim preporukama iz Odalis centra na Novom Beogradu.
                      </p>
                      <div className="pt-5">
                        <Button href="/#kontakt" variant="primary" className="w-full sm:w-auto px-8 py-3 text-base">
                          Zakažite besplatne konsultacije
                        </Button>
                      </div>
                    </section>
                  )}
                </div>

                {/* Mobile CTA again at bottom */}
                {post ? (
                  <div className="pt-10 lg:hidden">
                    <div className="border border-[rgba(201,162,77,0.25)] rounded-3xl p-6">
                      <p className="text-text-primary text-lg font-bold">Zakažite besplatne konsultacije</p>
                      <p className="mt-2 text-text-secondary text-base font-light leading-[1.9]">
                        Bez pritiska i uz personalizovan plan — Novi Beograd.
                      </p>
                      <div className="pt-5">
                        <Button href="/#kontakt" variant="primary" className="w-full px-8 py-3 text-base">
                          Zakažite besplatne konsultacije
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Sidebar CTA (desktop) */}
            <aside className="hidden lg:block col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="border border-[rgba(201,162,77,0.25)] rounded-3xl p-6 md:p-7">
                  <p className="text-text-primary text-xl font-bold">
                    Zakažite besplatne konsultacije
                  </p>
                  <p className="mt-2 text-text-secondary text-base font-light leading-[1.9]">
                    Miran razgovor i stručna procena, bez agresije i bez obaveze.
                  </p>
                  <ul className="mt-5 space-y-3 text-text-secondary text-base font-light">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A24D] flex-shrink-0" aria-hidden="true" />
                      <span>Bez pritiska</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A24D] flex-shrink-0" aria-hidden="true" />
                      <span>Personalizovan plan</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A24D] flex-shrink-0" aria-hidden="true" />
                      <span>Novi Beograd</span>
                    </li>
                  </ul>
                  <div className="pt-6">
                    <Button href="/#kontakt" variant="primary" className="w-full px-8 py-3 text-base">
                      Zakažite besplatne konsultacije
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

