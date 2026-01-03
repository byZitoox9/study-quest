import { useState, useCallback } from 'react';
import { PlayerStats, Book, AvatarLevel, AppSettings, SessionRecord, AVATAR_LEVELS, XP_REWARDS, DEFAULT_BOOKS, DEFAULT_SETTINGS, DEMO_SESSION_HISTORY } from '@/types/game';

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

export const useGameState = () => {
  const [stats, setStats] = useState<PlayerStats>(DEMO_INITIAL_STATS);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [previousLevel, setPreviousLevel] = useState<AvatarLevel>('toddler');
  const [pendingFocusRating, setPendingFocusRating] = useState<string | null>(null); // bookId

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
          newStreak = 1; // Reset streak but start new one
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
  }, [addXP]);

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
  };
};
