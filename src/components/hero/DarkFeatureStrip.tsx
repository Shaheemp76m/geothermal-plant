import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FEATURE_STRIP_ITEMS } from '../../data/content';

export const DarkFeatureStrip: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-earth-forest text-[#EAE5D9] py-16 md:py-24 border-b border-[#203D32]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#203D32] pb-6 mb-12">
          <div>
            <span className="text-[10px] tracking-[0.28em] text-earth-sage uppercase font-semibold block mb-2">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="font-editorial text-2xl md:text-3xl lg:text-4xl font-normal text-white tracking-tight">
              Essential Dynamics of Earth Energy
            </h2>
          </div>
          <p className="text-xs text-[#A3A199] font-sans max-w-sm mt-3 md:mt-0 leading-relaxed">
            Understanding the transition from subsurface thermodynamics to clean, dispatchable societal power.
          </p>
        </div>

        {/* 3 Compact Feature Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {FEATURE_STRIP_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between border-t md:border-t-0 md:border-l first:border-l-0 border-[#203D32] pt-6 md:pt-0 md:pl-8 lg:pl-10"
            >
              <div>
                {/* Number / Category Tag */}
                <span className="text-[10px] font-mono tracking-widest text-earth-sage uppercase block mb-3">
                  {item.tag}
                </span>

                {/* Compact Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#152B21] mb-5 border border-[#264539]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover img-editorial-zoom filter grayscale-[20%] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-forest/70 to-transparent" />
                </div>

                {/* Title */}
                <h3 className="font-editorial text-xl lg:text-2xl font-medium text-white tracking-normal mb-3 group-hover:text-earth-sage transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-[#BCB9AF] font-sans leading-relaxed mb-6">
                  {item.subtitle}
                </p>
              </div>

              {/* Text link to its page section */}
              <div className="pt-2 border-t border-[#203D32]">
                <a
                  href={item.targetId}
                  onClick={(e) => handleLinkClick(e, item.targetId)}
                  className="inline-flex items-center space-x-2 text-[11px] font-semibold tracking-[0.2em] text-[#EAE5D9] uppercase hover:text-earth-sage transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
