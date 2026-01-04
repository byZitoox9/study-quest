import { useState, useCallback, useMemo, useEffect } from 'react';
import { PlayerStats, Book, AvatarLevel, AppSettings, SessionRecord, WeeklyGoal, BookNote, Achievement, AVATAR_LEVELS, XP_REWARDS, DEFAULT_BOOKS, DEFAULT_SETTINGS, DEFAULT_WEEKLY_GOALS, DEMO_SESSION_HISTORY, NOTES_CAP_PER_BOOK, ACHIEVEMENT_DEFINITIONS, SessionReflection, AISynthesis } from '@/types/game';
import { useAuth } from '@/contexts/AuthContext';

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

// Demo notes for books
const DEMO_BOOK_NOTES: BookNote[] = [
  {
    id: 'note-1',
    bookId: 'english',
    sessionId: '1',
    date: '2025-12-28',
    focusRating: 4,
    reflection: {
      understood: 'Shakespeare uses metaphors to convey deep emotions in his sonnets.',
      important: 'The structure of a sonnet affects its meaning.',
      remember: 'Iambic pentameter creates a natural rhythm.',
    },
    synthesis: {
      summary: 'Explored Shakespeare\'s use of poetic devices.',
      keyTakeaway: 'Form and content work together in poetry.',
    },
  },
  {
    id: 'note-2',
    bookId: 'english',
    sessionId: '3',
    date: '2025-12-30',
    focusRating: 3,
    reflection: {
      understood: 'Character development in novels happens through actions and dialogue.',
      important: 'Showing vs telling is key to good writing.',
      remember: 'Pay attention to how authors reveal character traits.',
    },
  },
  {
    id: 'note-3',
    bookId: 'math',
    sessionId: '2',
    date: '2025-12-29',
    focusRating: 5,
    reflection: {
      understood: 'Quadratic equations can be solved using the quadratic formula.',
      important: 'The discriminant tells us how many solutions exist.',
      remember: 'b² - 4ac determines the nature of roots.',
    },
    synthesis: {
      summary: 'Mastered solving quadratic equations.',
      keyTakeaway: 'The discriminant is key to understanding solutions.',
    },
  },
];

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
  const { isLoggedIn, userProgress, saveProgress } = useAuth();
  
  // Initialize state from saved progress if logged in
  const getInitialStats = (): PlayerStats => {
    if (isLoggedIn && userProgress && userProgress.total_sessions > 0) {
      return {
        totalXP: userProgress.total_xp,
        currentLevelXP: userProgress.current_level_xp,
        xpToNextLevel: userProgress.xp_to_next_level,
        level: userProgress.level,
        avatarLevel: userProgress.avatar_level as AvatarLevel,
        totalSessions: userProgress.total_sessions,
        totalMinutes: userProgress.total_minutes,
        books: userProgress.books as Book[] || DEFAULT_BOOKS,
        streak: userProgress.streak,
        lastSessionDate: userProgress.last_session_date,
        sessionHistory: userProgress.session_history as SessionRecord[] || [],
      };
    }
    return DEMO_INITIAL_STATS;
  };

  const getInitialBookNotes = (): BookNote[] => {
    if (isLoggedIn && userProgress && userProgress.book_notes) {
      return userProgress.book_notes as BookNote[];
    }
    return DEMO_BOOK_NOTES;
  };

  const getInitialGoals = (): WeeklyGoal[] => {
    if (isLoggedIn && userProgress && userProgress.weekly_goals) {
      return userProgress.weekly_goals as WeeklyGoal[];
    }
    return DEMO_INITIAL_GOALS;
  };

  const getInitialSettings = (): AppSettings => {
    if (isLoggedIn && userProgress && userProgress.settings) {
      return userProgress.settings as AppSettings;
    }
    return DEFAULT_SETTINGS;
  };

  const [stats, setStats] = useState<PlayerStats>(getInitialStats);
  const [settings, setSettings] = useState<AppSettings>(getInitialSettings);
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>(getInitialGoals);
  const [bookNotes, setBookNotes] = useState<BookNote[]>(getInitialBookNotes);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [previousLevel, setPreviousLevel] = useState<AvatarLevel>('toddler');
  const [pendingFocusRating, setPendingFocusRating] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [lastSessionId, setLastSessionId] = useState<string | null>(null);

  // Reload state when user logs in and has saved progress
  useEffect(() => {
    if (isLoggedIn && userProgress && userProgress.total_sessions > 0) {
      setStats({
        totalXP: userProgress.total_xp,
        currentLevelXP: userProgress.current_level_xp,
        xpToNextLevel: userProgress.xp_to_next_level,
        level: userProgress.level,
        avatarLevel: userProgress.avatar_level as AvatarLevel,
        totalSessions: userProgress.total_sessions,
        totalMinutes: userProgress.total_minutes,
        books: (userProgress.books as Book[]) || DEFAULT_BOOKS,
        streak: userProgress.streak,
        lastSessionDate: userProgress.last_session_date,
        sessionHistory: (userProgress.session_history as SessionRecord[]) || [],
      });
      setBookNotes((userProgress.book_notes as BookNote[]) || []);
      setWeeklyGoals((userProgress.weekly_goals as WeeklyGoal[]) || DEMO_INITIAL_GOALS);
      setSettings((userProgress.settings as AppSettings) || DEFAULT_SETTINGS);
    }
  }, [isLoggedIn, userProgress]);

  // Auto-save progress when logged in
  const syncProgress = useCallback(() => {
    if (isLoggedIn) {
      saveProgress({
        stats,
        bookNotes,
        weeklyGoals,
        settings,
      });
    }
  }, [isLoggedIn, stats, bookNotes, weeklyGoals, settings, saveProgress]);

  // Calculate achievements based on current stats and notes
  const achievements = useMemo(() => {
    const studiedBooks = new Set(stats.sessionHistory.map(s => s.bookId));
    
    return ACHIEVEMENT_DEFINITIONS.map((def) => {
      let currentValue = 0;
      
      switch (def.requirement.type) {
        case 'sessions':
          currentValue = stats.totalSessions;
          break;
        case 'minutes':
          currentValue = stats.totalMinutes;
          break;
        case 'books':
          currentValue = studiedBooks.size;
          break;
        case 'streak':
          currentValue = stats.streak;
          break;
        case 'notes':
          currentValue = bookNotes.length;
          break;
      }
      
      const unlocked = currentValue >= def.requirement.value;
      
      return {
        ...def,
        unlocked,
        unlockedAt: unlocked ? getTodayDate() : undefined,
      };
    });
  }, [stats, bookNotes]);

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
    const sessionId = `session-${Date.now()}`;
    const newSession: SessionRecord = {
      id: sessionId,
      bookId,
      date: today,
      focusRating,
      durationMinutes: 30,
    };

    setLastSessionId(sessionId);

    setStats(prev => {
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

      const newStats = {
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

      return newStats;
    });
    
    addXP(XP_REWARDS.sessionComplete);
    updateWeeklyGoals(bookId);

    // Sync progress after session completion (will be triggered by state change)
    setTimeout(() => {
      syncProgress();
    }, 500);
  }, [addXP, updateWeeklyGoals, syncProgress]);

  const addBookNote = useCallback((
    bookId: string, 
    reflection: SessionReflection, 
    synthesis?: AISynthesis,
    focusRating?: number
  ) => {
    // Check cap
    const existingNotes = bookNotes.filter(n => n.bookId === bookId);
    if (existingNotes.length >= NOTES_CAP_PER_BOOK) {
      return false; // Cap reached
    }

    const newNote: BookNote = {
      id: `note-${Date.now()}`,
      bookId,
      sessionId: lastSessionId || `session-${Date.now()}`,
      date: getTodayDate(),
      reflection,
      synthesis,
      focusRating,
    };

    setBookNotes(prev => {
      const newNotes = [...prev, newNote];
      // Sync after adding note
      if (isLoggedIn) {
        setTimeout(() => {
          saveProgress({
            stats,
            bookNotes: newNotes,
            weeklyGoals,
            settings,
          });
        }, 100);
      }
      return newNotes;
    });
    return true;
  }, [bookNotes, lastSessionId, isLoggedIn, stats, weeklyGoals, settings, saveProgress]);

  const deleteBookNote = useCallback((noteId: string) => {
    setBookNotes(prev => {
      const newNotes = prev.filter(n => n.id !== noteId);
      // Sync after deleting note
      if (isLoggedIn) {
        setTimeout(() => {
          saveProgress({
            stats,
            bookNotes: newNotes,
            weeklyGoals,
            settings,
          });
        }, 100);
      }
      return newNotes;
    });
  }, [isLoggedIn, stats, weeklyGoals, settings, saveProgress]);

  const getBookNotes = useCallback((bookId: string) => {
    return bookNotes.filter(n => n.bookId === bookId);
  }, [bookNotes]);

  const canAddNote = useCallback((bookId: string) => {
    return bookNotes.filter(n => n.bookId === bookId).length < NOTES_CAP_PER_BOOK;
  }, [bookNotes]);

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

  const dismissNewAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      // Sync settings change
      if (isLoggedIn) {
        setTimeout(() => {
          saveProgress({
            stats,
            bookNotes,
            weeklyGoals,
            settings: updated,
          });
        }, 100);
      }
      return updated;
    });
  }, [isLoggedIn, stats, bookNotes, weeklyGoals, saveProgress]);

  return {
    stats,
    settings,
    weeklyGoals,
    bookNotes,
    achievements,
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
    addBookNote,
    deleteBookNote,
    getBookNotes,
    canAddNote,
    newAchievement,
    dismissNewAchievement,
    lastSessionId,
    syncProgress,
  };
};
