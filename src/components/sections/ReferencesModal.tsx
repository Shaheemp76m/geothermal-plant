import React from 'react';
import { ExternalLink, X, BookOpen } from 'lucide-react';
import { SCIENTIFIC_REFERENCES } from '../../data/content';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-earth-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-earth-ivory w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-earth-border shadow-2xl p-6 sm:p-10 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="references-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close references modal"
          className="absolute top-6 right-6 p-2 text-earth-black hover:text-earth-green transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-earth-border pb-6 mb-8 pr-8">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] font-semibold text-earth-green uppercase mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>PRIMARY SCIENTIFIC ARCHIVE</span>
          </div>
          <h2 id="references-title" className="font-editorial text-2xl sm:text-3xl text-earth-black font-medium">
            Data Citations & Methodological Sources
          </h2>
          <p className="text-xs sm:text-sm text-earth-black/70 font-sans mt-2 leading-relaxed">
            All thermodynamic metrics, lifecycle greenhouse gas calculations, capacity factor disclosures, and readiness assessments presented on this platform originate from peer-reviewed energy institutions.
          </p>
        </div>

        {/* Citation List */}
        <div className="space-y-6">
          {SCIENTIFIC_REFERENCES.map((ref, idx) => (
            <div
              key={idx}
              className="p-5 bg-earth-stone-light/40 border border-earth-border flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-earth-muted uppercase mb-1">
                  <span>{ref.source}</span>
                  <span>{ref.year}</span>
                </div>
                <h3 className="font-editorial text-base sm:text-lg font-medium text-earth-black">
                  {ref.title}
                </h3>
                <p className="text-xs sm:text-sm text-earth-black/75 font-sans mt-2 leading-relaxed">
                  {ref.description}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold tracking-wider uppercase text-earth-green hover:text-earth-black transition-colors"
                >
                  <span>ACCESS OFFICIAL REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-earth-border flex items-center justify-between">
          <span className="text-[11px] text-earth-muted font-sans">
            Curated by Geothermal Green Research Group · Updated 2026
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-earth-black text-earth-ivory text-xs font-semibold tracking-widest uppercase hover:bg-earth-green transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
