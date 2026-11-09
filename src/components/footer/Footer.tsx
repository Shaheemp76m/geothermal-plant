import React from 'react';
import { ArrowUp, BookOpen, Globe2 } from 'lucide-react';
import { NAV_LINKS } from '../../data/content';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';

interface FooterProps {
  onOpenReferences: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReferences }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0C1712] text-earth-stone py-12 sm:py-16 md:py-20 border-t border-[#1C3328]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Footer Row: Wordmark, Mission, Back to Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 sm:pb-16 border-b border-[#1C3328]">
          {/* Brand & Mission */}
          <Reveal variant="fadeUp" delay={0.05} className="lg:col-span-5 space-y-3 sm:space-y-4">
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.22em] text-white uppercase block">
              GEOTHERMAL GREEN
            </span>
            <p className="text-xs sm:text-sm text-[#A3A199] font-sans leading-relaxed max-w-md">
              A premium educational platform exploring the natural thermal dynamics beneath the Earth's crust and their role in establishing a resilient, 24/7 low-carbon energy economy.
            </p>
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono text-earth-sage pt-1 sm:pt-2">
              <Globe2 className="w-3.5 h-3.5 shrink-0" />
              <span>GLOBAL SUBSURFACE RESOURCE STUDY</span>
            </div>
          </Reveal>

          {/* Navigation Links */}
          <Reveal variant="fadeUp" delay={0.15} className="lg:col-span-4 space-y-2.5 sm:space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-white/50 block mb-3 sm:mb-4">
              SITE MAP & EXPLORATION
            </span>
            <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs font-sans tracking-wider">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenReferences}
                  className="hover:text-white transition-colors text-left flex items-center space-x-1 text-earth-sage"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>REFERENCES</span>
                </button>
              </li>
            </ul>
          </Reveal>

          {/* Back to top & Action */}
          <Reveal variant="fadeUp" delay={0.25} className="md:col-span-2 lg:col-span-3 flex flex-col justify-between items-start md:items-end">
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="space-x-2 text-xs font-semibold tracking-[0.2em] uppercase px-4 sm:px-5 py-2.5 sm:py-3 border border-[#264539] text-white hover:bg-white hover:text-earth-forest transition-all duration-300"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </MagneticButton>

            <div className="mt-6 md:mt-0 text-[10px] sm:text-[11px] font-mono text-[#8E8C83] text-left md:text-right">
              SYSTEM REVISION: 2026.11<br />
              STANDARDS COMPLIANT · VERCEL DEPLOYABLE
            </div>
          </Reveal>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-[#6A6862] font-sans gap-3 sm:gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Geothermal Green. Dedicated to factual energy literacy and geological science.</p>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={onOpenReferences}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Scientific Sources
            </button>
            <span className="text-[#264539]">·</span>
            <span className="text-[#A3A199]">Open Research Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
