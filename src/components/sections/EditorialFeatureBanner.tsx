import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EDITORIAL_BANNER } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { ImageReveal } from '../motion/ImageReveal';
import { MagneticButton } from '../motion/MagneticButton';
import { MOTION_DURATIONS } from '../../lib/motionTokens';

export const EditorialFeatureBanner: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<any>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="process-detail" className="bg-earth-ivory py-14 sm:py-20 md:py-24 border-b border-earth-border scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-6">
            <div>
              <Reveal variant="fadeUp" delay={0.05}>
                <span className="text-[10px] tracking-[0.24em] sm:tracking-[0.28em] uppercase font-semibold text-earth-forest block mb-2 sm:mb-3">
                  {EDITORIAL_BANNER.eyebrow}
                </span>
              </Reveal>

              <TextReveal
                text={EDITORIAL_BANNER.headline}
                mode="line"
                as="h2"
                delay={0.1}
                className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-earth-forest leading-[1.14]"
              />
            </div>

            <Reveal variant="fadeUp" delay={0.25}>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-[15px] text-earth-black/80 font-sans leading-relaxed border-l-2 border-earth-stone pl-4 sm:pl-6">
                {EDITORIAL_BANNER.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </Reveal>

            <div className="pt-2 sm:pt-4">
              <MagneticButton
                as="a"
                href={EDITORIAL_BANNER.ctaTarget}
                onClick={(e: React.MouseEvent<any>) => handleScroll(e, EDITORIAL_BANNER.ctaTarget)}
                className="space-x-2.5 sm:space-x-3 text-xs font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase px-5 sm:px-7 py-3 sm:py-3.5 bg-earth-forest text-earth-ivory hover:bg-earth-black transition-colors duration-300"
              >
                <span>{EDITORIAL_BANNER.ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>

          {/* Right: Strong Editorial Geothermal Photograph with ImageReveal */}
          <div className="lg:col-span-6">
            <div className="relative group overflow-hidden bg-earth-stone/20 border border-earth-border shadow-[0_15px_40px_rgba(16,37,28,0.06)]">
              <ImageReveal
                src={EDITORIAL_BANNER.image}
                alt={EDITORIAL_BANNER.imageAlt}
                aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                duration={MOTION_DURATIONS.image}
              />
              <div className="p-3 sm:p-4 bg-earth-stone/30 border-t border-earth-border flex items-center justify-between text-xs">
                <span className="font-sans text-[11px] sm:text-xs text-earth-muted truncate mr-2">
                  {EDITORIAL_BANNER.caption}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-earth-forest shrink-0">
                  REF · 04
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
