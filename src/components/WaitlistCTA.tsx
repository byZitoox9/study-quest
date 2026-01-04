import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

interface WaitlistCTAProps {
  onContinue: () => void;
}

export const WaitlistCTA = ({ onContinue }: WaitlistCTAProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('waitlist').insert({ email: email.trim(), source: 'demo' });
      if (error && error.code !== '23505') throw error;
      
      setSubmitted(true);
      analytics.track('waitlist_signup');
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-center px-4 animate-fade-in">
      <div className="inline-block p-4 rounded-full bg-primary/20 mb-6">
        <span className="text-5xl">🎉</span>
      </div>

      <h2 className="text-3xl font-display font-bold text-foreground mb-4">
        You're making progress!
      </h2>

      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        This was just a taste of StudyQuest. The full experience includes cloud sync, 
        achievements, study streaks, and more ways to level up your learning.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="reflection-input flex-1"
              required
              disabled={isSubmitting}
            />
            <button type="submit" className="btn-primary whitespace-nowrap" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Be the first to know when we launch. No spam, ever.
          </p>
        </form>
      ) : (
        <div className="max-w-sm mx-auto mb-6 p-4 rounded-xl bg-progress-green/20 text-progress-green animate-scale-in">
          <p className="font-semibold">✓ You're on the list!</p>
          <p className="text-sm mt-1 opacity-80">We'll be in touch soon.</p>
        </div>
      )}

      <button
        onClick={onContinue}
        className="btn-secondary"
      >
        Continue Exploring Demo
      </button>
    </div>
  );
};
