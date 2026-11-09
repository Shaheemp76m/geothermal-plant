import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EDITORIAL_BANNER } from '../../data/content';

export const EditorialFeatureBanner: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-earth-ivory py-16 md:py-24 border-b border-earth-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.28em] uppercase font-semibold text-earth-forest block mb-3">
                {EDITORIAL_BANNER.eyebrow}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-earth-forest leading-[1.14]">
                {EDITORIAL_BANNER.headline}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm md:text-[15px] text-earth-black/80 font-sans leading-relaxed border-l-2 border-earth-stone pl-4 sm:pl-6">
              {EDITORIAL_BANNER.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4">
              <a
                href={EDITORIAL_BANNER.ctaTarget}
                onClick={(e) => handleScroll(e, EDITORIAL_BANNER.ctaTarget)}
                className="inline-flex items-center space-x-3 text-xs font-semibold tracking-[0.22em] uppercase px-7 py-3.5 bg-earth-forest text-earth-ivory hover:bg-earth-black transition-colors duration-300"
              >
                <span>{EDITORIAL_BANNER.ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Strong Editorial Geothermal Photograph */}
          <div className="lg:col-span-6">
            <div className="relative group overflow-hidden bg-earth-stone/20 border border-earth-border shadow-[0_15px_40px_rgba(16,37,28,0.06)]">
              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <img
                  src={EDITORIAL_BANNER.image}
                  alt={EDITORIAL_BANNER.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover img-editorial-zoom filter saturate-[0.95]"
                />
              </div>
              <div className="p-4 bg-earth-stone/30 border-t border-earth-border flex items-center justify-between">
                <span className="text-[11px] font-sans text-earth-muted">
                  {EDITORIAL_BANNER.caption}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-earth-forest">
                  FIG. 02
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
