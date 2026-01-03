import { useState, useMemo } from 'react';
import type { PlayerStats } from '@/types/game';
import { AVATAR_LEVELS } from '@/types/game';
import { ReadingHeatmap } from './ReadingHeatmap';

interface StatsScreenProps {
  stats: PlayerStats;
  onClose: () => void;
}

type TimeFilter = 'month' | 'year';

export const StatsScreen = ({ stats, onClose }: StatsScreenProps) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');

  const mostReadBook = useMemo(() => {
    return stats.books.reduce((max, book) => 
      book.sessionsCompleted > max.sessionsCompleted ? book : max
    , stats.books[0]);
  }, [stats.books]);

  const overallProgress = useMemo(() => {
    const maxXP = AVATAR_LEVELS[AVATAR_LEVELS.length - 1].minXP;
    return Math.min(100, (stats.totalXP / maxXP) * 100);
  }, [stats.totalXP]);

  const currentLevelData = AVATAR_LEVELS.find(l => l.level === stats.avatarLevel);
  const nextLevelData = AVATAR_LEVELS[AVATAR_LEVELS.findIndex(l => l.level === stats.avatarLevel) + 1];

  const statItems = [
    { label: 'Total Sessions', value: stats.totalSessions, icon: '📖' },
    { label: 'Focus Minutes', value: stats.totalMinutes, icon: '⏱️' },
    { label: 'Total XP', value: stats.totalXP, icon: '⭐' },
    { label: 'Current Level', value: stats.level, icon: '🎯' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Your Stats</h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Streak Display */}
      <div className="card-glow p-4 rounded-xl mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <p className="text-2xl font-display font-bold text-gradient-xp">{stats.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Keep it going!</p>
      </div>

      {/* Time Filter Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTimeFilter('month')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            timeFilter === 'month' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-foreground hover:bg-muted'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setTimeFilter('year')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            timeFilter === 'year' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-foreground hover:bg-muted'
          }`}
        >
          Year
        </button>
      </div>

      {/* Reading Heatmap */}
      <div className="mb-6">
        <h3 className="text-lg font-display font-semibold text-foreground mb-3">Reading Activity</h3>
        <ReadingHeatmap sessions={stats.sessionHistory} timeFilter={timeFilter} />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statItems.map((item, index) => (
          <div 
            key={item.label}
            className="stat-card animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="text-3xl mb-2 block">{item.icon}</span>
            <p className="text-3xl font-display font-bold text-gradient-xp">{item.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Most Read Book */}
      {mostReadBook && mostReadBook.sessionsCompleted > 0 && (
        <div className="card-glow p-4 rounded-xl mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Most Read Book</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{mostReadBook.icon}</span>
            <div>
              <h4 className="font-semibold text-foreground">{mostReadBook.title}</h4>
              <p className="text-sm text-muted-foreground">{mostReadBook.sessionsCompleted} sessions completed</p>
            </div>
          </div>
        </div>
      )}

      {/* Overall Character Progress */}
      <div className="card-glow p-4 rounded-xl mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Character Progress</p>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl">{currentLevelData?.emoji}</span>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-foreground">{currentLevelData?.name}</span>
              {nextLevelData && (
                <span className="text-xs text-muted-foreground">→ {nextLevelData.name}</span>
              )}
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700"
                style={{ 
                  width: `${overallProgress}%`,
                  background: 'var(--gradient-level)'
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.totalXP} / {AVATAR_LEVELS[AVATAR_LEVELS.length - 1].minXP} XP to max level
            </p>
          </div>
        </div>
      </div>

      {/* Book Progress */}
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">Book Progress</h3>
      <div className="space-y-3">
        {stats.books.map((book, index) => (
          <div 
            key={book.id}
            className="card-glow p-4 rounded-xl animate-slide-up"
            style={{ animationDelay: `${(index + 4) * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{book.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-foreground">{book.title}</h4>
                  <span className="text-sm text-progress-green font-medium">
                    Lv.{Math.floor(book.progress / 20) + 1}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-progress-green rounded-full transition-all duration-500"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {book.progress}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {book.sessionsCompleted} sessions completed
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
