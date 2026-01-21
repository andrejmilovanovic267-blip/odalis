import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Blog",
  description: "Blog Odalis centra. Saveti, objašnjenja tretmana i vodiči – sadržaj u pripremi.",
};

export default function BlogIndexPage() {
  return (
    <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
      <section className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <nav aria-label="Breadcrumb" className="text-text-muted text-sm">
            <ol className="flex items-center justify-center gap-2 flex-wrap">
              <li className="flex items-center gap-2">
                <Link href="/" className="hover:text-text-secondary transition-colors">
                  Početna
                </Link>
                <span className="text-text-muted">/</span>
              </li>
              <li>
                <span aria-current="page" className="text-text-secondary">
                  Blog
                </span>
              </li>
            </ol>
          </nav>

          <SectionHeading as="h1" className="max-w-[900px] mx-auto">
            Blog
          </SectionHeading>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-3xl mx-auto break-words">
            Sadržaj je u pripremi. Uskoro objavljujemo vodiče i stručna objašnjenja o neinvazivnim tretmanima, rutini nege i prirodnim rezultatima.
          </p>

          <div className="pt-4">
            <p className="text-text-muted text-sm">
              Napomena: stranice pojedinačnih blogova su dostupne na putanji <span className="text-text-secondary">/blog/[slug]</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

