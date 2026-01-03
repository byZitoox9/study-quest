import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { XPBar } from '@/components/XPBar';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { BookSelection } from '@/components/BookSelection';
import { FocusSession } from '@/components/FocusSession';
import { ReflectionScreen } from '@/components/ReflectionScreen';
import { AISynthesis } from '@/components/AISynthesis';
import { LevelUpAnimation } from '@/components/LevelUpAnimation';
import { StatsScreen } from '@/components/StatsScreen';
import { AvatarGallery } from '@/components/AvatarGallery';
import { WaitlistCTA } from '@/components/WaitlistCTA';
import { Dashboard } from '@/components/Dashboard';
import type { Book, SessionReflection } from '@/types/game';

type AppScreen = 
  | 'onboarding' 
  | 'dashboard'
  | 'book-selection' 
  | 'focus-session' 
  | 'reflection' 
  | 'ai-synthesis'
  | 'stats'
  | 'gallery'
  | 'waitlist';

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentReflection, setCurrentReflection] = useState<SessionReflection | null>(null);
  const [sessionsThisVisit, setSessionsThisVisit] = useState(0);

  const {
    stats,
    completeSession,
    completeReflection,
    completeSynthesis,
    addCustomBook,
    showLevelUp,
    previousLevel,
    dismissLevelUp,
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
    if (selectedBook) {
      completeSession(selectedBook.id);
    }
    setScreen('reflection');
  };

  const handleReflectionComplete = (reflection: SessionReflection) => {
    setCurrentReflection(reflection);
    completeReflection();
    setScreen('ai-synthesis');
  };

  const handleReflectionSkip = () => {
    setSessionsThisVisit(prev => prev + 1);
    if (sessionsThisVisit >= 1) {
      setScreen('waitlist');
    } else {
      setScreen('dashboard');
    }
  };

  const handleSynthesisComplete = () => {
    completeSynthesis();
    setSessionsThisVisit(prev => prev + 1);
    if (sessionsThisVisit >= 1) {
      setScreen('waitlist');
    } else {
      setScreen('dashboard');
    }
  };

  const handleSynthesisSkip = () => {
    setSessionsThisVisit(prev => prev + 1);
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
    <div className="min-h-screen">
      {showXPBar && <XPBar stats={stats} />}
      
      {showLevelUp && (
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
          <AvatarGallery
            currentLevel={stats.avatarLevel}
            totalXP={stats.totalXP}
            onClose={() => setScreen('dashboard')}
          />
        )}

        {screen === 'waitlist' && (
          <WaitlistCTA onContinue={() => setScreen('dashboard')} />
        )}
      </main>
    </div>
  );
};

export default Index;
