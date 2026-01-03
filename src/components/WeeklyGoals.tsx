import { useState, useEffect } from 'react';
import type { WeeklyGoal } from '@/types/game';
import { XP_REWARDS } from '@/types/game';

interface WeeklyGoalsProps {
  goals: WeeklyGoal[];
  onGoalComplete: (goalId: string) => void;
  reduceAnimations?: boolean;
}

export const WeeklyGoals = ({ goals, onGoalComplete, reduceAnimations }: WeeklyGoalsProps) => {
  const [justCompleted, setJustCompleted] = useState<string | null>(null);

  useEffect(() => {
    // Check for newly completed goals
    const newlyCompleted = goals.find(g => g.current >= g.target && !g.completed);
    if (newlyCompleted) {
      setJustCompleted(newlyCompleted.id);
      onGoalComplete(newlyCompleted.id);
      
      const timer = setTimeout(() => setJustCompleted(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [goals, onGoalComplete]);

  const getGoalIcon = (type: WeeklyGoal['type']) => {
    switch (type) {
      case 'sessions': return '🎯';
      case 'books': return '📚';
      case 'minutes': return '⏱️';
    }
  };

  return (
    <div className="card-glow p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-foreground">Weekly Goals</h3>
        <span className="text-xs text-muted-foreground">+{XP_REWARDS.weeklyGoalBonus} XP each</span>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isJustCompleted = justCompleted === goal.id;
          
          return (
            <div
              key={goal.id}
              className={`relative p-3 rounded-lg bg-background/50 border transition-all duration-300 ${
                goal.completed 
                  ? 'border-progress-green/50 bg-progress-green/10' 
                  : 'border-border'
              } ${isJustCompleted && !reduceAnimations ? 'animate-scale-in' : ''}`}
            >
              {/* Completion celebration overlay */}
              {isJustCompleted && !reduceAnimations && (
                <div className="absolute inset-0 rounded-lg bg-progress-green/20 animate-pulse pointer-events-none" />
              )}
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getGoalIcon(goal.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-foreground">{goal.title}</h4>
                    {goal.completed && (
                      <span className="text-progress-green text-sm">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{goal.description}</p>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={goal.completed ? 'text-progress-green' : 'text-muted-foreground'}>
                        {Math.min(goal.current, goal.target)} / {goal.target}
                      </span>
                      {goal.completed && (
                        <span className="text-progress-green font-medium">+{XP_REWARDS.weeklyGoalBonus} XP</span>
                      )}
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          goal.completed ? 'bg-progress-green' : 'bg-session-blue'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
