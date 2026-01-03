import { AVATAR_LEVELS, AvatarLevel } from '@/types/game';

interface AvatarGalleryProps {
  currentLevel: AvatarLevel;
  totalXP: number;
  onClose: () => void;
}

export const AvatarGallery = ({ currentLevel, totalXP, onClose }: AvatarGalleryProps) => {
  const currentIndex = AVATAR_LEVELS.findIndex(l => l.level === currentLevel);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Avatar Gallery</h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>

      <p className="text-muted-foreground mb-8">
        Evolve your avatar by earning XP through focused study sessions.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {AVATAR_LEVELS.map((level, index) => {
          const isUnlocked = totalXP >= level.minXP;
          const isCurrent = level.level === currentLevel;
          
          return (
            <div
              key={level.level}
              className={`avatar-frame p-4 ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''} animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="relative inline-block">
                  <span className="text-5xl block mb-3">{level.emoji}</span>
                  {isCurrent && (
                    <span className="absolute -top-2 -right-2 text-lg">✨</span>
                  )}
                </div>
                <h3 className={`font-display font-bold mb-1 ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {level.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {level.description}
                </p>
                <div className={`text-xs font-medium ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`}>
                  {isUnlocked ? (
                    isCurrent ? 'Current' : '✓ Unlocked'
                  ) : (
                    `${level.minXP} XP required`
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dragon teaser */}
      <div className="mt-8 p-6 rounded-xl border-2 border-dashed border-level-purple/50 text-center animate-slide-up" style={{ animationDelay: '600ms' }}>
        <span className="text-4xl block mb-2">🐉</span>
        <h3 className="font-display font-bold text-level-purple mb-1">Legendary Dragon</h3>
        <p className="text-sm text-muted-foreground">
          The ultimate form awaits at 2000 XP. Keep studying!
        </p>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min(100, (totalXP / 2000) * 100)}%`,
                background: 'linear-gradient(90deg, hsl(var(--level-purple)), hsl(var(--primary)))'
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {totalXP} / 2000 XP
          </p>
        </div>
      </div>
    </div>
  );
};
