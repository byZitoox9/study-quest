import { useEffect, useState } from 'react';
import { Crown, Sparkles, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface PremiumCelebrationProps {
  onDismiss: () => void;
}

export const PremiumCelebration = ({ onDismiss }: PremiumCelebrationProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#FFD700', '#FFA500', '#FF6347', '#9333EA', '#3B82F6'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Show content after delay
    setTimeout(() => setShowContent(true), 500);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
      <div className={`text-center space-y-6 p-8 max-w-md transition-all duration-700 ${
        showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}>
        {/* Crown Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-xp-gold via-yellow-500 to-orange-500 flex items-center justify-center animate-pulse-glow shadow-2xl shadow-xp-gold/50">
            <Crown className="w-16 h-16 text-background animate-bounce-in" />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-progress-green flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <PartyPopper className="w-5 h-5 text-background" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl font-display font-bold text-gradient-gold animate-slide-up">
            You're Premium Now! 👑
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Welcome to the full StudyQuest experience.
          </p>
        </div>

        {/* Benefits unlocked */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-xp-gold/30 space-y-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm font-medium text-xp-gold">Unlocked:</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <span>✓ Unlimited sessions</span>
            <span>✓ Premium avatars</span>
            <span>✓ Exclusive themes</span>
            <span>✓ Lifetime access</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={onDismiss}
          className="w-full py-6 text-lg btn-primary animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          Start Learning
        </Button>
      </div>
    </div>
  );
};
