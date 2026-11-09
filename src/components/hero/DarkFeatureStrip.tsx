import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FEATURE_STRIP_ITEMS } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { ImageReveal } from '../motion/ImageReveal';
import { StaggerGroup, StaggerItem } from '../motion/StaggerGroup';
import { MOTION_DURATIONS } from '../../lib/motionTokens';

export const DarkFeatureStrip: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-earth-forest text-[#EAE5D9] py-14 sm:py-20 md:py-24 border-b border-[#203D32]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#203D32] pb-5 sm:pb-6 mb-8 sm:mb-12">
          <div>
            <Reveal variant="fadeUp" delay={0.05}>
              <span className="text-[10px] tracking-[0.24em] sm:tracking-[0.28em] text-earth-sage uppercase font-semibold block mb-1.5 sm:mb-2">
                FOUNDATIONAL PILLARS
              </span>
            </Reveal>

            <TextReveal
              text="Essential Dynamics of Earth Energy"
              mode="line"
              as="h2"
              delay={0.1}
              className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight"
            />
          </div>

          <Reveal variant="fadeUp" delay={0.2}>
            <p className="text-xs text-[#A3A199] font-sans max-w-sm mt-2 md:mt-0 leading-relaxed">
              Understanding the transition from subsurface thermodynamics to clean, dispatchable societal power.
            </p>
          </Reveal>
        </div>

        {/* 3 Compact Feature Groups with StaggerGroup */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {FEATURE_STRIP_ITEMS.map((item) => (
            <StaggerItem
              key={item.id}
              className="group flex flex-col justify-between border-t md:border-t-0 md:border-l first:border-t-0 first:border-l-0 border-[#203D32] pt-6 md:pt-0 md:pl-6 lg:pl-10"
            >
              <div>
                {/* Number / Category Tag */}
                <span className="text-[10px] font-mono tracking-widest text-earth-sage uppercase block mb-2 sm:mb-3">
                  {item.tag}
                </span>

                {/* Compact Image using ImageReveal */}
                <div className="mb-4 sm:mb-5 border border-[#264539] overflow-hidden bg-[#152B21]">
                  <ImageReveal
                    src={item.image}
                    alt={item.imageAlt}
                    aspectRatio="aspect-[16/10]"
                    duration={MOTION_DURATIONS.standard}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-forest/70 to-transparent pointer-events-none" />
                  </ImageReveal>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-lg sm:text-xl lg:text-2xl font-medium text-white tracking-normal mb-2 sm:mb-3 group-hover:text-earth-sage transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#C5C2B8] font-sans leading-relaxed mb-4 sm:mb-6">
                  {item.subtitle}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <a
                  href={item.targetId}
                  onClick={(e) => handleLinkClick(e, item.targetId)}
                  className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-earth-sage hover:text-white transition-colors group/link"
                >
                  <span className="tracking-wider uppercase">{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};
