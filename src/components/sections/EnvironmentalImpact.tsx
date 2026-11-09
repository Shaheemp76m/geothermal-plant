import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { IMPACT_POINTS } from '../../data/content';

export const EnvironmentalImpact: React.FC = () => {
  return (
    <section id="impact" className="bg-[#141513] text-[#E8E6DF] py-16 md:py-24 border-b border-[#232521]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-[10px] tracking-[0.28em] font-semibold text-[#8EAA8A] uppercase block mb-3">
            BALANCED ASSESSMENT & RESPONSIBILITY
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-5 leading-[1.12]">
            Energy for Today. Consideration for Tomorrow.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A8A69E] font-sans leading-relaxed">
            A credible transition requires scientific honesty. While geothermal power affords unmatched continuous baseload reliability and minimal surface footprints, responsible extraction requires rigorous subsurface reservoir stewardship, closed-loop fluid containment, and continuous seismic monitoring.
          </p>
        </div>

        {/* 4 Balanced Impact Cards (2 Strengths & 2 Key Environmental Stewardship Principles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {IMPACT_POINTS.map((point, idx) => (
            <div
              key={idx}
              className="bg-[#1B1D1A] border border-[#2B2E28] p-6 md:p-8 flex flex-col justify-between hover:border-[#748A70] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#8EAA8A] uppercase">
                    {point.tag}
                  </span>
                  {point.isStrength ? (
                    <span className="inline-flex items-center space-x-1.5 text-[10px] font-semibold text-[#8EAA8A] bg-[#8EAA8A]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PRIMARY STRENGTH</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1.5 text-[10px] font-semibold text-[#E5A862] bg-[#E5A862]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>CRITICAL STEWARDSHIP</span>
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl text-white font-medium mb-3">
                  {point.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#CCCCCC] font-sans leading-relaxed mb-6">
                  {point.description}
                </p>
              </div>

              {/* Scientific Qualifier / Caveat */}
              <div className="pt-4 border-t border-[#2B2E28] text-xs text-[#9E9D95] font-sans leading-relaxed">
                <span className="text-[#8EAA8A] font-semibold block mb-1 text-[11px] uppercase tracking-wider">
                  Technical Qualification:
                </span>
                <p>{point.qualification}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote on Scientific Credibility */}
        <div className="mt-12 p-6 bg-[#1A1C18] border border-[#282B24] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-white font-sans">
              PEER-REVIEWED SCIENTIFIC DISCLOSURE
            </span>
            <p className="text-xs text-[#9E9D95] font-sans">
              Data synthesized from IPCC SRREN, NREL Life Cycle Assessment registries, and US DOE Geothermal Technologies Office benchmarks.
            </p>
          </div>
          <a
            href="#references"
            className="text-[11px] font-semibold tracking-widest uppercase text-[#8EAA8A] hover:text-white underline underline-offset-4 whitespace-nowrap"
          >
            VIEW SOURCES & METHODOLOGY
          </a>
        </div>
      </div>
    </section>
  );
};
