import React from 'react';
import { Clock, Leaf, Layers, Compass } from 'lucide-react';
import { BENEFITS_ITEMS } from '../../data/content';

const iconMap = {
  Clock: Clock,
  Leaf: Leaf,
  Layers: Layers,
  Compass: Compass,
};

export const BenefitsStrip: React.FC = () => {
  return (
    <section className="bg-earth-stone-light/70 py-16 md:py-20 border-b border-earth-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Pre-label */}
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.28em] font-semibold text-earth-green uppercase block mb-2">
            PROVEN ATTRIBUTES
          </span>
          <h2 className="font-editorial text-2xl md:text-3xl text-earth-black font-normal tracking-tight">
            Fundamental Principles of Subsurface Heat
          </h2>
        </div>

        {/* 4 Concise Items with Line Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS_ITEMS.map((item, idx) => {
            const IconComponent = iconMap[item.iconName];
            return (
              <div
                key={idx}
                className="bg-earth-ivory p-6 md:p-8 border border-earth-border flex flex-col justify-between hover:border-earth-green/60 transition-all duration-300 shadow-[0_4px_20px_rgba(17,17,15,0.02)] group"
              >
                <div>
                  {/* Icon & Metric */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-editorial text-2xl md:text-3xl font-bold tracking-tight text-earth-black group-hover:text-earth-green transition-colors">
                      {item.metric}
                    </span>
                    <div className="p-2.5 rounded-full bg-earth-stone/30 text-earth-black/70 group-hover:text-earth-green group-hover:bg-earth-green/10 transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-semibold tracking-[0.18em] text-earth-black uppercase mb-3 font-sans">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-earth-black/70 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footnote qualifier */}
                <div className="mt-6 pt-3 border-t border-earth-border/50 flex items-center justify-between text-[10px] font-mono text-earth-muted">
                  <span>SPEC · 0{idx + 1}</span>
                  <span>VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
