import { useState, useEffect, useCallback } from 'react';
import type { Book } from '@/types/game';

interface FocusSessionProps {
  book: Book;
  onComplete: () => void;
  onCancel: () => void;
}

const DEMO_DURATION = 10; // 10 seconds for demo (would be 1800 for 30 min)
const FULL_DURATION = 1800; // 30 minutes in seconds

export const FocusSession = ({ book, onComplete, onCancel }: FocusSessionProps) => {
  const [timeRemaining, setTimeRemaining] = useState(DEMO_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [isDemo, setIsDemo] = useState(true);

  const progress = ((DEMO_DURATION - timeRemaining) / DEMO_DURATION) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeRemaining, onComplete]);

  const motivationalMessages = [
    "You're doing great! Stay focused.",
    "Every minute counts toward mastery.",
    "Deep focus unlocks deep understanding.",
    "Your future self will thank you.",
  ];

  const currentMessage = motivationalMessages[Math.floor((DEMO_DURATION - timeRemaining) / 3) % motivationalMessages.length];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">{book.icon}</span>
          <h2 className="text-xl font-display font-bold text-foreground">{book.title}</h2>
        </div>
        <p className="text-muted-foreground">Focus Session in Progress</p>
      </div>

      <div className="timer-ring mb-8">
        <svg width="280" height="280" className="drop-shadow-lg">
          {/* Background circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--session-blue))" />
              <stop offset="100%" stopColor="hsl(var(--level-purple))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-display font-bold text-foreground">
            {formatTime(timeRemaining)}
          </span>
          <span className="text-sm text-muted-foreground mt-2">
            {isPaused ? 'Paused' : 'remaining'}
          </span>
        </div>
      </div>

      <p className="text-center text-muted-foreground mb-8 max-w-sm animate-fade-in" key={currentMessage}>
        {currentMessage}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="btn-secondary"
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>
        <button
          onClick={onCancel}
          className="btn-secondary text-destructive hover:bg-destructive/10"
        >
          Cancel Session
        </button>
      </div>

      {isDemo && (
        <p className="text-xs text-muted-foreground mt-8 text-center">
          Demo mode: 10-second session (normally 30 minutes)
        </p>
      )}
    </div>
  );
};
