import { AVATAR_LEVELS } from '@/types/game';
import type { PlayerStats } from '@/types/game';

interface XPBarProps {
  stats: PlayerStats;
}

export const XPBar = ({ stats }: XPBarProps) => {
  const currentLevelData = AVATAR_LEVELS.find(l => l.level === stats.avatarLevel);
  const progress = stats.xpToNextLevel > 0 
    ? (stats.currentLevelXP / stats.xpToNextLevel) * 100 
    : 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-float">{currentLevelData?.emoji}</span>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Level {stats.level}</p>
              <p className="text-sm font-semibold text-foreground">{currentLevelData?.name}</p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gradient-xp">
                {stats.currentLevelXP} XP
              </span>
              <span className="text-xs text-muted-foreground">
                {stats.xpToNextLevel} XP to next level
              </span>
            </div>
            <div className="xp-bar h-2">
              <div 
                className="xp-bar-fill animate-pulse-glow" 
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold text-gradient-xp">{stats.totalXP}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
        </div>
      </div>
    </div>
  );
};
