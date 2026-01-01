"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/scroll-utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      scrollToSection(id, { behavior: 'smooth', block: 'start' });
    }, 50);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#hero', label: 'Početna' },
    { href: '#pristup', label: 'Pristup' },
    { href: '#tretmani', label: 'Tretmani' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[1000] h-20 md:h-24 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm">
      {/* Subtle top-to-bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />
      
      {/* Light reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none opacity-50" />
      
      <div className="relative z-10 h-full flex items-center justify-between px-4 sm:px-6">
        {/* Desktop Navigation - Left */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          {navLinks.slice(0, 2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className="text-text-primary text-sm font-light hover:text-text-secondary transition-colors duration-250 ease-out focus:outline-none focus:ring-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Logo container - Centered */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-full">
          <a
            href="#hero"
            onClick={(e) => handleNavClick('#hero', e)}
            className="relative h-12 md:h-16 w-auto max-w-[90vw]"
          >
            <Image
              src="/odalis.png"
              alt="Odalis - Centar za podmlađivanje"
              width={200}
              height={80}
              sizes="(max-width: 768px) 120px, 200px"
              className="object-contain h-full w-auto"
              priority
              quality={100}
            />
          </a>
        </div>

        {/* Desktop Navigation - Right */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-end">
          {navLinks.slice(2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className="text-text-primary text-sm font-light hover:text-text-secondary transition-colors duration-250 ease-out focus:outline-none focus:ring-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-text-primary p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-20 left-0 right-0 bottom-0 w-full bg-[#0B1F33] z-[998] pointer-events-none"
            />
            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-20 z-[999]"
            >
              <nav className="flex flex-col items-center justify-start pt-12 px-6 space-y-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="text-text-primary text-xl font-light hover:text-text-secondary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

