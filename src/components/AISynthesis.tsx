import { useState, useEffect } from 'react';
import type { SessionReflection, AISynthesis as AISynthesisType } from '@/types/game';

interface AISynthesisProps {
  reflection: SessionReflection;
  onComplete: (synthesis: AISynthesisType) => void;
  onSkip: () => void;
}

const generateMockSynthesis = (reflection: SessionReflection): AISynthesisType => {
  // Demo synthesis based on user input
  const understood = reflection.understood.trim();
  const important = reflection.important.trim();
  const remember = reflection.remember.trim();

  const summaryParts = [];
  if (understood) summaryParts.push(`You explored ${understood.toLowerCase().slice(0, 50)}...`);
  if (important) summaryParts.push(`Key focus: ${important.toLowerCase().slice(0, 40)}.`);
  if (remember) summaryParts.push(`Note: ${remember.toLowerCase().slice(0, 40)}.`);

  const summary = summaryParts.length > 0 
    ? summaryParts.join(' ')
    : "Great focus session! You stayed engaged with the material and made progress.";

  const takeaways = [
    "Consistent practice builds lasting knowledge.",
    "Understanding concepts deeply beats surface-level memorization.",
    "Connecting new ideas to existing knowledge strengthens recall.",
    "Active reflection transforms information into understanding.",
  ];

  const keyTakeaway = summaryParts.length > 0
    ? `Focus on what felt important: ${important || understood || remember}`.slice(0, 100)
    : takeaways[Math.floor(Math.random() * takeaways.length)];

  return { summary, keyTakeaway };
};

export const AISynthesis = ({ reflection, onComplete, onSkip }: AISynthesisProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [synthesis, setSynthesis] = useState<AISynthesisType | null>(null);
  const [displayedSummary, setDisplayedSummary] = useState('');
  const [displayedTakeaway, setDisplayedTakeaway] = useState('');

  useEffect(() => {
    // Simulate AI generation
    const timer = setTimeout(() => {
      const result = generateMockSynthesis(reflection);
      setSynthesis(result);
      setIsGenerating(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [reflection]);

  // Typewriter effect for summary
  useEffect(() => {
    if (!synthesis) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= synthesis.summary.length) {
        setDisplayedSummary(synthesis.summary.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [synthesis]);

  // Typewriter effect for takeaway (starts after summary)
  useEffect(() => {
    if (!synthesis || displayedSummary !== synthesis.summary) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= synthesis.keyTakeaway.length) {
        setDisplayedTakeaway(synthesis.keyTakeaway.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [synthesis, displayedSummary]);

  const isComplete = synthesis && displayedTakeaway === synthesis.keyTakeaway;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-level-purple/20 text-level-purple mb-4">
          <span>🤖</span>
          <span className="font-semibold">AI Synthesis</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          {isGenerating ? 'Analyzing your notes...' : 'Here\'s what stands out'}
        </h2>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-level-purple border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Sage is thinking...</p>
        </div>
      ) : (
        <div className="max-w-lg w-full space-y-6">
          <div className="card-glow p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Summary
            </h3>
            <p className="text-foreground text-lg leading-relaxed">
              {displayedSummary}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {displayedTakeaway && (
            <div className="card-glow p-6 rounded-xl border-2 border-primary/30 animate-scale-in">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                ⭐ Key Takeaway
              </h3>
              <p className="text-foreground text-lg leading-relaxed font-medium">
                {displayedTakeaway}
                {!isComplete && <span className="animate-pulse">|</span>}
              </p>
            </div>
          )}

          {isComplete && (
            <div className="flex flex-col gap-3 animate-slide-up">
              <button
                onClick={() => onComplete(synthesis!)}
                className="btn-primary"
              >
                Save & Earn +10 XP
              </button>
              <button
                onClick={onSkip}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Skip
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
