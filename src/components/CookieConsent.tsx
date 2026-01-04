import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, X, Check } from 'lucide-react';

type CookieConsent = 'pending' | 'all' | 'essential' | 'custom';

interface CookieSettings {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
}

const CONSENT_KEY = 'cookie_consent';
const SETTINGS_KEY = 'cookie_settings';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>('pending');
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY) as CookieConsent;
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    
    if (savedConsent) {
      setConsent(savedConsent);
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const acceptAll = () => {
    const newSettings = { essential: true, functional: true, analytics: true };
    setConsent('all');
    setSettings(newSettings);
    localStorage.setItem(CONSENT_KEY, 'all');
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  const acceptEssential = () => {
    const newSettings = { essential: true, functional: false, analytics: false };
    setConsent('essential');
    setSettings(newSettings);
    localStorage.setItem(CONSENT_KEY, 'essential');
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  const saveCustomSettings = (customSettings: CookieSettings) => {
    setConsent('custom');
    setSettings(customSettings);
    localStorage.setItem(CONSENT_KEY, 'custom');
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(customSettings));
  };

  const resetConsent = () => {
    setConsent('pending');
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  };

  return {
    consent,
    settings,
    acceptAll,
    acceptEssential,
    saveCustomSettings,
    resetConsent,
    showBanner: consent === 'pending',
  };
};

export const CookieBanner = () => {
  const { consent, settings, acceptAll, acceptEssential, saveCustomSettings, showBanner } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [customSettings, setCustomSettings] = useState<CookieSettings>({
    essential: true,
    functional: false,
    analytics: false,
  });

  if (!showBanner) return null;

  const handleSaveCustom = () => {
    saveCustomSettings(customSettings);
    setShowSettings(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-slide-up">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {!showSettings ? (
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Cookie-Einstellungen</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Wir verwenden Cookies, um Ihre Anmeldung zu speichern und unsere Dienste zu verbessern. 
                  Sie können wählen, welche Cookies Sie akzeptieren möchten.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="btn-primary">
                    <Check className="w-4 h-4 mr-2" />
                    Alle akzeptieren
                  </Button>
                  <Button onClick={acceptEssential} variant="outline">
                    Nur notwendige
                  </Button>
                  <Button onClick={() => setShowSettings(true)} variant="ghost" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Einstellungen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Cookie-Einstellungen</h3>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div>
                  <p className="font-medium">Notwendige Cookies</p>
                  <p className="text-sm text-muted-foreground">Für Anmeldung und grundlegende Funktionen</p>
                </div>
                <div className="w-12 h-6 bg-primary/30 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-primary rounded-full" />
                </div>
              </div>

              <label className="flex items-center justify-between p-4 bg-muted/50 rounded-xl cursor-pointer hover:bg-muted transition-colors">
                <div>
                  <p className="font-medium">Funktionale Cookies</p>
                  <p className="text-sm text-muted-foreground">Für erweiterte Funktionen und Einstellungen</p>
                </div>
                <input
                  type="checkbox"
                  checked={customSettings.functional}
                  onChange={(e) => setCustomSettings(prev => ({ ...prev, functional: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                  customSettings.functional ? 'bg-primary/30 justify-end' : 'bg-muted justify-start'
                }`}>
                  <div className={`w-4 h-4 rounded-full transition-colors ${
                    customSettings.functional ? 'bg-primary' : 'bg-foreground/30'
                  }`} />
                </div>
              </label>

              <label className="flex items-center justify-between p-4 bg-muted/50 rounded-xl cursor-pointer hover:bg-muted transition-colors">
                <div>
                  <p className="font-medium">Analyse-Cookies</p>
                  <p className="text-sm text-muted-foreground">Zur Verbesserung unserer Dienste</p>
                </div>
                <input
                  type="checkbox"
                  checked={customSettings.analytics}
                  onChange={(e) => setCustomSettings(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                  customSettings.analytics ? 'bg-primary/30 justify-end' : 'bg-muted justify-start'
                }`}>
                  <div className={`w-4 h-4 rounded-full transition-colors ${
                    customSettings.analytics ? 'bg-primary' : 'bg-foreground/30'
                  }`} />
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSaveCustom} className="btn-primary flex-1">
                Auswahl speichern
              </Button>
              <Button onClick={acceptAll} variant="outline" className="flex-1">
                Alle akzeptieren
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Cookie Settings Link for Footer
export const CookieSettingsButton = () => {
  const { resetConsent } = useCookieConsent();
  
  return (
    <button 
      onClick={resetConsent}
      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
    >
      Cookie-Einstellungen
    </button>
  );
};
