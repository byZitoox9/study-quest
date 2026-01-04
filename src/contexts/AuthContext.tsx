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

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
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
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as Profile;
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
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
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
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

  const mergeGuestProgress = async (guestProgress: any) => {
    if (!user) return;

    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (existingProgress && existingProgress.total_sessions === 0) {
      // User has no progress, merge guest data
      const { error } = await supabase
        .from('user_progress')
        .update({
          total_xp: guestProgress.stats.totalXP,
          current_level_xp: guestProgress.stats.currentLevelXP,
          xp_to_next_level: guestProgress.stats.xpToNextLevel,
          level: guestProgress.stats.level,
          avatar_level: guestProgress.stats.avatarLevel,
          total_sessions: guestProgress.stats.totalSessions,
          total_minutes: guestProgress.stats.totalMinutes,
          streak: guestProgress.stats.streak,
          last_session_date: guestProgress.stats.lastSessionDate,
          books: guestProgress.stats.books,
          session_history: guestProgress.stats.sessionHistory,
          book_notes: guestProgress.bookNotes,
          weekly_goals: guestProgress.weeklyGoals,
          settings: guestProgress.settings,
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error merging progress:', error);
      } else {
        toast({
          title: 'Progress saved!',
          description: 'Your demo progress has been transferred to your account.',
        });
      }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
