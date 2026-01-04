import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from './AuthModal';
import { Sparkles, Trophy, BarChart3, BookOpen, Zap, ChevronRight } from 'lucide-react';

interface SoftLockScreenProps {
  onContinueAsGuest?: () => void;
}

export const SoftLockScreen = ({ onContinueAsGuest }: SoftLockScreenProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const benefits = [
    { icon: BookOpen, text: 'Unlimited focus sessions' },
    { icon: BarChart3, text: 'Track your progress over time' },
    { icon: Trophy, text: 'Earn achievements & level up' },
    { icon: Zap, text: 'Sync across devices' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-primary animate-pulse" />
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-display font-bold mb-2">
            You've used your free sessions!
          </h1>
          <p className="text-muted-foreground">
            Create a free account to continue your learning journey and save your progress.
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border space-y-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
            What you'll get
          </p>
          <div className="space-y-3">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Button
            onClick={() => setShowAuthModal(true)}
            className="w-full py-6 btn-primary text-lg group"
          >
            Continue with Account
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          {onContinueAsGuest && (
            <Button
              variant="ghost"
              onClick={onContinueAsGuest}
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Continue as Guest (limited)
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Your demo progress will be saved to your new account
        </p>
      </div>

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        defaultMode="signup"
        title="Save Your Progress"
        description="Create a free account to continue learning"
      />
    </div>
  );
};
