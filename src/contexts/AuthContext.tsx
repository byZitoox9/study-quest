import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  is_premium: boolean;
  credits_remaining: number;
}

interface UserProgress {
  id: string;
  user_id: string;
  total_xp: number;
  current_level_xp: number;
  xp_to_next_level: number;
  level: number;
  avatar_level: string;
  total_sessions: number;
  total_minutes: number;
  streak: number;
  last_session_date: string | null;
  books: any[];
  session_history: any[];
  book_notes: any[];
  weekly_goals: any[];
  settings: any;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  userProgress: UserProgress | null;
  isGuest: boolean;
  isLoggedIn: boolean;
  isPremium: boolean;
  creditsRemaining: number;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  useCredit: () => Promise<boolean>;
  mergeGuestProgress: (guestProgress: any) => Promise<void>;
  refreshProfile: () => Promise<void>;
  saveProgress: (progress: any) => Promise<void>;
  loadProgress: () => Promise<UserProgress | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as Profile | null;
  };

  const fetchUserProgress = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }
    return data as UserProgress | null;
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
      const progressData = await fetchUserProgress(user.id);
      setUserProgress(progressData);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id).then(setProfile);
            fetchUserProgress(session.user.id).then(setUserProgress);
          }, 0);
        } else {
          setProfile(null);
          setUserProgress(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
        fetchUserProgress(session.user.id).then(setUserProgress);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/demo`,
      },
    });

    if (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error };
    }

    toast({
      title: 'Welcome back!',
      description: 'You are now logged in.',
    });

    return { error: null };
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/demo`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { error };
    }

    toast({
      title: 'Account created!',
      description: 'Your progress will now be saved.',
    });

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setUserProgress(null);
    toast({
      title: 'Signed out',
      description: 'See you next time!',
    });
  };

  const useCredit = async (): Promise<boolean> => {
    if (!user || !profile) return false;
    
    if (profile.credits_remaining <= 0) {
      return false;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ credits_remaining: profile.credits_remaining - 1 })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error using credit:', error);
      return false;
    }

    setProfile(prev => prev ? { ...prev, credits_remaining: prev.credits_remaining - 1 } : null);
    return true;
  };

  const saveProgress = async (progress: any) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        total_xp: progress.stats.totalXP,
        current_level_xp: progress.stats.currentLevelXP,
        xp_to_next_level: progress.stats.xpToNextLevel,
        level: progress.stats.level,
        avatar_level: progress.stats.avatarLevel,
        total_sessions: progress.stats.totalSessions,
        total_minutes: progress.stats.totalMinutes,
        streak: progress.stats.streak,
        last_session_date: progress.stats.lastSessionDate,
        books: progress.stats.books,
        session_history: progress.stats.sessionHistory,
        book_notes: progress.bookNotes,
        weekly_goals: progress.weeklyGoals,
        settings: progress.settings,
      }, {
        onConflict: 'user_id',
      });

    if (error) {
      console.error('Error saving progress:', error);
    } else {
      // Update local state
      const newProgress = await fetchUserProgress(user.id);
      setUserProgress(newProgress);
    }
  };

  const loadProgress = async (): Promise<UserProgress | null> => {
    if (!user) return null;
    const progress = await fetchUserProgress(user.id);
    setUserProgress(progress);
    return progress;
  };

  const mergeGuestProgress = async (guestProgress: any) => {
    if (!user) return;

    const existingProgress = await fetchUserProgress(user.id);

    if (!existingProgress || existingProgress.total_sessions === 0) {
      // User has no progress, merge guest data
      await saveProgress(guestProgress);
      
      toast({
        title: 'Progress saved!',
        description: 'Your demo progress has been transferred to your account.',
      });
    }
  };

  const isGuest = !user;
  const isLoggedIn = !!user;
  const isPremium = profile?.is_premium ?? false;
  const creditsRemaining = profile?.credits_remaining ?? 2;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        userProgress,
        isGuest,
        isLoggedIn,
        isPremium,
        creditsRemaining,
        isLoading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        useCredit,
        mergeGuestProgress,
        refreshProfile,
        saveProgress,
        loadProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
