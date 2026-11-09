import React from 'react';
import { ArrowUp, BookOpen, Globe2 } from 'lucide-react';
import { NAV_LINKS } from '../../data/content';

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
    <footer className="bg-earth-black text-earth-stone py-16 md:py-20 border-t border-[#232521]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top Footer Row: Wordmark, Mission, Back to Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#232521]">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.2em] text-white uppercase block">
              GEOTHERMAL GREEN
            </span>
            <p className="text-xs sm:text-sm text-[#9E9D95] font-sans leading-relaxed max-w-md">
              A premium educational platform exploring the natural thermal dynamics beneath the Earth's crust and their role in establishing a resilient, 24/7 low-carbon energy economy.
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[#748A70] pt-2">
              <Globe2 className="w-3.5 h-3.5" />
              <span>GLOBAL SUBSURFACE RESOURCE STUDY</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-white/50 block mb-4">
              SITE MAP & EXPLORATION
            </span>
            <ul className="grid grid-cols-2 gap-3 text-xs font-sans tracking-wider">
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
                  className="hover:text-white transition-colors text-left flex items-center space-x-1 text-[#8EAA8A]"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>REFERENCES</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Back to top & Action */}
          <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase px-5 py-3 border border-[#2B2E28] text-white hover:bg-white hover:text-earth-black transition-all duration-300"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <div className="mt-6 lg:mt-0 text-[11px] font-mono text-[#9E9D95] text-left lg:text-right">
              SYSTEM REVISION: 2026.11<br />
              STANDARDS COMPLIANT · VERCEL DEPLOYABLE
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6E6D67] font-sans gap-4">
          <p>© {new Date().getFullYear()} Geothermal Green. Dedicated to factual energy literacy and geological science.</p>
          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenReferences}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Scientific Sources
            </button>
            <span className="text-[#3E403B]">·</span>
            <span className="text-[#9E9D95]">Open Research Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
