import { useState } from 'react';

interface FocusRatingProps {
  onRate: (rating: number) => void;
  onSkip: () => void;
}

export const FocusRating = ({ onRate, onSkip }: FocusRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating !== null) {
      onRate(selectedRating);
    }
  };

  return (
    <div className="text-center animate-fade-in">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-session-blue/20 text-session-blue mb-4">
        <span>⏱️</span>
        <span className="font-semibold">Session Complete!</span>
      </div>
      
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">
        How focused were you?
      </h2>
      <p className="text-muted-foreground mb-6">
        Rate your focus level for this session
      </p>

      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            className="text-4xl transition-transform hover:scale-110 focus:outline-none"
          >
            <span className={
              (hoveredStar !== null && star <= hoveredStar) || 
              (selectedRating !== null && star <= selectedRating)
                ? 'text-xp-gold'
                : 'text-muted-foreground/30'
            }>
              ★
            </span>
          </button>
        ))}
      </div>

      {selectedRating !== null && (
        <p className="text-sm text-muted-foreground mb-6 animate-fade-in">
          {selectedRating === 1 && "Distracted today - that's okay!"}
          {selectedRating === 2 && "A bit unfocused, but you showed up!"}
          {selectedRating === 3 && "Decent focus, keep building!"}
          {selectedRating === 4 && "Great focus session!"}
          {selectedRating === 5 && "Peak focus achieved! 🔥"}
        </p>
      )}

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button
          onClick={handleSubmit}
          disabled={selectedRating === null}
          className="btn-primary disabled:opacity-50"
        >
          Continue
        </button>
        <button
          onClick={onSkip}
          className="text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          Skip rating
        </button>
      </div>
    </div>
  );
};
