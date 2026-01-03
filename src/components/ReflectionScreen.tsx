import { useState } from 'react';
import type { SessionReflection } from '@/types/game';

interface ReflectionScreenProps {
  onComplete: (reflection: SessionReflection) => void;
  onSkip: () => void;
}

const prompts = [
  { key: 'understood', label: 'What did you understand?', placeholder: 'I learned about...' },
  { key: 'important', label: 'What felt important?', placeholder: 'The key concept was...' },
  { key: 'remember', label: 'Anything you want to remember?', placeholder: 'I want to remember...' },
];

export const ReflectionScreen = ({ onComplete, onSkip }: ReflectionScreenProps) => {
  const [reflection, setReflection] = useState<SessionReflection>({
    understood: '',
    important: '',
    remember: '',
  });

  const handleChange = (key: keyof SessionReflection, value: string) => {
    setReflection(prev => ({ ...prev, [key]: value }));
  };

  const hasContent = Object.values(reflection).some(v => v.trim().length > 0);

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-progress-green/20 text-progress-green mb-4">
          <span>✨</span>
          <span className="font-semibold">Session Complete!</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Time for Reflection
        </h2>
        <p className="text-muted-foreground">
          Take a moment to capture what you've learned
        </p>
      </div>

      <div className="flex-1 space-y-6 max-w-lg mx-auto w-full">
        {prompts.map((prompt, index) => (
          <div 
            key={prompt.key} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <label className="block mb-2">
              <span className="text-foreground font-medium">{prompt.label}</span>
            </label>
            <textarea
              value={reflection[prompt.key as keyof SessionReflection]}
              onChange={(e) => handleChange(prompt.key as keyof SessionReflection, e.target.value)}
              placeholder={prompt.placeholder}
              className="reflection-input h-24"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 max-w-lg mx-auto w-full mt-8">
        <button
          onClick={() => onComplete(reflection)}
          disabled={!hasContent}
          className="btn-primary disabled:opacity-50"
        >
          Save Reflection (+15 XP)
        </button>
        <button
          onClick={onSkip}
          className="text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};
