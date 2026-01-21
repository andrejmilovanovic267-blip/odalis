import Link from "next/link";
import { Button } from "@/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Footer } from "@/components/footer";

type BlogTemplateProps = {
  title: string;
  metaLine?: string;
  intro: string;
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
  showBottomCta?: boolean;
  children?: React.ReactNode;
};

export function BlogTemplate({
  title,
  metaLine,
  intro,
  breadcrumbs,
  showBottomCta = true,
  children,
}: BlogTemplateProps) {
  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      {/* BLOG HERO */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <nav aria-label="Breadcrumb" className="text-text-muted text-sm">
            <ol className="flex items-center justify-center gap-2 flex-wrap">
              {breadcrumbs.map((bc, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={`${bc.label}-${idx}`} className="flex items-center gap-2">
                    {bc.href && !isLast ? (
                      <Link href={bc.href} className="hover:text-text-secondary transition-colors">
                        {bc.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined} className="text-text-secondary">
                        {bc.label}
                      </span>
                    )}
                    {!isLast && <span className="text-text-muted">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>

          <SectionHeading as="h1" className="max-w-[900px] mx-auto">
            {title}
          </SectionHeading>

          {metaLine ? (
            <p className="text-text-muted text-sm md:text-base font-light">
              {metaLine}
            </p>
          ) : null}

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-3xl mx-auto break-words">
            {intro}
          </p>
        </div>
      </section>

      {/* BLOG CONTENT AREA */}
      <section className="container mx-auto px-4 sm:px-6">
        <article className="max-w-6xl mx-auto pt-10 md:pt-14">
          {/* Content is intentionally empty for now – future blog posts will be inserted here. */}
          {children}
        </article>
      </section>

      {/* CTA */}
      {showBottomCta ? (
        <section className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto pt-12 md:pt-16 pb-16 md:pb-20">
            <div className="border-t border-white/10 pt-10 md:pt-12 text-center space-y-4">
              <h2 className="text-text-primary text-xl md:text-2xl font-bold">
                Zakažite besplatne konsultacije
              </h2>
              <p className="text-text-secondary text-base md:text-lg font-light max-w-2xl mx-auto">
                Ako želite stručnu procenu i miran plan nege, konsultacije su pravo mesto da krenemo bez pritiska i bez obaveze.
              </p>
              <div className="pt-2 flex justify-center">
                <Button href="/#kontakt" variant="primary" className="w-full sm:w-auto px-8 py-3 text-base">
                  Zakažite besplatne konsultacije
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}

