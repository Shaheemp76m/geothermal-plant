import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_LINKS } from '../../data/content';
import { MagneticButton } from '../motion/MagneticButton';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../lib/motionTokens';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string>('#origins');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = NAV_LINKS.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement | null;
        if (section && section.offsetTop <= scrollPos) {
          setActiveNav(NAV_LINKS[i].href);
          break;
        }
      }
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
    setActiveNav(href);
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
            ? 'bg-earth-ivory/95 backdrop-blur-md border-b border-earth-border shadow-[0_4px_20px_rgba(16,37,28,0.05)]'
            : 'bg-earth-ivory border-b border-earth-border/70'
        }`}
      >
        <div className="w-[92vw] max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Brand Wordmark & Subtitle */}
          <div className="shrink-0 text-left min-w-0 pr-4">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, '#top')}
              className="inline-block group max-w-full"
            >
              <span className="font-editorial text-[17px] sm:text-[20px] md:text-[22px] font-bold tracking-[0.16em] sm:tracking-[0.18em] text-earth-forest uppercase block leading-tight truncate group-hover:text-earth-black transition-colors">
                GEOTHERMAL GREEN
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] text-earth-muted uppercase mt-0.5 font-sans font-medium text-left truncate">
                EARTH'S BASELOAD POWER
              </span>
            </a>
          </div>

          {/* Center: Navigation Links (Desktop) with LayoutId Indicator */}
          <nav 
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[11px] font-semibold tracking-[0.2em] text-earth-black/75"
          >
            {NAV_LINKS.map((link) => {
              const isHovered = hoveredNav === link.href;
              const isActive = activeNav === link.href;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.href)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-earth-forest transition-colors relative py-1.5 px-0.5 text-xs font-mono"
                >
                  <span className={isActive ? 'text-earth-forest font-bold' : ''}>
                    {link.label}
                  </span>
                  
                  {/* Animated Shared Layout Indicator */}
                  {isHovered && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-earth-forest"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {!isHovered && isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-earth-sage/60" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Action CTA & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            <div className="hidden sm:block">
              <MagneticButton
                as="a"
                href="#how-it-works"
                onClick={(e: React.MouseEvent<any>) => handleNavClick(e, '#how-it-works')}
                className="items-center space-x-2 text-[11px] font-semibold tracking-[0.2em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 border border-earth-forest text-earth-forest hover:bg-earth-forest hover:text-earth-ivory transition-all duration-300 rounded-full"
              >
                <span>EXPLORE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 text-earth-forest hover:text-earth-sage transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Rendered via Portal with AnimatePresence */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: MOTION_DURATIONS.quick, ease: MOTION_EASINGS.editorial }}
              className="fixed inset-0 z-[60] bg-earth-ivory flex flex-col justify-between lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              {/* Top Bar inside Drawer */}
              <div className="h-16 sm:h-20 px-4 sm:px-6 lg:px-12 flex items-center justify-between border-b border-earth-border/70 bg-earth-ivory shrink-0">
                <a
                  href="#top"
                  onClick={(e) => handleNavClick(e, '#top')}
                  className="inline-block"
                >
                  <span className="font-editorial text-[18px] sm:text-[22px] font-bold tracking-[0.18em] sm:tracking-[0.22em] text-earth-forest uppercase block leading-none">
                    GEOTHERMAL GREEN
                  </span>
                  <span className="block text-[8px] tracking-[0.28em] text-earth-muted uppercase mt-1 font-sans font-medium">
                    Earth's Baseload Power
                  </span>
                </a>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-earth-forest hover:text-earth-sage transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Scrollable Body with Staggered Entrance */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 flex flex-col justify-between">
                <div className="space-y-5 sm:space-y-6">
                  <span className="text-[10px] tracking-[0.28em] text-earth-muted uppercase font-semibold block">
                    DIRECTORY / NAVIGATION
                  </span>
                  <nav className="flex flex-col space-y-3 sm:space-y-4">
                    {NAV_LINKS.map((link, idx) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + idx * 0.04, duration: 0.3 }}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="font-editorial text-2xl sm:text-3xl font-medium tracking-wide text-earth-forest hover:text-earth-sage transition-colors flex items-center justify-between border-b border-earth-border/50 pb-2.5 sm:pb-3"
                      >
                        <span>{link.label}</span>
                        <span className="font-sans text-xs tracking-widest text-earth-muted">
                          0{idx + 1}
                        </span>
                      </motion.a>
                    ))}
                  </nav>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="pt-6 sm:pt-8 border-t border-earth-border mt-6 sm:mt-8 space-y-4 sm:space-y-5"
                >
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
                    className="w-full text-center block text-xs font-semibold tracking-[0.22em] uppercase py-3 sm:py-3.5 bg-earth-forest text-earth-ivory hover:bg-earth-black transition-colors"
                  >
                    EXPLORE THE ENERGY
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
