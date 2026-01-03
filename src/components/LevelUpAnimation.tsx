import { useEffect, useState } from 'react';
import { AVATAR_LEVELS, AvatarLevel } from '@/types/game';

interface LevelUpAnimationProps {
  previousLevel: AvatarLevel;
  newLevel: AvatarLevel;
  onDismiss: () => void;
}

export const LevelUpAnimation = ({ previousLevel, newLevel, onDismiss }: LevelUpAnimationProps) => {
  const [stage, setStage] = useState<'intro' | 'transform' | 'reveal'>('intro');
  
  const prevData = AVATAR_LEVELS.find(l => l.level === previousLevel);
  const newData = AVATAR_LEVELS.find(l => l.level === newLevel);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('transform'), 800),
      setTimeout(() => setStage('reveal'), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-lg animate-fade-in">
      <div className="text-center px-4">
        {stage === 'intro' && (
          <div className="animate-scale-in">
            <p className="text-xl text-muted-foreground mb-4">Something is happening...</p>
            <div className="text-8xl animate-pulse">{prevData?.emoji}</div>
          </div>
        )}

        {stage === 'transform' && (
          <div className="relative">
            <div className="text-8xl animate-level-up">✨</div>
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: 'pulse-glow 0.5s ease-in-out infinite',
              }}
            >
              <div className="w-32 h-32 rounded-full bg-level-purple/30 blur-xl" />
            </div>
          </div>
        )}

        {stage === 'reveal' && (
          <div className="animate-level-up">
            <p className="text-2xl font-display font-bold text-gradient-level mb-6">
              LEVEL UP!
            </p>
            <div className="text-9xl mb-6">{newData?.emoji}</div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              {newData?.name}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              {newData?.description}
            </p>
            <button
              onClick={onDismiss}
              className="btn-primary px-8 py-4 text-lg"
            >
              Continue Adventure
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
