"use client";

import Image from "next/image";

export function Footer() {
  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      const headerHeight = window.innerWidth >= 768 ? 96 : 80;
      const targetPosition = (target as HTMLElement).offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { href: '#hero', label: 'Početna' },
    { href: '#pristup', label: 'Naš pristup' },
    { href: '#tretmani', label: 'Tretmani' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  return (
    <footer className="bg-navy-950/90 py-16 md:py-24 mt-32 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
            {/* Brand Block */}
            <div className="space-y-6">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#hero');
                }}
                className="block"
              >
                <div className="relative h-12 md:h-16 w-auto mb-6">
                  <Image
                    src="/odalis.png"
                    alt="Odalis"
                    width={200}
                    height={80}
                    className="object-contain h-full w-auto"
                    quality={100}
                  />
                </div>
              </a>
              <p className="text-text-secondary text-sm md:text-base font-light leading-relaxed max-w-md">
                Odalis je centar za podmlađivanje lica i tela koji se fokusira na
                neinvazivne, savremene tretmane i individualan pristup svakoj klijentici.
                Naš cilj je da istaknemo prirodnu lepotu i pomognemo Vam da se osećate
                sveže, negovano i zadovoljno u svojoj koži.
              </p>
            </div>

            {/* Navigation Block */}
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-text-secondary text-base font-light hover:text-text-primary transition-colors duration-300 focus:outline-none w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social & Info Block */}
            <div className="space-y-8">
              {/* Social Media */}
              <div className="space-y-4">
                <p className="text-text-primary text-sm font-medium mb-3">Pratite nas</p>
                <div className="flex flex-col space-y-3">
                  <a
                    href="https://www.instagram.com/odalis_nbg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary text-base font-light hover:text-text-primary transition-colors duration-300 focus:outline-none w-fit"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/odalis_nbg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary text-base font-light hover:text-text-primary transition-colors duration-300 focus:outline-none w-fit"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              {/* Location Info */}
              <div className="pt-4">
                <p className="text-text-muted text-xs md:text-sm font-light">
                  Radimo sa klijentima širom Srbije.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 border-t border-white/5">
            <p className="text-center text-text-muted text-xs md:text-sm font-light">
              © {new Date().getFullYear()} Odalis. Sva prava zadržana.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
