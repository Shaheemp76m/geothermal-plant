import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface SubsurfaceBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  depthOrTag?: string;
  children: React.ReactNode;
  shouldReduceMotion?: boolean;
}

export const SubsurfaceBottomSheet: React.FC<SubsurfaceBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  category,
  depthOrTag,
  children,
  shouldReduceMotion = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-none md:hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-h-[75dvh] bg-[#111713] border-t border-[#232F26] rounded-t-2xl shadow-2xl flex flex-col pointer-events-auto pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] overflow-hidden"
          >
            {/* Drag Handle Bar */}
            <div
              onClick={onClose}
              className="w-full pt-2.5 pb-1.5 flex flex-col items-center justify-center cursor-pointer active:opacity-75"
            >
              <div className="w-10 h-1 bg-[#3A483F] rounded-full" />
            </div>

            {/* Header */}
            <div className="px-4 py-2 border-b border-[#1E2821] flex items-center justify-between shrink-0">
              <div className="min-w-0 pr-2">
                <div className="flex items-center space-x-2 text-[9px] font-mono text-earth-sage uppercase">
                  {category && (
                    <span className="px-1.5 py-0.5 bg-earth-forest/70 border border-earth-sage/30 rounded font-semibold">
                      {category}
                    </span>
                  )}
                  {depthOrTag && <span className="text-[#9BAAA0] truncate">{depthOrTag}</span>}
                </div>
                <h3 className="font-editorial text-base font-medium text-white truncate mt-0.5">
                  {title}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-[#1A231C] text-[#93A598] hover:text-white hover:bg-[#253229] transition-colors shrink-0"
                aria-label="Close bottom sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="p-4 overflow-y-auto min-h-0 flex-1 space-y-3 font-sans text-xs text-[#CBD8CE]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
