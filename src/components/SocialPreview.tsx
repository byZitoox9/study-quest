import { useState } from 'react';

interface SocialPreviewProps {
  onClose: () => void;
}

type Tab = 'leaderboard' | 'notes';

const DEMO_LEADERBOARD = [
  { rank: 1, name: 'StudyDragon42', xp: 2450, avatar: '🐉', streak: 45 },
  { rank: 2, name: 'BookWorm_Pro', xp: 1890, avatar: '👑', streak: 32 },
  { rank: 3, name: 'FocusMaster', xp: 1650, avatar: '🧙', streak: 28 },
  { rank: 4, name: 'LearnQueen', xp: 1420, avatar: '🦉', streak: 21 },
  { rank: 5, name: 'PageTurner', xp: 1180, avatar: '🦉', streak: 18 },
  { rank: 6, name: 'QuietReader', xp: 980, avatar: '🐥', streak: 14 },
  { rank: 7, name: 'NightOwlStudy', xp: 750, avatar: '🐥', streak: 11 },
  { rank: 8, name: 'MathGenius', xp: 620, avatar: '🐥', streak: 8 },
  { rank: 9, name: 'Demo User (You)', xp: 45, avatar: '🐣', streak: 7, isUser: true },
  { rank: 10, name: 'NewLearner', xp: 25, avatar: '🐣', streak: 2 },
];

const DEMO_NOTES = [
  { 
    id: 1, 
    user: 'StudyDragon42', 
    avatar: '🐉',
    book: 'Advanced Physics',
    note: "Finally understood quantum entanglement! The key is thinking about information transfer, not physical movement.",
    date: '2 hours ago',
    likes: 24
  },
  { 
    id: 2, 
    user: 'BookWorm_Pro', 
    avatar: '👑',
    book: 'World History',
    note: "The Industrial Revolution wasn't just about machines - it fundamentally changed how humans relate to time and work.",
    date: '5 hours ago',
    likes: 18
  },
  { 
    id: 3, 
    user: 'FocusMaster', 
    avatar: '🧙',
    book: 'German Language',
    note: "Tip: German separable verbs make more sense if you think of them as verb + direction particles. Aufstehen = stand + up!",
    date: '1 day ago',
    likes: 31
  },
  { 
    id: 4, 
    user: 'LearnQueen', 
    avatar: '🦉',
    book: 'Mathematics',
    note: "Integration by parts clicked today! Think of it as the 'product rule in reverse' - that mental model helps.",
    date: '1 day ago',
    likes: 15
  },
];

export const SocialPreview = ({ onClose }: SocialPreviewProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('leaderboard');

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-display font-bold text-foreground">Community</h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Preview Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-level-purple/20 text-level-purple text-sm mb-6">
        <span>✨</span>
        <span className="font-medium">Preview Feature</span>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'leaderboard' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-foreground hover:bg-muted'
          }`}
        >
          🏆 Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'notes' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-foreground hover:bg-muted'
          }`}
        >
          📝 Notes Feed
        </button>
      </div>

      {activeTab === 'leaderboard' ? (
        <div className="space-y-2">
          {DEMO_LEADERBOARD.map((user, index) => (
            <div 
              key={user.rank}
              className={`card-glow p-3 rounded-xl flex items-center gap-3 animate-slide-up ${
                user.isUser ? 'ring-2 ring-primary' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                user.rank === 1 ? 'bg-xp-gold text-primary-foreground' :
                user.rank === 2 ? 'bg-muted-foreground/50 text-foreground' :
                user.rank === 3 ? 'bg-orange-600 text-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {user.rank}
              </div>
              <span className="text-2xl">{user.avatar}</span>
              <div className="flex-1">
                <p className={`font-semibold ${user.isUser ? 'text-primary' : 'text-foreground'}`}>
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  🔥 {user.streak} day streak
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gradient-xp">{user.xp}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {DEMO_NOTES.map((note, index) => (
            <div 
              key={note.id}
              className="card-glow p-4 rounded-xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{note.avatar}</span>
                <span className="font-semibold text-foreground">{note.user}</span>
                <span className="text-xs text-muted-foreground">• {note.date}</span>
              </div>
              <div className="mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  📚 {note.book}
                </span>
              </div>
              <p className="text-foreground mb-3">{note.note}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  ❤️ {note.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coming Soon Note */}
      <div className="mt-6 p-4 rounded-xl border border-dashed border-border text-center">
        <p className="text-sm text-muted-foreground">
          🔮 Full social features coming soon!<br />
          <span className="text-xs">Join the waitlist to be notified</span>
        </p>
      </div>
    </div>
  );
};
