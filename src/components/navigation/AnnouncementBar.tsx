import React from 'react';
import { ANNOUNCEMENT_TEXT } from '../../data/content';
import { Compass } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenObservatory?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenObservatory }) => {
  return (
    <aside 
      aria-label="Announcement" 
      className="w-full bg-earth-forest text-[#EAE5D9] text-[9px] sm:text-[10px] md:text-[11px] font-sans tracking-[0.16em] sm:tracking-[0.22em] uppercase py-2 sm:py-2.5 px-3 sm:px-4 text-center border-b border-[#1D3A2F] select-none flex items-center justify-center gap-2 sm:gap-3 relative z-50 overflow-hidden"
    >
      <span className="truncate">{ANNOUNCEMENT_TEXT}</span>
      {onOpenObservatory && (
        <>
          <span className="hidden md:inline text-earth-sage/60">·</span>
          <button
            onClick={onOpenObservatory}
            className="hidden md:inline-flex items-center space-x-1.5 text-earth-sage hover:text-white underline underline-offset-4 decoration-earth-sage/50 transition-colors font-semibold"
          >
            <Compass className="w-3 h-3 text-earth-sage inline" />
            <span>OPEN SUBSURFACE OBSERVATORY →</span>
          </button>
        </>
      )}
    </aside>
  );
};
