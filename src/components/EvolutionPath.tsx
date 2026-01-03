import { AVATAR_LEVELS, AvatarLevel } from '@/types/game';

interface EvolutionPathProps {
  currentLevel: AvatarLevel;
  totalXP: number;
  onClose: () => void;
}

export const EvolutionPath = ({ currentLevel, totalXP, onClose }: EvolutionPathProps) => {
  const currentIndex = AVATAR_LEVELS.findIndex(l => l.level === currentLevel);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Evolution Path</h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>

      <p className="text-muted-foreground mb-8">
        Your journey from curious learner to legendary dragon.
      </p>

      {/* Horizontal XP Roadmap */}
      <div className="relative mb-8">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-muted rounded-full">
          <div 
            className="h-full rounded-full transition-all duration-700"
            style={{ 
              width: `${Math.min(100, (totalXP / AVATAR_LEVELS[AVATAR_LEVELS.length - 1].minXP) * 100)}%`,
              background: 'var(--gradient-level)'
            }}
          />
        </div>

        {/* Level Nodes */}
        <div className="relative flex justify-between">
          {AVATAR_LEVELS.map((level, index) => {
            const isUnlocked = totalXP >= level.minXP;
            const isCurrent = level.level === currentLevel;
            const progress = isUnlocked ? 100 : index > 0 
              ? Math.max(0, ((totalXP - AVATAR_LEVELS[index - 1].minXP) / (level.minXP - AVATAR_LEVELS[index - 1].minXP)) * 100)
              : (totalXP / level.minXP) * 100;

            return (
              <div 
                key={level.level} 
                className="flex flex-col items-center z-10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Node */}
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                    isCurrent 
                      ? 'ring-4 ring-primary ring-offset-2 ring-offset-background animate-pulse-glow' 
                      : isUnlocked 
                        ? 'bg-card border-2 border-primary' 
                        : 'bg-muted border-2 border-border opacity-50'
                  }`}
                  style={isCurrent ? { background: 'var(--gradient-level)' } : undefined}
                >
                  {level.emoji}
                </div>

                {/* Label */}
                <div className="mt-2 text-center">
                  <p className={`text-xs font-semibold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {level.name.split(' ')[0]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {level.minXP} XP
                  </p>
                </div>

                {/* Current Indicator */}
                {isCurrent && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      You
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Level Details */}
      <div className="card-glow p-6 rounded-xl mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{AVATAR_LEVELS[currentIndex]?.emoji}</span>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">
              {AVATAR_LEVELS[currentIndex]?.name}
            </h3>
            <p className="text-muted-foreground">{AVATAR_LEVELS[currentIndex]?.description}</p>
            <p className="text-sm text-primary mt-1">
              {totalXP} XP earned
            </p>
          </div>
        </div>
      </div>

      {/* Next Level Preview */}
      {currentIndex < AVATAR_LEVELS.length - 1 && (
        <div className="card-glow p-4 rounded-xl mb-6 opacity-80">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Next Evolution</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl grayscale">{AVATAR_LEVELS[currentIndex + 1]?.emoji}</span>
            <div>
              <h4 className="font-semibold text-foreground">{AVATAR_LEVELS[currentIndex + 1]?.name}</h4>
              <p className="text-sm text-muted-foreground">
                {AVATAR_LEVELS[currentIndex + 1]?.minXP - totalXP} XP to unlock
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dragon Teaser */}
      <div className="mt-6 p-6 rounded-xl border-2 border-dashed border-level-purple/50 text-center">
        <span className="text-4xl block mb-2">🐉</span>
        <h3 className="font-display font-bold text-level-purple mb-1">Legendary Dragon</h3>
        <p className="text-sm text-muted-foreground mb-3">
          The ultimate form awaits at 2000 XP. Keep studying!
        </p>
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
  );
};
