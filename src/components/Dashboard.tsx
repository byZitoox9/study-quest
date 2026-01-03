import { AVATAR_LEVELS } from '@/types/game';
import type { PlayerStats, Book } from '@/types/game';

interface DashboardProps {
  stats: PlayerStats;
  onStartSession: () => void;
  onViewStats: () => void;
  onViewGallery: () => void;
}

export const Dashboard = ({ stats, onStartSession, onViewStats, onViewGallery }: DashboardProps) => {
  const currentLevelData = AVATAR_LEVELS.find(l => l.level === stats.avatarLevel);
  const recentBook = stats.books.find(b => b.sessionsCompleted > 0) || stats.books[0];

  return (
    <div className="animate-fade-in">
      {/* Avatar Card */}
      <div className="card-glow p-6 rounded-2xl mb-6 text-center">
        <div 
          className="text-7xl mb-4 cursor-pointer hover:scale-110 transition-transform"
          onClick={onViewGallery}
        >
          {currentLevelData?.emoji}
        </div>
        <h2 className="text-xl font-display font-bold text-foreground mb-1">
          {currentLevelData?.name}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">Level {stats.level}</p>
        <button
          onClick={onViewGallery}
          className="text-sm text-primary hover:underline"
        >
          View Evolution Path →
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
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
        <div className="card-glow p-4 rounded-xl mb-6">
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
        
        <div className="flex gap-3">
          <button
            onClick={onViewStats}
            className="btn-secondary flex-1"
          >
            📊 Stats
          </button>
          <button
            onClick={onViewGallery}
            className="btn-secondary flex-1"
          >
            🎭 Gallery
          </button>
        </div>
      </div>

      {/* Demo Note */}
      <p className="text-xs text-center text-muted-foreground mt-6">
        Demo mode • Progress resets on refresh
      </p>
    </div>
  );
};
