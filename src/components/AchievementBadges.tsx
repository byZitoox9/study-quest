import { useMemo } from 'react';
import type { Achievement, PlayerStats, BookNote } from '@/types/game';

interface AchievementBadgesProps {
  achievements: Achievement[];
  onClose: () => void;
  reduceAnimations?: boolean;
}

export const AchievementBadges = ({ achievements, onClose, reduceAnimations }: AchievementBadgesProps) => {
  const { unlocked, locked } = useMemo(() => {
    const unlocked = achievements.filter(a => a.unlocked);
    const locked = achievements.filter(a => !a.unlocked);
    return { unlocked, locked };
  }, [achievements]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground text-lg"
        >
          ←
        </button>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Achievements
          </h2>
          <p className="text-sm text-muted-foreground">
            {unlocked.length} / {achievements.length} unlocked
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-progress-green rounded-full transition-all duration-500"
            style={{ width: `${(unlocked.length / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Unlocked achievements */}
      {unlocked.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Unlocked
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {unlocked.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`card-glow p-4 rounded-xl border-progress-green/30 bg-progress-green/5 ${
                  !reduceAnimations ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-foreground text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                {achievement.unlockedAt && (
                  <p className="text-xs text-progress-green mt-2">
                    ✓ {new Date(achievement.unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked achievements */}
      {locked.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Locked
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {locked.map((achievement) => (
              <div
                key={achievement.id}
                className="card-glow p-4 rounded-xl opacity-60"
              >
                <div className="text-3xl mb-2 grayscale">{achievement.icon}</div>
                <h4 className="font-semibold text-foreground text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-2">🔒 Locked</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper to calculate achievements from stats
export const calculateAchievements = (
  stats: PlayerStats, 
  notes: BookNote[]
): Achievement[] => {
  const { ACHIEVEMENT_DEFINITIONS } = require('@/types/game');
  const studiedBooks = new Set(stats.sessionHistory.map(s => s.bookId));
  
  return ACHIEVEMENT_DEFINITIONS.map((def: Omit<Achievement, 'unlocked' | 'unlockedAt'>) => {
    let currentValue = 0;
    
    switch (def.requirement.type) {
      case 'sessions':
        currentValue = stats.totalSessions;
        break;
      case 'minutes':
        currentValue = stats.totalMinutes;
        break;
      case 'books':
        currentValue = studiedBooks.size;
        break;
      case 'streak':
        currentValue = stats.streak;
        break;
      case 'notes':
        currentValue = notes.length;
        break;
    }
    
    const unlocked = currentValue >= def.requirement.value;
    
    return {
      ...def,
      unlocked,
      unlockedAt: unlocked ? new Date().toISOString() : undefined,
    };
  });
};
