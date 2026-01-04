import { useState } from 'react';
import { X, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from './AuthModal';

interface GuestBannerProps {
  creditsRemaining?: number;
  onDismiss?: () => void;
}

export const GuestBanner = ({ creditsRemaining = 2, onDismiss }: GuestBannerProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-40 animate-slide-up sm:left-auto sm:right-4 sm:max-w-sm">
        <div className="bg-card/95 backdrop-blur-lg rounded-xl border border-border shadow-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">Guest Mode</p>
                <button 
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {creditsRemaining} free session{creditsRemaining !== 1 ? 's' : ''} remaining
              </p>
              <Button
                size="sm"
                variant="link"
                onClick={() => setShowAuthModal(true)}
                className="px-0 h-auto mt-1 text-primary"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Save progress →
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        defaultMode="signup"
        title="Save Your Progress"
        description="Create a free account to keep your learning journey"
      />
    </>
  );
};
