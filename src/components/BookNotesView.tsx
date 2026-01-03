import { useMemo } from 'react';
import type { BookNote, Book } from '@/types/game';
import { NOTES_CAP_PER_BOOK } from '@/types/game';

interface BookNotesViewProps {
  book: Book;
  notes: BookNote[];
  onClose: () => void;
  onDeleteNote?: (noteId: string) => void;
}

export const BookNotesView = ({ book, notes, onClose, onDeleteNote }: BookNotesViewProps) => {
  const bookNotes = useMemo(() => {
    return notes
      .filter(n => n.bookId === book.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [notes, book.id]);

  const isAtLimit = bookNotes.length >= NOTES_CAP_PER_BOOK;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getPreviewText = (note: BookNote) => {
    const parts = [note.reflection.understood, note.reflection.important, note.reflection.remember]
      .filter(Boolean);
    const text = parts.join(' ').trim();
    return text.length > 80 ? text.substring(0, 80) + '...' : text;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-muted'}>
        ★
      </span>
    ));
  };

  // Check if book hasn't been studied recently (for demo: more than 2 days ago)
  const lastStudiedDate = bookNotes[0]?.date;
  const daysSinceLastStudy = lastStudiedDate 
    ? Math.floor((Date.now() - new Date(lastStudiedDate).getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const showInactiveReminder = daysSinceLastStudy !== null && daysSinceLastStudy >= 2;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground text-lg"
        >
          ←
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{book.icon}</span>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">
              {book.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {bookNotes.length} note{bookNotes.length !== 1 ? 's' : ''} • Your private reflections
            </p>
          </div>
        </div>
      </div>

      {/* Inactive reminder */}
      {showInactiveReminder && (
        <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🦉</span>
            <div>
              <p className="text-sm font-medium text-foreground">
                It's been {daysSinceLastStudy} days since you last studied this book.
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Want to revisit what you learned?
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notes limit warning */}
      {isAtLimit && (
        <div className="mb-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <p className="text-sm text-orange-400 font-medium">
            📝 You've reached the note limit for this book ({NOTES_CAP_PER_BOOK} notes)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Consider reviewing or removing older notes to make room for new ones.
          </p>
        </div>
      )}

      {/* Notes list */}
      {bookNotes.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">📝</span>
          <h3 className="text-lg font-semibold text-foreground mb-2">No notes yet</h3>
          <p className="text-sm text-muted-foreground">
            Complete a focus session and write a reflection to see your notes here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookNotes.map((note, index) => (
            <div
              key={note.id}
              className="card-glow p-4 rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Note header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">
                  {formatDate(note.date)}
                </span>
                <div className="flex items-center gap-2">
                  {note.focusRating !== undefined && (
                    <span className="text-xs">{renderStars(note.focusRating)}</span>
                  )}
                  {onDeleteNote && (
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="text-xs text-muted-foreground hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Note preview */}
              <p className="text-sm text-foreground leading-relaxed">
                {getPreviewText(note)}
              </p>

              {/* AI synthesis if available */}
              {note.synthesis && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-xs">🤖</span>
                    <span className="text-xs text-muted-foreground">AI Key Takeaway</span>
                  </div>
                  <p className="text-xs text-primary/80 italic">
                    "{note.synthesis.keyTakeaway}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Memory philosophy note */}
      <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border">
        <p className="text-xs text-center text-muted-foreground">
          🔒 Your notes are private and support your long-term learning journey.
        </p>
      </div>
    </div>
  );
};
