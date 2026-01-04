import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Crown, 
  Sparkles, 
  Infinity, 
  Palette, 
  Trophy,
  Shield,
  Loader2,
  ChevronLeft,
  Check,
  Zap
} from 'lucide-react';

interface UpgradeScreenProps {
  onClose: () => void;
  onUpgradeSuccess: () => void;
}

export const UpgradeScreen = ({ onClose, onUpgradeSuccess }: UpgradeScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { session, isLoggedIn } = useAuth();
  const { toast } = useToast();

  const benefits = [
    { icon: Infinity, text: 'Unlimited learning sessions', highlight: true },
    { icon: Sparkles, text: 'Unlimited credits forever' },
    { icon: Crown, text: 'Premium gold crown avatar' },
    { icon: Palette, text: 'Exclusive themes & gradients' },
    { icon: Trophy, text: 'All premium avatars unlocked' },
    { icon: Shield, text: 'No limits, no resets, ever' },
  ];

  const handlePurchase = async () => {
    if (!isLoggedIn) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to purchase premium access.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe Checkout in new tab
        window.open(data.url, '_blank');
        
        toast({
          title: 'Checkout opened',
          description: 'Complete your purchase in the new tab.',
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment failed',
        description: 'Unable to start checkout. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-display font-bold">Unlock Premium</h1>
      </div>

      {/* Hero */}
      <div className="text-center py-6 space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-xp-gold to-yellow-600 flex items-center justify-center animate-pulse-glow">
          <Crown className="w-12 h-12 text-background" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">StudyQuest Premium</h2>
          <p className="text-muted-foreground">
            One-time payment. Lifetime access. Forever yours.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border space-y-4">
        <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium text-center">
          What you'll unlock
        </p>
        <div className="space-y-3">
          {benefits.map((benefit, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                benefit.highlight ? 'bg-primary/10 border border-primary/30' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                benefit.highlight ? 'bg-primary/20' : 'bg-muted'
              }`}>
                <benefit.icon className={`w-5 h-5 ${
                  benefit.highlight ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <span className={`text-sm ${benefit.highlight ? 'font-medium' : ''}`}>
                {benefit.text}
              </span>
              <Check className="w-4 h-4 text-progress-green ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="text-center space-y-2">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-gradient-gold">$4.99</span>
          <span className="text-muted-foreground">USD</span>
        </div>
        <p className="text-sm text-muted-foreground">
          One-time payment • Lifetime access
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Button
          onClick={handlePurchase}
          disabled={isLoading || !isLoggedIn}
          className="w-full py-6 text-lg btn-primary group relative overflow-hidden"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Opening checkout...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Unlock Full Version — $4.99
            </>
          )}
        </Button>

        {!isLoggedIn && (
          <p className="text-sm text-center text-muted-foreground">
            Please sign in to purchase
          </p>
        )}

        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full text-muted-foreground"
        >
          Maybe later
        </Button>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" /> Secure payment
        </span>
        <span>•</span>
        <span>Powered by Stripe</span>
      </div>
    </div>
  );
};
