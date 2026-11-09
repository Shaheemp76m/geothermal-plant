import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FUTURE_TECH } from '../../data/content';

interface FutureSectionProps {
  onOpenReferences: () => void;
}

export const FutureSection: React.FC<FutureSectionProps> = ({ onOpenReferences }) => {
  return (
    <section id="innovation" className="bg-earth-ivory py-16 md:py-24 border-b border-earth-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-earth-forest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-earth-sage" />
            <span>THE NEXT GENERATION OF SUBTERRANEAN TECH</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-earth-forest mb-5 leading-[1.12]">
            Expanding the Subsurface Frontier.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-earth-black/75 font-sans leading-relaxed">
            Conventional hydrothermal projects are geographically confined to natural volcanic belts. Next-generation deep drilling and subsurface engineering aim to decouple geothermal power from rare geological anomalies—unlocking omnipresent heat anywhere on the globe.
          </p>
        </div>

        {/* Emerging Tech Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FUTURE_TECH.map((tech, idx) => (
            <div
              key={idx}
              className="bg-earth-stone-light/40 border border-earth-border p-6 md:p-8 flex flex-col justify-between hover:border-earth-forest transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-earth-muted uppercase">
                    SYSTEM // 0{idx + 1}
                  </span>
                  <span
                    className={`text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 border ${
                      tech.status === 'Field Demonstration'
                        ? 'border-earth-forest text-earth-forest bg-earth-forest/5'
                        : 'border-earth-muted text-earth-muted bg-earth-stone/30'
                    }`}
                  >
                    {tech.status}
                  </span>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl text-earth-forest font-medium mb-3">
                  {tech.name}
                </h3>

                <p className="text-xs sm:text-sm text-earth-black/80 font-sans leading-relaxed mb-5">
                  {tech.description}
                </p>
              </div>

              <div className="pt-4 border-t border-earth-border/70 text-xs font-sans text-earth-black/85">
                <span className="text-earth-forest font-semibold block mb-1 uppercase tracking-wider text-[10px]">
                  Strategic Potential:
                </span>
                <p className="leading-relaxed">{tech.potential}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Readiness Banner */}
        <div className="mt-12 p-8 bg-earth-stone/25 border border-earth-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest text-earth-muted uppercase block mb-1">
              STATUS CLARIFICATION
            </span>
            <p className="text-xs sm:text-sm text-earth-black/80 font-sans leading-relaxed">
              While conventional hydrothermal power is commercially mature worldwide (over 16 GWe installed), deep EGS and closed-loop systems are currently advancing through pilot demonstrations and require continuous capital investment and regulatory frameworks.
            </p>
          </div>
          <button
            onClick={onOpenReferences}
            className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase px-6 py-3 border border-earth-forest text-earth-forest hover:bg-earth-forest hover:text-earth-ivory transition-colors whitespace-nowrap"
          >
            <span>REVIEW DOE ROADMAP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
