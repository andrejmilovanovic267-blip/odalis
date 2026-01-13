"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/scroll-utils";

export function Footer() {
  const handleNavClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(id, { behavior: 'smooth', block: 'start' });
  };

  const navigationLinks = [
    { href: '#hero', label: 'Početna' },
    { href: '#pristup', label: 'Naš pristup' },
    { href: '#tretmani', label: 'Tretmani' },
  ];

  const servicesLinks = [
    { href: '#tretmani', label: 'Podmlađivanje lica' },
    { href: '#tretmani', label: 'Podmlađivanje tela' },
    { href: '#kontakt', label: 'Konsultacije' },
  ];

  const infoLinks = [
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' },
    { href: '#pristup', label: 'O nama' },
  ];

  return (
    <footer className="bg-[#0B1F33] mt-0 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
              {/* Left: Brand Block */}
              <div className="footer-brand space-y-6">
                <a
                  href="#hero"
                  onClick={(e) => handleNavClick('#hero', e)}
                  className="block"
                >
                  <div className="relative h-12 md:h-16 w-auto mb-6">
                    <Image
                      src="/odalis.png"
                      alt="Odalis - Centar za podmlađivanje"
                      width={200}
                      height={80}
                      sizes="(max-width: 768px) 120px, 200px"
                      className="object-contain h-full w-auto"
                      quality={90}
                      loading="lazy"
                    />
                  </div>
                </a>
                <p className="text-[#E8E5E0] text-sm md:text-base font-light leading-relaxed max-w-md">
                  Odalis je centar za podmlađivanje lica i tela koji se fokusira na
                  neinvazivne, savremene tretmane i individualan pristup svakoj klijentici.
                  Naš cilj je da istaknemo prirodnu lepotu i pomognemo Vam da se osećate
                  sveže, negovano i zadovoljno u svojoj koži.
                </p>
                {/* Social Icons */}
                <div className="flex items-center gap-6 pt-2">
                  <a
                    href="https://www.instagram.com/odalis_nbg"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-[#E8E5E0] hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded"
                  >
                    <span className="text-base font-light">Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/odalis_nbg"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-[#E8E5E0] hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded"
                  >
                    <span className="text-base font-light">Facebook</span>
                  </a>
                </div>
              </div>

              {/* Right: Three Columns of Links */}
              <nav aria-label="Footer Navigation" className="footer-links grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
                {/* Column 1: Navigation */}
                <div className="footer-column">
                  <h3 className="text-[#FDFCFA] text-sm font-medium mb-4 uppercase tracking-wider">
                    Navigacija
                  </h3>
                  <ul className="space-y-3">
                    {navigationLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, e)}
                          className="text-[#E8E5E0] text-sm font-light hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded w-fit block"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Services */}
                <div className="footer-column">
                  <h3 className="text-[#FDFCFA] text-sm font-medium mb-4 uppercase tracking-wider">
                    Usluge
                  </h3>
                  <ul className="space-y-3">
                    {servicesLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, e)}
                          className="text-[#E8E5E0] text-sm font-light hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded w-fit block"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Info */}
                <div className="footer-column">
                  <h3 className="text-[#FDFCFA] text-sm font-medium mb-4 uppercase tracking-wider">
                    Informacije
                  </h3>
                  <ul className="space-y-3">
                    {infoLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(link.href, e)}
                          className="text-[#E8E5E0] text-sm font-light hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded w-fit block"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Gold Accent Bar - Full Width */}
      <div className="h-1 bg-[#C9A24D] w-full"></div>

      {/* Bottom Copyright Bar */}
      <div className="w-full px-4 sm:px-6 flex items-center justify-center h-12 md:h-14">
        <p className="text-center text-[#B8B5B0] text-xs md:text-sm font-light leading-none m-0">
          © {new Date().getFullYear()} Odalis. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
}
