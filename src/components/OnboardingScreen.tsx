import { Mascot } from './Mascot';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <span className="text-gradient-xp">StudyQuest</span>
        </h1>
        <p className="text-muted-foreground text-lg">Turn your study sessions into an adventure</p>
      </div>

      <Mascot 
        message="Hello, curious mind! I'm Sage, your study companion. Together, we'll transform your learning into visible progress. Complete focus sessions, reflect on what you've learned, and watch yourself evolve from a Curious Toddler to a Legendary Dragon! Ready to begin?"
        className="mb-8"
      />

      <button 
        onClick={onComplete}
        className="btn-primary text-lg px-8 py-4"
      >
        Start My Journey
      </button>

      <p className="text-xs text-muted-foreground mt-6 max-w-sm text-center">
        This is a demo experience. No account needed—just dive in!
      </p>
    </div>
  );
};
