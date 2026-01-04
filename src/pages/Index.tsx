import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGameState } from '@/hooks/useGameState';
import { useAuth } from '@/contexts/AuthContext';
import { XPBar } from '@/components/XPBar';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { BookSelection } from '@/components/BookSelection';
import { FocusSession } from '@/components/FocusSession';
import { FocusRating } from '@/components/FocusRating';
import { ReflectionScreen } from '@/components/ReflectionScreen';
import { AISynthesis } from '@/components/AISynthesis';
import { LevelUpAnimation } from '@/components/LevelUpAnimation';
import { StatsScreen } from '@/components/StatsScreen';
import { EvolutionPath } from '@/components/EvolutionPath';
import { SettingsScreen } from '@/components/SettingsScreen';
import { SocialPreview } from '@/components/SocialPreview';
import { WaitlistCTA } from '@/components/WaitlistCTA';
import { Dashboard } from '@/components/Dashboard';
import { MascotHelper } from '@/components/MascotHelper';
import { BookNotesView } from '@/components/BookNotesView';
import { AchievementBadges } from '@/components/AchievementBadges';
import { GuestBanner } from '@/components/auth/GuestBanner';
import { SoftLockScreen } from '@/components/auth/SoftLockScreen';
import { UserMenu } from '@/components/auth/UserMenu';
import { MobileNav } from '@/components/MobileNav';
import { UpgradeScreen } from '@/components/UpgradeScreen';
import { PremiumCelebration } from '@/components/PremiumCelebration';
import { Crown } from 'lucide-react';
import type { Book, SessionReflection, AISynthesis as AISynthesisType } from '@/types/game';

type AppScreen = 
  | 'onboarding' 
  | 'dashboard'
  | 'book-selection' 
  | 'focus-session' 
  | 'focus-rating'
  | 'reflection' 
  | 'ai-synthesis'
  | 'stats'
  | 'evolution'
  | 'settings'
  | 'social'
  | 'waitlist'
  | 'book-notes'
  | 'achievements'
  | 'soft-lock'
  | 'upgrade';

