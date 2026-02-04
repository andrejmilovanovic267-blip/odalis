"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scroll-utils";
import { useTopBar } from "./top-bar-context";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isTopBarVisible, topBarHeight } = useTopBar();
  
  // Calculate dynamic top offset
  const topOffset = isTopBarVisible ? topBarHeight : 0;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // If we're on homepage, just scroll to hero
    if (pathname === '/') {
      setTimeout(() => {
        scrollToSection('#hero', { behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      // If we're on another page, navigate to homepage first
      router.push('/');
      // Wait for navigation to complete, then scroll to hero
      setTimeout(() => {
        const target = document.getElementById('hero');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Fallback: try scrollToSection if element not found immediately
          scrollToSection('#hero', { behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  };

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // If it's a regular page link (starts with /), navigate normally
    if (href.startsWith('/') && !href.startsWith('/#')) {
      router.push(href);
      return;
    }
    
    // Special handling for "Tretmani" link (both mobile and desktop)
    // Scrolls so bottom of cards block is 20px above viewport bottom
    if (href === '#tretmani' || href === '#tretmani-end') {
      setTimeout(() => {
        const targetElement = document.getElementById('tretmani-cards');
        const headerElement = document.querySelector('header');
        
        if (targetElement && headerElement) {
          // Measure cards block bottom position
          const elRect = targetElement.getBoundingClientRect();
          const elBottomDocY = elRect.bottom + window.scrollY;
          
          // Measure viewport and header
          const viewportH = window.innerHeight;
          const headerH = headerElement ? Math.ceil(headerElement.getBoundingClientRect().height) : 0;
          
          // Compute scroll position so: elBottomDocY - scrollTop = viewportH - 20 - headerH
          // => scrollTop = elBottomDocY - (viewportH - 20 - headerH)
          const GAP = 20;
          const top = Math.max(0, Math.round(elBottomDocY - (viewportH - GAP - headerH)));
          
          // Single deterministic scroll
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      }, 50);
      return;
    }
    
    // Default behavior for all other anchor links
    setTimeout(() => {
      scrollToSection(href, { behavior: 'smooth', block: 'start' });
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

  // Mobile navigation links
  const mobileNavLinks = [
    { href: '#hero', label: 'Početna' },
    { href: '#proces', label: 'Proces' },
    { href: '#tretmani', label: 'Tretmani' },
    { href: '/blog', label: 'Blog' },
    { href: '#faq', label: 'Pitanja' },
    { href: '#konsultacije', label: 'Kontakt' },
  ];

  // Desktop navigation links
  const desktopNavLinks = [
    { href: '#hero', label: 'Početna' },
    { href: '#proces', label: 'Proces' },
    { href: '#faq', label: 'Pitanja' },
    { href: '#tretmani-end', label: 'Tretmani' },
    { href: '/blog', label: 'Blog' },
    { href: '#konsultacije', label: 'Kontakt' },
  ];

  return (
    <>
    <header 
      className="fixed left-0 right-0 w-full z-[1000] h-20 md:h-24 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all duration-300 ease-out"
      style={{ top: `${topOffset}px` }}
    >
      {/* Subtle top-to-bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />
      
      {/* Light reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none opacity-50" />
      
      <div className="relative z-10 h-full flex items-center justify-between px-4 sm:px-6">
        {/* Mobile Logo - Centered */}
        <div className="nav:hidden absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-full">
          <a
            href="/#hero"
            onClick={handleLogoClick}
            className="relative h-16 w-auto max-w-[90vw] cursor-pointer hover:opacity-90 transition-opacity duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded"
            aria-label="Odalis - Početna"
          >
            <Image
              src="/odalis.png"
              alt="Odalis - Centar za podmlađivanje"
              width={200}
              height={80}
              sizes="(max-width: 768px) 160px, 200px"
              className="object-contain h-full w-auto"
              priority
              quality={100}
            />
          </a>
        </div>

        {/* Centered Navigation Group (Left Nav + Logo + Right Nav) */}
        <div className="hidden nav:flex items-center gap-12 absolute left-1/2 -translate-x-1/2 h-full">
          {/* Desktop Navigation - Left (3 links) */}
          <nav className="flex items-center gap-12">
            {desktopNavLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-[#C9A24D] text-base font-medium hover:text-[#D6B45F] transition-colors duration-250 ease-out focus:outline-none focus:ring-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Logo container */}
          <div className="flex items-center justify-center h-full">
            <a
              href="/#hero"
              onClick={handleLogoClick}
              className="relative h-16 md:h-24 w-auto max-w-[90vw] cursor-pointer hover:opacity-90 transition-opacity duration-250 ease-out focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded"
              aria-label="Odalis - Početna"
            >
              <Image
                src="/odalis.png"
                alt="Odalis - Centar za podmlađivanje"
                width={200}
                height={80}
                sizes="(max-width: 768px) 160px, 300px"
                className="object-contain h-full w-auto"
                priority
                quality={100}
              />
            </a>
          </div>

          {/* Desktop Navigation - Right (3 links) */}
          <nav className="flex items-center gap-12">
            {desktopNavLinks.slice(3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-[#C9A24D] text-base font-medium hover:text-[#D6B45F] transition-colors duration-250 ease-out focus:outline-none focus:ring-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* CTA Button - Far Right */}
        <div className="hidden nav:flex items-center ml-auto">
          <a
            href="#kontakt"
            onClick={(e) => handleNavClick('#kontakt', e)}
            className="btn-cta"
          >
            Zakaži konsultacije
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="nav:hidden text-text-primary p-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2 rounded"
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
    </header>
    {/* Mobile Menu Overlay - Portal to body */}
    {typeof window !== 'undefined' && createPortal(
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="nav:hidden fixed top-20 left-0 right-0 bottom-0 z-[1001]"
            style={{
              background: 'rgba(11, 31, 51, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <nav className="flex flex-col items-center justify-start pt-12 px-6 space-y-8">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className="text-[#C9A24D] text-xl font-medium hover:text-[#D6B45F] transition-colors duration-250 ease-out leading-relaxed"
                >
                  {link.label}
                </a>
              ))}
              {/* CTA Button */}
              <a
                href="#kontakt"
                onClick={(e) => handleNavClick('#kontakt', e)}
                className="btn-cta mt-4"
              >
                Zakaži konsultacije
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}

