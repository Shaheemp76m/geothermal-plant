import React from 'react';
import { ANNOUNCEMENT_TEXT } from '../../data/content';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside 
      aria-label="Announcement" 
      className="w-full bg-earth-forest text-[#EAE5D9] text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase py-2.5 px-4 text-center border-b border-[#1D3A2F] select-none flex items-center justify-center gap-3 relative z-50"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
      <span>{ANNOUNCEMENT_TEXT}</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
    </aside>
  );
};
