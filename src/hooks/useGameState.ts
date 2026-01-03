import { useState, useCallback } from 'react';
import { PlayerStats, Book, AvatarLevel, AVATAR_LEVELS, XP_REWARDS, DEFAULT_BOOKS } from '@/types/game';

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

// Demo stats for returning users
const DEMO_INITIAL_STATS: PlayerStats = {
  totalXP: 45,
  currentLevelXP: 45,
  xpToNextLevel: 100,
  level: 1,
  avatarLevel: 'toddler',
  totalSessions: 1,
  totalMinutes: 30,
  books: DEFAULT_BOOKS.map(book => ({
    ...book,
    progress: book.id === 'english' ? 8 : 0,
    sessionsCompleted: book.id === 'english' ? 1 : 0,
  })),
};

export const useGameState = () => {
  const [stats, setStats] = useState<PlayerStats>(DEMO_INITIAL_STATS);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [previousLevel, setPreviousLevel] = useState<AvatarLevel>('toddler');

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

  const completeSession = useCallback((bookId: string) => {
    setStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalMinutes: prev.totalMinutes + 30,
      books: prev.books.map(book => 
        book.id === bookId 
          ? { 
              ...book, 
              sessionsCompleted: book.sessionsCompleted + 1,
              progress: Math.min(100, book.progress + 8 + Math.floor(Math.random() * 5))
            }
          : book
      ),
    }));
    addXP(XP_REWARDS.sessionComplete);
  }, [addXP]);

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

  return {
    stats,
    addXP,
    completeSession,
    completeReflection,
    completeSynthesis,
    addCustomBook,
    showLevelUp,
    previousLevel,
    dismissLevelUp,
  };
};
