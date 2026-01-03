import type { AppSettings } from '@/types/game';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onClose: () => void;
}

const themes = [
  { id: 'dark' as const, name: 'Dark', color: 'hsl(222 47% 11%)' },
  { id: 'ocean' as const, name: 'Ocean', color: 'hsl(199 89% 20%)' },
  { id: 'forest' as const, name: 'Forest', color: 'hsl(142 40% 15%)' },
  { id: 'sunset' as const, name: 'Sunset', color: 'hsl(15 60% 18%)' },
];

export const SettingsScreen = ({ settings, onUpdateSettings, onClose }: SettingsScreenProps) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Settings</h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="space-y-6">
        {/* Notes Toggle */}
        <div className="card-glow p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Reflection Notes</h3>
              <p className="text-sm text-muted-foreground">Show reflection prompts after sessions</p>
            </div>
            <button
              onClick={() => onUpdateSettings({ notesEnabled: !settings.notesEnabled })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.notesEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div 
                className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform ${
                  settings.notesEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Focus Rating Toggle */}
        <div className="card-glow p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Focus Rating</h3>
              <p className="text-sm text-muted-foreground">Rate your focus after each session</p>
            </div>
            <button
              onClick={() => onUpdateSettings({ focusRatingEnabled: !settings.focusRatingEnabled })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.focusRatingEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div 
                className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform ${
                  settings.focusRatingEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reduce Animations Toggle */}
        <div className="card-glow p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Reduce Animations</h3>
              <p className="text-sm text-muted-foreground">Minimize motion for accessibility</p>
            </div>
            <button
              onClick={() => onUpdateSettings({ reduceAnimations: !settings.reduceAnimations })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.reduceAnimations ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div 
                className={`absolute top-1 w-4 h-4 rounded-full bg-foreground transition-transform ${
                  settings.reduceAnimations ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="card-glow p-4 rounded-xl">
          <h3 className="font-semibold text-foreground mb-3">Theme</h3>
          <div className="grid grid-cols-4 gap-2">
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => onUpdateSettings({ theme: theme.id })}
                className={`p-3 rounded-lg text-center transition-all ${
                  settings.theme === theme.id 
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : 'hover:opacity-80'
                }`}
                style={{ backgroundColor: theme.color }}
              >
                <span className="text-xs font-medium text-foreground">{theme.name}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Theme preview (demo only, doesn't apply globally)
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="p-4 rounded-xl border border-dashed border-border text-center">
          <p className="text-sm text-muted-foreground">
            🎮 Demo Mode • Settings reset on refresh
          </p>
        </div>
      </div>
    </div>
  );
};
