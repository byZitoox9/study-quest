import { useState, useEffect, useRef } from 'react';

const HELP_MESSAGES = [
  { id: 1, title: 'Getting Started', message: 'Tap "Start Focus Session" to begin a 30-minute study session. Stay focused and earn XP!' },
  { id: 2, title: 'Track Progress', message: 'Each book has its own level. The more you study, the higher your book mastery grows!' },
  { id: 3, title: 'Earn XP', message: 'Complete sessions, write reflections, and use AI synthesis to earn XP and level up your avatar.' },
  { id: 4, title: 'Weekly Goals', message: 'Check your weekly goals for bonus XP. Complete them before the week ends!' },
  { id: 5, title: 'Evolution Path', message: 'Watch your avatar evolve from Toddler to Dragon as you gain XP!' },
  { id: 6, title: 'Stay Consistent', message: 'Keep your streak alive by studying every day. Consistency is key!' },
];

interface MascotHelperProps {
  reduceAnimations?: boolean;
}

export const MascotHelper = ({ reduceAnimations }: MascotHelperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const promptTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Show prompt after 30 seconds of idle time
  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
      setShowPrompt(false);
      
      idleTimerRef.current = setTimeout(() => {
        if (!isOpen) {
          setShowPrompt(true);
          // Hide prompt after 5 seconds
          promptTimerRef.current = setTimeout(() => setShowPrompt(false), 5000);
        }
      }, 30000);
    };

    // Listen for user activity
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetIdleTimer));
    resetIdleTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
    };
  }, [isOpen]);

  const handleNext = () => {
    setCurrentMessageIndex((prev) => (prev + 1) % HELP_MESSAGES.length);
  };

  const handlePrev = () => {
    setCurrentMessageIndex((prev) => (prev - 1 + HELP_MESSAGES.length) % HELP_MESSAGES.length);
  };

  const currentMessage = HELP_MESSAGES[currentMessageIndex];

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Prompt bubble */}
        {showPrompt && !isOpen && (
          <div 
            className={`absolute bottom-full right-0 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg text-sm whitespace-nowrap ${
              !reduceAnimations ? 'animate-fade-in' : ''
            }`}
          >
            <span className="text-muted-foreground">Need help? Click me!</span>
            <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-card border-r border-b border-border" />
          </div>
        )}
        
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowPrompt(false);
          }}
          className={`w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center text-3xl transition-transform ${
            !reduceAnimations ? 'hover:scale-110' : ''
          } ${showPrompt && !reduceAnimations ? 'animate-pulse' : ''}`}
          aria-label="Help"
        >
          🦉
        </button>
      </div>

      {/* Help Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div 
            className={`relative w-full max-w-sm mx-4 mb-24 sm:mb-0 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden ${
              !reduceAnimations ? 'animate-scale-in' : ''
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-primary/10 border-b border-border">
              <span className="text-3xl">🦉</span>
              <div>
                <h3 className="font-display font-bold text-foreground">Ollie the Owl</h3>
                <p className="text-xs text-muted-foreground">Your Study Guide</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>

            {/* Message Content */}
            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">{currentMessage.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentMessage.message}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-xs text-muted-foreground">
                  {currentMessageIndex + 1} / {HELP_MESSAGES.length}
                </span>
                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
