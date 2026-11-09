import React from 'react';
import { ANNOUNCEMENT_TEXT } from '../../data/content';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-[#0D0D0C] text-[#E5E0D5] text-[11px] font-sans tracking-[0.22em] uppercase py-2 px-4 text-center border-b border-[#232521] select-none flex items-center justify-center gap-3">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-earth-green animate-pulse" />
      <span>{ANNOUNCEMENT_TEXT}</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-earth-green animate-pulse" />
    </div>
  );
};
