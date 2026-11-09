import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../../data/content';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-earth-ivory/95 backdrop-blur-md border-b border-earth-border/80 shadow-[0_2px_12px_rgba(17,17,15,0.03)]'
          : 'bg-earth-ivory border-b border-earth-border/60'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Left: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-[12px] font-medium tracking-[0.16em] text-earth-black/80">
          {NAV_LINKS.slice(0, 4).map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-earth-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-earth-black hover:after:w-full after:transition-all after:duration-300"
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
            <span className="font-editorial text-[22px] md:text-[26px] font-bold tracking-[0.2em] text-earth-black uppercase block leading-none">
              GEOTHERMAL GREEN
            </span>
            <span className="block text-[8px] md:text-[9px] tracking-[0.32em] text-earth-muted uppercase mt-1 font-sans font-medium text-center">
              Earth's Baseload Power
            </span>
          </a>
        </div>

        {/* Right: Action & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, '#how-it-works')}
            className="hidden sm:inline-flex items-center space-x-2 text-[11px] font-semibold tracking-[0.18em] uppercase px-5 py-2.5 border border-earth-black text-earth-black hover:bg-earth-black hover:text-earth-ivory transition-all duration-300"
          >
            <span>EXPLORE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 text-earth-black hover:text-earth-green transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[110px] bg-earth-ivory z-40 lg:hidden flex flex-col justify-between p-8 border-t border-earth-border overflow-y-auto animate-fadeIn">
          <div className="space-y-6 pt-4">
            <p className="text-[10px] tracking-[0.25em] text-earth-muted uppercase font-semibold">
              INDEX / NAVIGATION
            </p>
            <nav className="flex flex-col space-y-5">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-editorial text-3xl font-medium tracking-wide text-earth-black hover:text-earth-green transition-colors flex items-center justify-between border-b border-earth-border/40 pb-3"
                >
                  <span>{link.label}</span>
                  <span className="font-sans text-xs tracking-widest text-earth-muted">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-earth-border mt-auto">
            <div className="mb-6">
              <span className="text-[11px] tracking-[0.2em] uppercase text-earth-muted block mb-2">
                MISSION BRIEF
              </span>
              <p className="text-sm text-earth-black/80 font-sans leading-relaxed">
                Exploring natural subsurface thermodynamics to support a clean, dispatchable energy future.
              </p>
            </div>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, '#how-it-works')}
              className="w-full text-center block text-xs font-semibold tracking-[0.2em] uppercase py-3.5 bg-earth-black text-earth-ivory"
            >
              EXPLORE THE ENERGY
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
