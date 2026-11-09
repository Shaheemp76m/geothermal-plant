import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../../data/content';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen for ESC key when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-earth-ivory/95 backdrop-blur-md border-b border-earth-border shadow-[0_2px_15px_rgba(16,37,28,0.04)]'
            : 'bg-earth-ivory border-b border-earth-border/70'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Left: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[11px] font-semibold tracking-[0.2em] text-earth-black/75">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-earth-forest transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-earth-forest hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Center: Brand Wordmark */}
          <div className="flex-1 lg:flex-none text-left lg:text-center">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, '#top')}
              className="inline-block group"
            >
              <span className="font-editorial text-[22px] md:text-[26px] font-bold tracking-[0.22em] text-earth-forest uppercase block leading-none group-hover:text-earth-black transition-colors">
                GEOTHERMAL GREEN
              </span>
              <span className="block text-[8px] md:text-[9px] tracking-[0.35em] text-earth-muted uppercase mt-1 font-sans font-medium text-left lg:text-center">
                Earth's Baseload Power
              </span>
            </a>
          </div>

          {/* Right: Action & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, '#how-it-works')}
              className="hidden sm:inline-flex items-center space-x-2 text-[11px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 border border-earth-forest text-earth-forest hover:bg-earth-forest hover:text-earth-ivory transition-all duration-300"
            >
              <span>EXPLORE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 text-earth-forest hover:text-earth-sage transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Rendered via Portal to eliminate backdrop-blur containment */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[60] bg-earth-ivory flex flex-col justify-between animate-fadeIn lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar inside Drawer: Perfectly aligned with header height and padding */}
          <div className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-earth-border/70 bg-earth-ivory shrink-0">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, '#top')}
              className="inline-block"
            >
              <span className="font-editorial text-[22px] font-bold tracking-[0.22em] text-earth-forest uppercase block leading-none">
                GEOTHERMAL GREEN
              </span>
              <span className="block text-[8px] tracking-[0.35em] text-earth-muted uppercase mt-1 font-sans font-medium">
                Earth's Baseload Power
              </span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 text-earth-forest hover:text-earth-sage transition-colors focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.28em] text-earth-muted uppercase font-semibold block">
                DIRECTORY / NAVIGATION
              </span>
              <nav className="flex flex-col space-y-4">
                {NAV_LINKS.map((link, idx) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-editorial text-2xl sm:text-3xl font-medium tracking-wide text-earth-forest hover:text-earth-sage transition-colors flex items-center justify-between border-b border-earth-border/50 pb-3"
                  >
                    <span>{link.label}</span>
                    <span className="font-sans text-xs tracking-widest text-earth-muted">
                      0{idx + 1}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-earth-border mt-8 space-y-5">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-earth-muted block mb-1">
                  POSITIONING
                </span>
                <p className="text-xs text-earth-black/80 font-sans leading-relaxed">
                  Dedicated to factual educational literacy regarding deep subterranean thermodynamics and clean continuous baseload power.
                </p>
              </div>
              <a
                href="#origins"
                onClick={(e) => handleNavClick(e, '#origins')}
                className="w-full text-center block text-xs font-semibold tracking-[0.22em] uppercase py-3.5 bg-earth-forest text-earth-ivory hover:bg-earth-black transition-colors"
              >
                EXPLORE THE ENERGY
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
