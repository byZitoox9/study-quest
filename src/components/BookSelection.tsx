import { useState } from 'react';
import type { Book } from '@/types/game';

interface BookSelectionProps {
  books: Book[];
  selectedBook: Book | null;
  onSelectBook: (book: Book) => void;
  onAddCustomBook: (title: string) => Book;
  onStartSession: () => void;
}

export const BookSelection = ({ 
  books, 
  selectedBook, 
  onSelectBook, 
  onAddCustomBook,
  onStartSession 
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

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          What are you studying today?
        </h2>
        <p className="text-muted-foreground">
          Pick a book or add your own
        </p>
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
                      <span className="text-progress-green font-medium">Lv.{Math.floor(book.progress / 20) + 1}</span>
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

      {selectedBook && (
        <button
          onClick={onStartSession}
          className="btn-primary w-full mt-6 text-lg py-4"
        >
          Start 30-Min Focus Session
        </button>
      )}
    </div>
  );
};
