import type { PlayerStats } from '@/types/game';

interface StatsScreenProps {
  stats: PlayerStats;
  onClose: () => void;
}

export const StatsScreen = ({ stats, onClose }: StatsScreenProps) => {
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

      <div className="grid grid-cols-2 gap-4 mb-8">
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
