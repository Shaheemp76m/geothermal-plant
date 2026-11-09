import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { APPLICATION_CARDS } from '../../data/content';

export const ExploreGeothermal: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="applications" className="bg-earth-ivory py-14 sm:py-20 md:py-24 border-b border-earth-border scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 md:mb-16">
          <span className="text-[10px] tracking-[0.24em] sm:tracking-[0.28em] font-semibold text-earth-forest uppercase block mb-2 sm:mb-3">
            DIVERSE THERMAL APPLICATIONS
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-earth-forest mb-3 sm:mb-4">
            More Than Electricity.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-earth-black/75 font-sans leading-relaxed">
            From multi-megawatt high-temperature electrical generation to municipal district warmth and agricultural food production, geothermal energy serves diverse human needs across the entire thermal enthalpy spectrum.
          </p>
        </div>

        {/* 4 Editorial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {APPLICATION_CARDS.map((card, idx) => {
            const isExpanded = expandedId === card.id;
            return (
              <div
                key={card.id}
                className="bg-earth-ivory border border-earth-border flex flex-col justify-between group hover:border-earth-forest transition-all duration-300"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-earth-stone/30 border-b border-earth-border">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover img-editorial-zoom filter saturate-[0.9]"
                    />
                    <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-earth-ivory/95 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-mono tracking-widest text-earth-forest border border-earth-border">
                      {card.operatingTemp}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 md:p-7">
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-sage uppercase block mb-1.5 sm:mb-2">
                      0{idx + 1} / {card.tag}
                    </span>
                    <h3 className="font-editorial text-lg sm:text-xl font-medium text-earth-forest mb-2 sm:mb-3">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-earth-black/75 font-sans leading-relaxed mb-3 sm:mb-4">
                      {card.description}
                    </p>

                    {/* Expandable Technical Details */}
                    {isExpanded && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-earth-border/60 text-xs text-earth-black/85 space-y-2 animate-fadeIn font-sans">
                        {card.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start space-x-2">
                            <span className="text-earth-sage font-bold text-sm leading-none">•</span>
                            <span className="leading-snug">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Toggle */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2">
                  <button
                    onClick={() => toggleCard(card.id)}
                    aria-expanded={isExpanded}
                    className="w-full py-2 sm:py-2.5 px-3 border border-earth-border flex items-center justify-between text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-earth-forest hover:bg-earth-stone/25 transition-colors"
                  >
                    <span>{isExpanded ? 'CONCEAL DETAILS' : 'INSPECT SPECIFICATION'}</span>
                    {isExpanded ? <Minus className="w-3.5 h-3.5 text-earth-sage" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Note */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-earth-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-earth-muted font-sans gap-3">
          <span className="text-[11px] sm:text-xs leading-relaxed">* High-enthalpy steam drives turbines directly; mid-to-low temperatures power cascading district networks and food greenhouses.</span>
          <a
            href="#impact"
            className="inline-flex items-center space-x-1.5 font-semibold tracking-wider uppercase text-earth-forest hover:text-earth-sage transition-colors shrink-0"
          >
            <span className="text-[11px] sm:text-xs">REVIEW FOOTPRINT</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
