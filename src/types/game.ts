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
};

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
