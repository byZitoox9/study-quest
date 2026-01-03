import { useState } from 'react';
import type { Book } from '@/types/game';
import { XP_REWARDS } from '@/types/game';

interface BookSelectionProps {
  books: Book[];
  selectedBook: Book | null;
  onSelectBook: (book: Book) => void;
  onAddCustomBook: (title: string) => Book;
  onStartSession: () => void;
  onBack?: () => void;
}

export const BookSelection = ({ 
  books, 
  selectedBook, 
  onSelectBook, 
  onAddCustomBook,
  onStartSession,
  onBack
}: BookSelectionProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTitle, setCustomTitle] = useState('');

  const handleAddCustomBook = () => {
    if (customTitle.trim()) {
      const newBook = onAddCustomBook(customTitle.trim());
      onSelectBook(newBook);
      setCustomTitle('');
      setShowCustomInput(false);
    }
  };

  const getBookLevel = (book: Book) => Math.floor(book.progress / 20) + 1;
  
  const estimatedXP = XP_REWARDS.sessionComplete + XP_REWARDS.reflection + XP_REWARDS.aiSynthesis;

  return (
    <div className="animate-fade-in">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground text-lg"
          >
            ←
          </button>
        )}
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            What are you studying today?
          </h2>
          <p className="text-muted-foreground">
            Pick a book or add your own
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {books.map((book) => (
          <button
            key={book.id}
            onClick={() => onSelectBook(book)}
            className={`book-card text-left ${selectedBook?.id === book.id ? 'selected' : ''}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{book.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{book.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {book.sessionsCompleted} sessions
                </p>
                {book.progress > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-progress-green font-medium">Lv.{getBookLevel(book)}</span>
                      <span className="text-muted-foreground">{book.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-progress-green rounded-full transition-all duration-500"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {!showCustomInput ? (
        <button
          onClick={() => setShowCustomInput(true)}
          className="w-full book-card text-center py-6 border-dashed border-2"
        >
          <span className="text-2xl mb-2 block">➕</span>
          <span className="text-muted-foreground">Add Custom Book</span>
        </button>
      ) : (
        <div className="p-4 rounded-xl bg-card border border-border animate-scale-in">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Enter book title..."
            className="reflection-input mb-3"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomBook()}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddCustomBook}
              disabled={!customTitle.trim()}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              Add Book
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false);
                setCustomTitle('');
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Selected book details & session start */}
      {selectedBook && (
        <div className="mt-6 p-4 rounded-xl bg-card border border-primary/30 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{selectedBook.icon}</span>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{selectedBook.title}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span>Level {getBookLevel(selectedBook)}</span>
                <span>•</span>
                <span>{selectedBook.progress}% mastery</span>
              </div>
            </div>
          </div>

          {/* XP Estimate */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-xp/10 border border-gradient-xp/20 mb-4">
            <span className="text-sm text-muted-foreground">Estimated XP</span>
            <span className="font-bold text-gradient-xp">+{estimatedXP} XP</span>
          </div>

          <button
            onClick={onStartSession}
            className="btn-primary w-full text-lg py-4"
          >
            🎯 Start 30-Min Focus Session
          </button>
        </div>
      )}
    </div>
  );
};
