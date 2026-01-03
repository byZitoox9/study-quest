import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
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
import type { Book, SessionReflection } from '@/types/game';

type AppScreen = 
  | 'onboarding' 
  | 'dashboard'
  | 'book-selection' 
  | 'focus-session' 
  | 'focus-rating'
  | 'reflection' 
  | 'ai-synthesis'
  | 'stats'
  | 'gallery'
  | 'settings'
  | 'social'
  | 'waitlist';

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentReflection, setCurrentReflection] = useState<SessionReflection | null>(null);
  const [sessionsThisVisit, setSessionsThisVisit] = useState(0);
  const [pendingRating, setPendingRating] = useState<number | undefined>(undefined);

  const {
    stats,
    settings,
    completeSession,
    completeReflection,
    completeSynthesis,
    addCustomBook,
    showLevelUp,
    previousLevel,
    dismissLevelUp,
    updateSettings,
  } = useGameState();

  const handleOnboardingComplete = () => {
    setScreen('dashboard');
  };

  const handleStartSession = () => {
    if (selectedBook) {
      setScreen('focus-session');
    } else {
      setScreen('book-selection');
    }
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

  const handleSynthesisComplete = () => {
    completeSynthesis();
    handleSessionEnd();
  };

  const handleSynthesisSkip = () => {
    handleSessionEnd();
  };

  const handleSessionEnd = () => {
    setSessionsThisVisit(prev => prev + 1);
    setPendingRating(undefined);
    if (sessionsThisVisit >= 1) {
      setScreen('waitlist');
    } else {
      setScreen('dashboard');
    }
  };

  const handleSessionCancel = () => {
    setScreen('dashboard');
  };

  const handleBookSelectionStart = () => {
    setScreen('focus-session');
  };

  const showXPBar = screen !== 'onboarding';

  return (
    <div className={`min-h-screen ${settings.reduceAnimations ? 'reduce-motion' : ''}`}>
      {showXPBar && <XPBar stats={stats} />}
      
      {showLevelUp && !settings.reduceAnimations && (
        <LevelUpAnimation
          previousLevel={previousLevel}
          newLevel={stats.avatarLevel}
          onDismiss={dismissLevelUp}
        />
      )}

      <main className={`max-w-lg mx-auto px-4 ${showXPBar ? 'pt-24 pb-8' : ''}`}>
        {screen === 'onboarding' && (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        )}

        {screen === 'dashboard' && (
          <Dashboard
            stats={stats}
            onStartSession={handleStartSession}
            onViewStats={() => setScreen('stats')}
            onViewGallery={() => setScreen('gallery')}
            onViewSettings={() => setScreen('settings')}
            onViewSocial={() => setScreen('social')}
          />
        )}

        {screen === 'book-selection' && (
          <BookSelection
            books={stats.books}
            selectedBook={selectedBook}
            onSelectBook={handleBookSelect}
            onAddCustomBook={addCustomBook}
            onStartSession={handleBookSelectionStart}
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

        {screen === 'gallery' && (
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
