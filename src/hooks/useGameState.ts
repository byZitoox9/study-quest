import { useState, useCallback } from 'react';
import { PlayerStats, Book, AvatarLevel, AppSettings, SessionRecord, WeeklyGoal, AVATAR_LEVELS, XP_REWARDS, DEFAULT_BOOKS, DEFAULT_SETTINGS, DEFAULT_WEEKLY_GOALS, DEMO_SESSION_HISTORY } from '@/types/game';

const getAvatarLevel = (totalXP: number): AvatarLevel => {
  for (let i = AVATAR_LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= AVATAR_LEVELS[i].minXP) {
      return AVATAR_LEVELS[i].level;
    }
  }
  return 'toddler';
};

const getXPForNextLevel = (currentLevel: AvatarLevel): number => {
  const currentIndex = AVATAR_LEVELS.findIndex(l => l.level === currentLevel);
  if (currentIndex < AVATAR_LEVELS.length - 1) {
    return AVATAR_LEVELS[currentIndex + 1].minXP;
  }
  return AVATAR_LEVELS[currentIndex].minXP + 1000;
};

const getXPForCurrentLevel = (currentLevel: AvatarLevel): number => {
  const levelData = AVATAR_LEVELS.find(l => l.level === currentLevel);
  return levelData?.minXP ?? 0;
};

const getTodayDate = () => new Date().toISOString().split('T')[0];

// Demo stats for returning users
const DEMO_INITIAL_STATS: PlayerStats = {
  totalXP: 45,
  currentLevelXP: 45,
  xpToNextLevel: 100,
  level: 1,
  avatarLevel: 'toddler',
  totalSessions: 7,
  totalMinutes: 210,
  books: DEFAULT_BOOKS.map(book => ({
    ...book,
    progress: book.id === 'english' ? 24 : book.id === 'math' ? 16 : book.id === 'german' ? 8 : book.id === 'geography' ? 8 : 0,
    sessionsCompleted: book.id === 'english' ? 3 : book.id === 'math' ? 2 : book.id === 'german' ? 1 : book.id === 'geography' ? 1 : 0,
  })),
  streak: 7,
  lastSessionDate: getTodayDate(),
  sessionHistory: DEMO_SESSION_HISTORY,
};

// Demo weekly goals with some progress
const DEMO_INITIAL_GOALS: WeeklyGoal[] = DEFAULT_WEEKLY_GOALS.map(goal => ({
  ...goal,
  current: goal.type === 'sessions' ? 2 : goal.type === 'books' ? 1 : 30,
}));

export const useGameState = () => {
  const [stats, setStats] = useState<PlayerStats>(DEMO_INITIAL_STATS);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>(DEMO_INITIAL_GOALS);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [previousLevel, setPreviousLevel] = useState<AvatarLevel>('toddler');
  const [pendingFocusRating, setPendingFocusRating] = useState<string | null>(null);

  const addXP = useCallback((amount: number) => {
    setStats(prev => {
      const newTotalXP = prev.totalXP + amount;
      const newAvatarLevel = getAvatarLevel(newTotalXP);
      const xpToNext = getXPForNextLevel(newAvatarLevel);
      const xpForCurrent = getXPForCurrentLevel(newAvatarLevel);
      
      if (newAvatarLevel !== prev.avatarLevel) {
        setPreviousLevel(prev.avatarLevel);
        setShowLevelUp(true);
      }

      return {
        ...prev,
        totalXP: newTotalXP,
        currentLevelXP: newTotalXP - xpForCurrent,
        xpToNextLevel: xpToNext - xpForCurrent,
        avatarLevel: newAvatarLevel,
        level: AVATAR_LEVELS.findIndex(l => l.level === newAvatarLevel) + 1,
      };
    });
  }, []);

  const updateWeeklyGoals = useCallback((bookId: string) => {
    setWeeklyGoals(prev => {
      const studiedBooksSet = new Set(
        stats.sessionHistory.map(s => s.bookId)
      );
      studiedBooksSet.add(bookId);

      return prev.map(goal => {
        if (goal.completed) return goal;

        let newCurrent = goal.current;
        
        if (goal.type === 'sessions') {
          newCurrent = goal.current + 1;
        } else if (goal.type === 'books') {
          newCurrent = studiedBooksSet.size;
        } else if (goal.type === 'minutes') {
          newCurrent = goal.current + 30;
        }

        return { ...goal, current: newCurrent };
      });
    });
  }, [stats.sessionHistory]);

  const completeWeeklyGoal = useCallback((goalId: string) => {
    setWeeklyGoals(prev => 
      prev.map(goal => 
        goal.id === goalId ? { ...goal, completed: true } : goal
      )
    );
    addXP(XP_REWARDS.weeklyGoalBonus);
  }, [addXP]);

  const completeSession = useCallback((bookId: string, focusRating?: number) => {
    const today = getTodayDate();
    const newSession: SessionRecord = {
      id: `session-${Date.now()}`,
      bookId,
      date: today,
      focusRating,
      durationMinutes: 30,
    };

    setStats(prev => {
      // Calculate streak
      let newStreak = prev.streak;
      if (prev.lastSessionDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (prev.lastSessionDate === yesterdayStr) {
          newStreak = prev.streak + 1;
        } else if (prev.lastSessionDate !== today) {
          newStreak = 1;
        }
      }

      return {
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + 30,
        streak: newStreak,
        lastSessionDate: today,
        sessionHistory: [...prev.sessionHistory, newSession],
        books: prev.books.map(book => 
          book.id === bookId 
            ? { 
                ...book, 
                sessionsCompleted: book.sessionsCompleted + 1,
                progress: Math.min(100, book.progress + 8 + Math.floor(Math.random() * 5))
              }
            : book
        ),
      };
    });
    
    addXP(XP_REWARDS.sessionComplete);
    updateWeeklyGoals(bookId);
  }, [addXP, updateWeeklyGoals]);

  const updateSessionRating = useCallback((sessionId: string, rating: number) => {
    setStats(prev => ({
      ...prev,
      sessionHistory: prev.sessionHistory.map(session =>
        session.id === sessionId ? { ...session, focusRating: rating } : session
      ),
    }));
  }, []);

  const completeReflection = useCallback(() => {
    addXP(XP_REWARDS.reflection);
  }, [addXP]);

  const completeSynthesis = useCallback(() => {
    addXP(XP_REWARDS.aiSynthesis);
  }, [addXP]);

  const addCustomBook = useCallback((title: string) => {
    const newBook: Book = {
      id: `custom-${Date.now()}`,
      title,
      subject: 'custom',
      icon: '📖',
      progress: 0,
      sessionsCompleted: 0,
    };
    setStats(prev => ({
      ...prev,
      books: [...prev.books, newBook],
    }));
    return newBook;
  }, []);

  const dismissLevelUp = useCallback(() => {
    setShowLevelUp(false);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    stats,
    settings,
    weeklyGoals,
    addXP,
    completeSession,
    completeReflection,
    completeSynthesis,
    addCustomBook,
    showLevelUp,
    previousLevel,
    dismissLevelUp,
    updateSettings,
    updateSessionRating,
    pendingFocusRating,
    setPendingFocusRating,
    completeWeeklyGoal,
  };
};
