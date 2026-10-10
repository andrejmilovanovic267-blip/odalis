"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";

const navigationLinks = [
  { href: "/#hero", label: "Početna" },
  { href: "/#tretmani", label: "Tretmani" },
  { href: "/proizvodi", label: "Proizvodi" },
  { href: "/#proces", label: "Proces" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

const locationHref =
  "https://www.google.com/maps?q=44.80116826402845,20.38180688212591";

export function Footer() {
  const pathname = usePathname();

  const handleNavigationClick = (
    href: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (pathname !== "/" || !href.startsWith("/#")) return;

    event.preventDefault();
    scrollToSection(href.slice(1), { behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative z-10 mt-0 border-t border-white/10 bg-[#0B1F33]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl py-14 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-16">
            <div className="space-y-5 text-center md:text-left">
              <a
                href="/#hero"
                onClick={(event) => handleNavigationClick("/#hero", event)}
                aria-label="Odalis - Početna"
                className="inline-flex min-h-11 items-center justify-center md:justify-start"
              >
                <span className="relative block h-12 w-[120px] md:h-16 md:w-[160px]">
                  <Image
                    src="/odalis.png"
                    alt="Odalis - Centar za podmlađivanje"
                    fill
                    sizes="(max-width: 768px) 120px, 160px"
                    className="object-contain object-center md:object-left"
                    quality={90}
                  />
                </span>
              </a>

              <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-[#E8E5E0] md:mx-0 md:text-base">
                Odalis je centar za negu lica i tela koji se fokusira na
                neinvazivne, savremene tretmane i individualan pristup svakoj
                klijentici. Naš cilj je da istaknemo prirodnu lepotu i pomognemo
                Vam da se osećate sveže, negovano i zadovoljno u svojoj koži.
              </p>

              <nav
                aria-label="Društvene mreže"
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 md:justify-start"
              >
                <a
                  href="https://www.instagram.com/odalis_nbg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Odalis Instagram"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-light text-[#E8E5E0] transition-colors duration-250 ease-out hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2"
                >
                  <Instagram aria-hidden="true" className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/people/Odalis-NBG/61574995882346/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Odalis Facebook"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-light text-[#E8E5E0] transition-colors duration-250 ease-out hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2"
                >
                  <Facebook aria-hidden="true" className="h-4 w-4" />
                  Facebook
                </a>
                <a
                  href="https://www.tiktok.com/@odalis_nbg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Odalis TikTok"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-light text-[#E8E5E0] transition-colors duration-250 ease-out hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  TikTok
                </a>
              </nav>
            </div>

            <nav aria-label="Footer navigacija">
              <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-[#FDFCFA] md:text-left">
                Navigacija
              </h2>
              <ul className="mx-auto grid max-w-sm grid-cols-2 gap-x-5 md:mx-0 md:max-w-none md:grid-cols-1 md:gap-x-0">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(event) =>
                        handleNavigationClick(link.href, event)
                      }
                      className="flex min-h-11 items-center justify-center py-2 text-sm font-light text-[#E8E5E0] transition-colors duration-250 ease-out hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 md:justify-start"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="text-center md:text-left">
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#FDFCFA]">
                Kontakt
              </h2>
              <address className="not-italic">
                <ul className="space-y-2">
                  <li>
                    <a
                      href="tel:0638033576"
                      className="inline-flex min-h-11 max-w-full items-center justify-center gap-3 text-sm font-light text-[#E8E5E0] transition-colors duration-250 ease-out hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 md:justify-start"
                    >
                      <Phone
                        aria-hidden="true"
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <span>063 803 3576</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={locationHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 max-w-full items-center justify-center gap-3 text-sm font-light leading-relaxed text-[#E8E5E0] transition-colors duration-250 ease-out hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 md:justify-start"
                    >
                      <MapPin
                        aria-hidden="true"
                        className="h-4 w-4 flex-shrink-0"
                      />
                      <span>
                        TC Piramida Plus, Nehruova 51
                        <br />
                        Novi Beograd
                      </span>
                    </a>
                  </li>
                </ul>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-[#C9A24D]" />
      <div className="flex min-h-12 w-full items-center justify-center px-4 sm:px-6 md:min-h-14">
        <p className="m-0 text-center text-xs font-light leading-relaxed text-[#B8B5B0] md:text-sm">
          © {new Date().getFullYear()} Odalis. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
}
