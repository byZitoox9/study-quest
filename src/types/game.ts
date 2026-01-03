export type AvatarLevel = 'toddler' | 'beginner' | 'learner' | 'thinker' | 'master' | 'dragon';

export interface Book {
  id: string;
  title: string;
  subject: 'english' | 'german' | 'math' | 'geography' | 'custom';
  icon: string;
  progress: number;
  sessionsCompleted: number;
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
