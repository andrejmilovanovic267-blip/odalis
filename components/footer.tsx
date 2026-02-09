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
                  className="block flex justify-center md:block"
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
                <p className="text-[#E8E5E0] text-sm md:text-base font-light leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0">
                  Odalis je centar za podmlađivanje lica i tela koji se fokusira na
                  neinvazivne, savremene tretmane i individualan pristup svakoj klijentici.
                  Naš cilj je da istaknemo prirodnu lepotu i pomognemo Vam da se osećate
                  sveže, negovano i zadovoljno u svojoj koži.
                </p>
                {/* Social Icons */}
                <div className="flex items-center gap-6 pt-2 justify-center md:justify-start">
                  <a
                    href="https://www.instagram.com/odalis_nbg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-[#E8E5E0] hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded"
                  >
                    <span className="text-base font-light hidden md:inline">Instagram</span>
                    <svg className="w-6 h-6 md:hidden" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/people/Odalis-NBG/61574995882346/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-[#E8E5E0] hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded"
                  >
                    <span className="text-base font-light hidden md:inline">Facebook</span>
                    <svg className="w-6 h-6 md:hidden" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@odalis_nbg"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="text-[#E8E5E0] hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded"
                  >
                    <span className="text-base font-light hidden md:inline">TikTok</span>
                    <svg className="w-6 h-6 md:hidden" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right: Three Columns of Links */}
              <nav aria-label="Footer Navigation" className="footer-links">
                {/* Mobile: Combined links in 2 columns */}
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 justify-items-center md:hidden">
                  {[...navigationLinks, ...servicesLinks, ...infoLinks].map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(link.href, e)}
                        className="text-[#E8E5E0] text-sm font-light hover:text-[#C9A24D] transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded text-center block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Desktop: Three Columns */}
                <div className="hidden md:grid grid-cols-3 gap-8 md:gap-12">
                  {/* Column 1: Navigation */}
                  <div className="footer-column">
                    <h3 className="text-[#FDFCFA] text-sm font-medium mb-4 uppercase tracking-wider">
                      Navigacija
                    </h3>
                    <ul className="space-y-3">
                      {navigationLinks.map((link) => (
                        <li key={`${link.href}-${link.label}`}>
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
                        <li key={`${link.href}-${link.label}`}>
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
                        <li key={`${link.href}-${link.label}`}>
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