const GUEST_SESSION_LIMIT = 2;

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentReflection, setCurrentReflection] = useState<SessionReflection | null>(null);
  const [currentSynthesis, setCurrentSynthesis] = useState<AISynthesisType | null>(null);
  const [sessionsThisVisit, setSessionsThisVisit] = useState(0);
  const [pendingRating, setPendingRating] = useState<number | undefined>(undefined);
  const [showGuestBanner, setShowGuestBanner] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  const { 
    isGuest, 
    isLoggedIn, 
    isPremium, 
    mergeGuestProgress, 
    checkPurchaseStatus,
    setPremiumStatus 
  } = useAuth();

  const {
    stats,
    settings,
    weeklyGoals,
    bookNotes,
    achievements,
    completeSession,
    completeReflection,
    completeSynthesis,
    addCustomBook,
    showLevelUp,
    previousLevel,
    dismissLevelUp,
    updateSettings,
    completeWeeklyGoal,
    addBookNote,
    deleteBookNote,
  } = useGameState();

  // Check for payment success in URL
  useEffect(() => {
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      // Check purchase status and show celebration
      checkPurchaseStatus().then((status) => {
        if (status?.isPremium) {
          setShowCelebration(true);
        }
      });
      // Clear the URL param
      setSearchParams({});
    }
  }, [searchParams, checkPurchaseStatus, setSearchParams]);

  // Merge guest progress when user logs in
  useEffect(() => {
    if (isLoggedIn && sessionsThisVisit > 0) {
      mergeGuestProgress({
        stats,
        bookNotes,
        weeklyGoals,
        settings,
      });
    }
  }, [isLoggedIn]);

  const handleOnboardingComplete = () => {
    setScreen('dashboard');
  };

  const handleStartSession = () => {
    // Premium users have unlimited access
    if (isPremium) {
      setScreen('book-selection');
      return;
    }

    // Check if guest has used all sessions
    if (isGuest && sessionsThisVisit >= GUEST_SESSION_LIMIT) {
      setScreen('soft-lock');
      return;
    }
    setScreen('book-selection');
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
  };

  const handleSessionComplete = () => {
    if (settings.focusRatingEnabled) {
      setScreen('focus-rating');
    } else {
      if (selectedBook) {
        completeSession(selectedBook.id);
      }
      if (settings.notesEnabled) {
        setScreen('reflection');
      } else {
        handleSessionEnd();
      }
    }
  };

  const handleFocusRating = (rating: number) => {
    setPendingRating(rating);
    if (selectedBook) {
      completeSession(selectedBook.id, rating);
    }
    if (settings.notesEnabled) {
      setScreen('reflection');
    } else {
      handleSessionEnd();
    }
  };

  const handleFocusRatingSkip = () => {
    if (selectedBook) {
      completeSession(selectedBook.id);
    }
    if (settings.notesEnabled) {
      setScreen('reflection');
    } else {
      handleSessionEnd();
    }
  };

  const handleReflectionComplete = (reflection: SessionReflection) => {
    setCurrentReflection(reflection);
    completeReflection();
    setScreen('ai-synthesis');
  };

  const handleReflectionSkip = () => {
    handleSessionEnd();
  };

  const handleSynthesisComplete = (synthesis?: AISynthesisType) => {
    completeSynthesis();
    if (selectedBook && currentReflection) {
      addBookNote(selectedBook.id, currentReflection, synthesis, pendingRating);
    }
    setCurrentSynthesis(synthesis || null);
    handleSessionEnd();
  };

  const handleSynthesisSkip = () => {
    if (selectedBook && currentReflection) {
      addBookNote(selectedBook.id, currentReflection, undefined, pendingRating);
    }
    handleSessionEnd();
  };

  const handleSessionEnd = () => {
    setSessionsThisVisit(prev => prev + 1);
    setPendingRating(undefined);
    setCurrentReflection(null);
    setCurrentSynthesis(null);
    
    // Premium users never see limits
    if (isPremium) {
      setScreen('dashboard');
      return;
    }

    // For guests, show soft lock after using all sessions
    if (isGuest && sessionsThisVisit + 1 >= GUEST_SESSION_LIMIT) {
      setScreen('soft-lock');
    } else if (sessionsThisVisit >= 1) {
      setScreen('waitlist');
    } else {
      setScreen('dashboard');
    }
  };

  const handleSessionCancel = () => {
    setScreen('dashboard');
  };

  const handleBookSelectionStart = () => {
    if (selectedBook) {
      setScreen('focus-session');
    }
  };

  const handleBookSelectionBack = () => {
    setScreen('dashboard');
  };

  const handleViewNotes = (book: Book) => {
    setSelectedBook(book);
    setScreen('book-notes');
  };

  const handleContinueAsGuest = () => {
    setScreen('dashboard');
  };

  const handleUpgradeSuccess = () => {
    setShowCelebration(true);
    setScreen('dashboard');
  };

  const handleCelebrationDismiss = () => {
    setShowCelebration(false);
    setScreen('dashboard');
  };

  const showXPBar = screen !== 'onboarding' && screen !== 'soft-lock' && screen !== 'upgrade';
  const showMascotHelper = screen !== 'onboarding' && screen !== 'focus-session' && screen !== 'soft-lock' && screen !== 'upgrade';

  // Calculate remaining sessions for guest
  const guestSessionsRemaining = isPremium ? 'unlimited' : Math.max(0, GUEST_SESSION_LIMIT - sessionsThisVisit);

  return (
    <div className={`min-h-screen ${settings.reduceAnimations ? 'reduce-motion' : ''}`}>
      {/* Premium Celebration */}
      {showCelebration && (
        <PremiumCelebration onDismiss={handleCelebrationDismiss} />
      )}

      {/* Demo Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm">
              🦉
            </div>
            <span className="font-display font-bold text-sm">StudyQuest</span>
            {isPremium && (
              <span className="flex items-center gap-1 text-xs bg-xp-gold/20 text-xp-gold px-2 py-0.5 rounded-full">
                <Crown className="w-3 h-3" /> Premium
              </span>
            )}
          </Link>
          
          <div className="flex items-center gap-2">
            {!isPremium && isGuest && typeof guestSessionsRemaining === 'number' && guestSessionsRemaining > 0 && (
              <span className="text-xs text-muted-foreground hidden sm:block">
                {guestSessionsRemaining} free session{guestSessionsRemaining !== 1 ? 's' : ''} left
              </span>
            )}
            {!isPremium && isLoggedIn && (
              <button
                onClick={() => setScreen('upgrade')}
                className="text-xs bg-gradient-to-r from-xp-gold to-yellow-600 text-background px-3 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity hidden sm:flex items-center gap-1"
              >
                <Crown className="w-3 h-3" /> Upgrade
              </button>
            )}
            <div className="hidden md:block">
              <UserMenu />
            </div>
            <MobileNav showAuth={true} links={[{ href: '/', label: 'Home' }]} />
          </div>
        </div>
      </header>

      {showXPBar && <XPBar stats={stats} />}
      
      {showLevelUp && !settings.reduceAnimations && (
        <LevelUpAnimation
          previousLevel={previousLevel}
          newLevel={stats.avatarLevel}
          onDismiss={dismissLevelUp}
        />
      )}

      {showMascotHelper && (
        <MascotHelper reduceAnimations={settings.reduceAnimations} />
      )}

      {/* Guest Banner - show on dashboard for guests (not premium) */}
      {isGuest && !isPremium && showGuestBanner && screen === 'dashboard' && (
        <GuestBanner 
          creditsRemaining={typeof guestSessionsRemaining === 'number' ? guestSessionsRemaining : 0}
          onDismiss={() => setShowGuestBanner(false)}
        />
      )}

      <main className={`max-w-lg mx-auto px-4 ${showXPBar ? 'pt-32 pb-8' : 'pt-16'}`}>
        {screen === 'onboarding' && (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        )}

        {screen === 'soft-lock' && (
          <SoftLockScreen onContinueAsGuest={handleContinueAsGuest} />
        )}

        {screen === 'upgrade' && (
          <UpgradeScreen
            onClose={() => setScreen('dashboard')}
            onUpgradeSuccess={handleUpgradeSuccess}
          />
        )}

        {screen === 'dashboard' && (
          <Dashboard
            stats={stats}
            weeklyGoals={weeklyGoals}
            achievements={achievements}
            onStartSession={handleStartSession}
            onViewStats={() => setScreen('stats')}
            onViewEvolution={() => setScreen('evolution')}
            onViewSettings={() => setScreen('settings')}
            onViewSocial={() => setScreen('social')}
            onViewAchievements={() => setScreen('achievements')}
            onGoalComplete={completeWeeklyGoal}
            onViewUpgrade={() => setScreen('upgrade')}
            reduceAnimations={settings.reduceAnimations}
          />
        )}

        {screen === 'book-selection' && (
          <BookSelection
            books={stats.books}
            bookNotes={bookNotes}
            selectedBook={selectedBook}
            onSelectBook={handleBookSelect}
            onAddCustomBook={addCustomBook}
            onStartSession={handleBookSelectionStart}
            onViewNotes={handleViewNotes}
            onBack={handleBookSelectionBack}
          />
        )}

        {screen === 'book-notes' && selectedBook && (
          <BookNotesView
            book={selectedBook}
            notes={bookNotes}
            onClose={() => setScreen('book-selection')}
            onDeleteNote={deleteBookNote}
          />
        )}

        {screen === 'achievements' && (
          <AchievementBadges
            achievements={achievements}
            onClose={() => setScreen('dashboard')}
            reduceAnimations={settings.reduceAnimations}
          />
        )}

        {screen === 'focus-session' && selectedBook && (
          <FocusSession
            book={selectedBook}
            onComplete={handleSessionComplete}
            onCancel={handleSessionCancel}
          />
        )}

        {screen === 'focus-rating' && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <FocusRating
              onRate={handleFocusRating}
              onSkip={handleFocusRatingSkip}
            />
          </div>
        )}

        {screen === 'reflection' && (
          <ReflectionScreen
            onComplete={handleReflectionComplete}
            onSkip={handleReflectionSkip}
          />
        )}

        {screen === 'ai-synthesis' && currentReflection && (
          <AISynthesis
            reflection={currentReflection}
            onComplete={handleSynthesisComplete}
            onSkip={handleSynthesisSkip}
          />
        )}

        {screen === 'stats' && (
          <StatsScreen
            stats={stats}
            onClose={() => setScreen('dashboard')}
          />
        )}

        {screen === 'evolution' && (
          <EvolutionPath
            currentLevel={stats.avatarLevel}
            totalXP={stats.totalXP}
            onClose={() => setScreen('dashboard')}
          />
        )}

        {screen === 'settings' && (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={updateSettings}
            onClose={() => setScreen('dashboard')}
          />
        )}

        {screen === 'social' && (
          <SocialPreview onClose={() => setScreen('dashboard')} />
        )}

        {screen === 'waitlist' && (
          <WaitlistCTA onContinue={() => setScreen('dashboard')} />
        )}
      </main>
    </div>
  );
};

export default Index;