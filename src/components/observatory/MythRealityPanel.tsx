import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { MYTH_QUESTIONS, MythQuestion } from '../../data/observatoryData';

interface MythRealityPanelProps {
  shouldReduceMotion: boolean;
}

export const MythRealityPanel: React.FC<MythRealityPanelProps> = ({ shouldReduceMotion }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});

  const currentQ: MythQuestion = MYTH_QUESTIONS[currentIdx];
  const currentAnswer = answers[currentQ.id];

  const handleAnswer = (userChoice: boolean) => {
    // userChoice: true = Myth, false = Reality
    setAnswers((prev) => ({ ...prev, [currentQ.id]: userChoice }));
  };

  const handleNext = () => {
    if (currentIdx < MYTH_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const isUserCorrect = currentAnswer !== undefined && currentAnswer === currentQ.isMyth;

  return (
    <div className="flex flex-col h-full overflow-hidden space-y-3">
      {/* Panel Sub-Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#202521] shrink-0">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-3.5 h-3.5 text-earth-sage" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-earth-sage font-semibold">
            MYTH VS. SCIENTIFIC REALITY
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#7A8C81]">
          CASE 0{currentIdx + 1} / 0{MYTH_QUESTIONS.length}
        </span>
      </div>

      {/* Main Interactive Statement Card */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none space-y-3 pr-1">
        <div className="p-3 bg-[#151C18] border border-[#233027] rounded-lg space-y-2">
          <div className="flex items-center justify-between text-[9px] font-mono text-[#829287]">
            <span>HYPOTHESIS ASSESSMENT</span>
            <span className="font-bold text-white">0{currentIdx + 1}</span>
          </div>

          <p className="font-editorial text-base sm:text-lg text-white font-medium leading-snug">
            &ldquo;{currentQ.statement}&rdquo;
          </p>

          {/* User Choice Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => handleAnswer(true)}
              className={`py-2 px-3 rounded font-mono text-xs uppercase tracking-wider font-semibold transition-all border ${
                currentAnswer === true
                  ? currentQ.isMyth
                    ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                    : 'bg-rose-900/60 border-rose-500 text-rose-200'
                  : 'bg-[#19221C] text-[#C2CDC5] border-[#2B3830] hover:border-earth-sage hover:text-white'
              }`}
            >
              MYTH
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className={`py-2 px-3 rounded font-mono text-xs uppercase tracking-wider font-semibold transition-all border ${
                currentAnswer === false
                  ? !currentQ.isMyth
                    ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                    : 'bg-rose-900/60 border-rose-500 text-rose-200'
                  : 'bg-[#19221C] text-[#C2CDC5] border-[#2B3830] hover:border-earth-sage hover:text-white'
              }`}
            >
              REALITY
            </button>
          </div>
        </div>

        {/* Revealed Scientific Explanation */}
        <AnimatePresence mode="wait">
          {currentAnswer !== undefined && (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-3 rounded-lg border space-y-2.5 ${
                isUserCorrect
                  ? 'bg-[#131F18] border-emerald-600/40'
                  : 'bg-[#1A1614] border-amber-600/40'
              }`}
            >
              {/* Verdict Header */}
              <div className="flex items-center space-x-2">
                {isUserCorrect ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-earth-sage block">
                    SCIENTIFIC VERDICT
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    {currentQ.verdictTitle}
                  </span>
                </div>
              </div>

              {/* Peer-Reviewed Explanation */}
              <p className="font-sans text-xs text-[#C8D3CB] leading-relaxed">
                {currentQ.scientificExplanation}
              </p>

              {/* Key Metric Pill */}
              <div className="p-2 bg-black/40 border border-white/10 rounded flex items-center justify-between text-xs">
                <span className="font-mono text-[9px] text-[#86998D] uppercase tracking-wider">
                  {currentQ.keyMetric.label}
                </span>
                <span className="font-mono text-[11px] font-bold text-white">
                  {currentQ.keyMetric.value}
                </span>
              </div>

              {/* Sourced Reference */}
              <div className="flex items-center space-x-1.5 pt-1 text-[9px] font-mono text-[#788C80]">
                <BookOpen className="w-3 h-3 text-earth-sage" />
                <span className="truncate">SOURCE: {currentQ.source}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Case Navigation Footer */}
      <div className="pt-2 border-t border-[#202521] flex items-center justify-between shrink-0 text-xs font-mono">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="px-2.5 py-1 rounded bg-[#161B18] border border-[#252E28] text-[#86958C] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>PREV</span>
        </button>

        <span className="text-[10px] text-[#788C80]">
          {Object.keys(answers).length} of {MYTH_QUESTIONS.length} RESOLVED
        </span>

        <button
          onClick={handleNext}
          disabled={currentIdx === MYTH_QUESTIONS.length - 1}
          className="px-2.5 py-1 rounded bg-[#161B18] border border-[#252E28] text-[#86958C] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
        >
          <span>NEXT</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
