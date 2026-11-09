import React from 'react';
import { ANNOUNCEMENT_TEXT } from '../../data/content';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside 
      aria-label="Announcement" 
      className="w-full bg-earth-forest text-[#EAE5D9] text-[9px] sm:text-[10px] md:text-[11px] font-sans tracking-[0.16em] sm:tracking-[0.24em] uppercase py-2 sm:py-2.5 px-3 sm:px-4 text-center border-b border-[#1D3A2F] select-none flex items-center justify-center gap-2 sm:gap-3 relative z-50 overflow-hidden"
    >
      <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-earth-sage animate-pulse shrink-0" />
      <span className="truncate">{ANNOUNCEMENT_TEXT}</span>
      <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-earth-sage animate-pulse shrink-0" />
    </aside>
  );
};
