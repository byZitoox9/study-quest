import { useState } from 'react';
import { AVATAR_LEVELS } from '@/types/game';
import type { PlayerStats, WeeklyGoal, Achievement } from '@/types/game';
import { WeeklyGoals } from './WeeklyGoals';
import { LearningReminders } from './LearningReminders';

interface DashboardProps {
  stats: PlayerStats;
  weeklyGoals: WeeklyGoal[];
  achievements: Achievement[];
  onStartSession: () => void;
  onViewStats: () => void;
  onViewEvolution: () => void;
  onViewSettings: () => void;
  onViewSocial: () => void;
  onViewAchievements: () => void;
  onGoalComplete: (goalId: string) => void;
  reduceAnimations?: boolean;
}

export const Dashboard = ({ 
  stats, 
  weeklyGoals,
  achievements,
  onStartSession, 
  onViewStats, 
  onViewEvolution, 
  onViewSettings, 
  onViewSocial,
  onViewAchievements,
  onGoalComplete,
  reduceAnimations
}: DashboardProps) => {
  const [showReminder, setShowReminder] = useState(true);
  const currentLevelData = AVATAR_LEVELS.find(l => l.level === stats.avatarLevel);
  const recentBook = stats.books.find(b => b.sessionsCompleted > 0) || stats.books[0];
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Learning Reminder */}
      {showReminder && (
        <LearningReminders 
          stats={stats} 
          onDismiss={() => setShowReminder(false)}
        />
      )}

      {/* Streak Indicator */}
      {stats.streak > 0 && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-orange-400">{stats.streak} day streak</span>
          </div>
        </div>
      )}

      {/* Quick Stats (Dashboard) */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card">
          <p className="text-2xl font-bold text-gradient-xp">{stats.totalSessions}</p>
          <p className="text-xs text-muted-foreground">Sessions</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-session-blue">{stats.totalMinutes}</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
        <div className="stat-card cursor-pointer hover:border-primary/50 transition-colors" onClick={onViewStats}>
          <p className="text-2xl font-bold text-progress-green">{stats.books.filter(b => b.progress > 0).length}</p>
          <p className="text-xs text-muted-foreground">Books</p>
        </div>
      </div>

      {/* Recent Book */}
      {recentBook && recentBook.sessionsCompleted > 0 && (
        <div className="card-glow p-4 rounded-xl">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Continue Learning</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{recentBook.icon}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{recentBook.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-progress-green rounded-full"
                    style={{ width: `${recentBook.progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{recentBook.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onStartSession}
          className="btn-primary w-full py-4 text-lg"
        >
          📚 Start Focus Session
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onViewStats}
            className="btn-secondary"
          >
            📊 Stats
          </button>
          <button
            onClick={onViewEvolution}
            className="btn-secondary"
          >
            🎭 Evolution
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onViewSocial}
            className="btn-secondary"
          >
            👥 Community
          </button>
          <button
            onClick={onViewAchievements}
            className="btn-secondary relative"
          >
            🏆 Badges
            {unlockedAchievements > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-progress-green text-xs font-bold rounded-full flex items-center justify-center">
                {unlockedAchievements}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={onViewSettings}
          className="btn-secondary w-full"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Avatar Card */}
      <div 
        className="card-glow p-6 rounded-2xl text-center cursor-pointer hover:border-primary/50 transition-colors"
        onClick={onViewEvolution}
      >
        <div className="text-7xl mb-4 hover:scale-110 transition-transform">
          {currentLevelData?.emoji}
        </div>
        <h2 className="text-xl font-display font-bold text-foreground mb-1">
          {currentLevelData?.name}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">Level {stats.level}</p>
        <span className="btn-secondary inline-block">
          View Evolution Path →
        </span>
      </div>

      {/* Weekly Goals */}
      <WeeklyGoals 
        goals={weeklyGoals} 
        onGoalComplete={onGoalComplete}
        reduceAnimations={reduceAnimations}
      />

      {/* Demo Note */}
      <p className="text-xs text-center text-muted-foreground">
        Demo mode • Progress resets on refresh
      </p>
    </div>
  );
};
