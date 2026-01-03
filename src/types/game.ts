export type AvatarLevel = 'toddler' | 'beginner' | 'learner' | 'thinker' | 'master' | 'dragon';

export interface Book {
  id: string;
  title: string;
  subject: 'english' | 'german' | 'math' | 'geography' | 'custom';
  icon: string;
  progress: number;
  sessionsCompleted: number;
}

export interface SessionRecord {
  id: string;
  bookId: string;
  date: string; // ISO date string
  focusRating?: number; // 0-5
  durationMinutes: number;
}

export interface AppSettings {
  notesEnabled: boolean;
  focusRatingEnabled: boolean;
  reduceAnimations: boolean;
  theme: 'dark' | 'ocean' | 'forest' | 'sunset';
}

export interface PlayerStats {
  totalXP: number;
  currentLevelXP: number;
  xpToNextLevel: number;
  level: number;
  avatarLevel: AvatarLevel;
  totalSessions: number;
  totalMinutes: number;
  books: Book[];
  streak: number;
  lastSessionDate: string | null;
  sessionHistory: SessionRecord[];
}

export interface SessionReflection {
  understood: string;
  important: string;
  remember: string;
}

export interface AISynthesis {
  summary: string;
  keyTakeaway: string;
}

export interface BookNote {
  id: string;
  bookId: string;
  sessionId: string;
  date: string;
  reflection: SessionReflection;
  synthesis?: AISynthesis;
  focusRating?: number;
}

export const NOTES_CAP_PER_BOOK = 50;

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: { type: 'sessions' | 'minutes' | 'books' | 'streak' | 'notes'; value: number };
}

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  { id: 'first-session', title: 'First Steps', description: 'Complete your first focus session', icon: '🎯', requirement: { type: 'sessions', value: 1 } },
  { id: '5-sessions', title: 'Getting Warmed Up', description: 'Complete 5 focus sessions', icon: '🔥', requirement: { type: 'sessions', value: 5 } },
  { id: '10-sessions', title: 'Dedicated Learner', description: 'Complete 10 focus sessions', icon: '⭐', requirement: { type: 'sessions', value: 10 } },
  { id: '25-sessions', title: 'Study Master', description: 'Complete 25 focus sessions', icon: '🏆', requirement: { type: 'sessions', value: 25 } },
  { id: '1-hour', title: 'Hour of Power', description: 'Study for 60 minutes total', icon: '⏱️', requirement: { type: 'minutes', value: 60 } },
  { id: '5-hours', title: 'Time Investor', description: 'Study for 5 hours total', icon: '⌛', requirement: { type: 'minutes', value: 300 } },
  { id: '2-books', title: 'Book Explorer', description: 'Study 2 different books', icon: '📚', requirement: { type: 'books', value: 2 } },
  { id: '4-books', title: 'Knowledge Seeker', description: 'Study all 4 core subjects', icon: '🎓', requirement: { type: 'books', value: 4 } },
  { id: '3-streak', title: 'Consistent', description: 'Maintain a 3-day streak', icon: '🔗', requirement: { type: 'streak', value: 3 } },
  { id: '7-streak', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '💪', requirement: { type: 'streak', value: 7 } },
  { id: 'first-note', title: 'Note Taker', description: 'Write your first reflection note', icon: '📝', requirement: { type: 'notes', value: 1 } },
  { id: '10-notes', title: 'Thoughtful Learner', description: 'Write 10 reflection notes', icon: '🧠', requirement: { type: 'notes', value: 10 } },
];

export const AVATAR_LEVELS: { level: AvatarLevel; name: string; minXP: number; emoji: string; description: string }[] = [
  { level: 'toddler', name: 'Curious Toddler', minXP: 0, emoji: '🐣', description: 'Just hatched! Ready to explore.' },
  { level: 'beginner', name: 'Eager Beginner', minXP: 100, emoji: '🐥', description: 'Taking the first steps on the learning journey.' },
  { level: 'learner', name: 'Dedicated Learner', minXP: 300, emoji: '🦉', description: 'Growing wiser with every session.' },
  { level: 'thinker', name: 'Deep Thinker', minXP: 600, emoji: '🧙', description: 'Mastering the art of reflection.' },
  { level: 'master', name: 'Knowledge Master', minXP: 1000, emoji: '👑', description: 'A true scholar emerges!' },
  { level: 'dragon', name: 'Legendary Dragon', minXP: 2000, emoji: '🐉', description: 'The ultimate learning form.' },
];

export const XP_REWARDS = {
  sessionComplete: 25,
  reflection: 15,
  aiSynthesis: 10,
  maxPerSession: 50,
  weeklyGoalBonus: 30,
};

export interface WeeklyGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  type: 'sessions' | 'books' | 'minutes';
}

export const DEFAULT_WEEKLY_GOALS: WeeklyGoal[] = [
  { id: 'goal-1', title: 'Focus Champion', description: 'Complete 3 focus sessions', target: 3, current: 0, completed: false, type: 'sessions' },
  { id: 'goal-2', title: 'Book Explorer', description: 'Study 2 different books', target: 2, current: 0, completed: false, type: 'books' },
  { id: 'goal-3', title: 'Time Master', description: 'Study for 60 minutes total', target: 60, current: 0, completed: false, type: 'minutes' },
];

export const DEFAULT_BOOKS: Book[] = [
  { id: 'english', title: 'English Literature', subject: 'english', icon: '📚', progress: 0, sessionsCompleted: 0 },
  { id: 'german', title: 'German Language', subject: 'german', icon: '🇩🇪', progress: 0, sessionsCompleted: 0 },
  { id: 'math', title: 'Mathematics', subject: 'math', icon: '📐', progress: 0, sessionsCompleted: 0 },
  { id: 'geography', title: 'World Geography', subject: 'geography', icon: '🌍', progress: 0, sessionsCompleted: 0 },
];

export const DEFAULT_SETTINGS: AppSettings = {
  notesEnabled: true,
  focusRatingEnabled: true,
  reduceAnimations: false,
  theme: 'dark',
};

// Demo session history for heatmap
export const DEMO_SESSION_HISTORY: SessionRecord[] = [
  { id: '1', bookId: 'english', date: '2025-12-28', focusRating: 4, durationMinutes: 30 },
  { id: '2', bookId: 'math', date: '2025-12-29', focusRating: 5, durationMinutes: 30 },
  { id: '3', bookId: 'english', date: '2025-12-30', focusRating: 3, durationMinutes: 30 },
  { id: '4', bookId: 'german', date: '2025-12-31', focusRating: 4, durationMinutes: 30 },
  { id: '5', bookId: 'english', date: '2026-01-01', focusRating: 5, durationMinutes: 30 },
  { id: '6', bookId: 'math', date: '2026-01-02', focusRating: 4, durationMinutes: 30 },
  { id: '7', bookId: 'geography', date: '2026-01-03', focusRating: 4, durationMinutes: 30 },
];
