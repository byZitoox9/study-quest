import { useMemo } from 'react';
import type { PlayerStats } from '@/types/game';

interface LearningRemindersProps {
  stats: PlayerStats;
  onDismiss?: () => void;
}

export const LearningReminders = ({ stats, onDismiss }: LearningRemindersProps) => {
  const reminder = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = stats.sessionHistory.filter(s => s.date === today);
    
    // Check if user hasn't studied today
    if (todaySessions.length === 0) {
      // Find books not studied today
      const todayBookIds = new Set(todaySessions.map(s => s.bookId));
      const unstudiedBooks = stats.books.filter(
        b => !todayBookIds.has(b.id) && b.sessionsCompleted > 0
      );
      
      if (unstudiedBooks.length > 0) {
        return {
          type: 'book' as const,
          message: `You haven't studied ${unstudiedBooks[0].title} today.`,
          icon: unstudiedBooks[0].icon,
          action: 'Continue where you left off!',
        };
      }

      // Streak reminder
      if (stats.streak > 0) {
        return {
          type: 'streak' as const,
          message: 'Keep your streak alive!',
          icon: '🔥',
          action: `You're on a ${stats.streak} day streak. Don't break it!`,
        };
      }

      return {
        type: 'general' as const,
        message: 'Ready for a study session?',
        icon: '📚',
        action: 'Start learning and earn XP!',
      };
    }

    // Encourage more sessions
    if (todaySessions.length === 1) {
      return {
        type: 'encourage' as const,
        message: 'Great start today!',
        icon: '⭐',
        action: 'One more session to boost your progress?',
      };
    }

    return null;
  }, [stats]);

  if (!reminder) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 to-session-blue/10 border border-primary/20 p-4 animate-fade-in">
      {/* Mascot peek */}
      <div className="absolute -right-2 -top-2 text-4xl opacity-50">
        🦉
      </div>
      
      <div className="flex items-start gap-3 pr-8">
        <span className="text-2xl">{reminder.icon}</span>
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">{reminder.message}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{reminder.action}</p>
        </div>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
