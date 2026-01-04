import { useState, useEffect, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Cookie, Settings, Shield } from 'lucide-react';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
}

interface CookieConsentContextType {
  consent: 'pending' | 'accepted' | 'rejected' | 'custom';
  settings: CookieSettings;
  acceptAll: () => void;
  acceptEssential: () => void;
  saveCustomSettings: (settings: CookieSettings) => void;
  resetConsent: () => void;
  showBanner: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    // Return default values if not within provider
    return {
      consent: 'pending' as const,
      settings: { essential: true, analytics: false, functional: false },
      acceptAll: () => {},
      acceptEssential: () => {},
      saveCustomSettings: () => {},
      resetConsent: () => {},
      showBanner: false,
    };
  }
  return context;
};

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useState<'pending' | 'accepted' | 'rejected' | 'custom'>('pending');
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    const savedSettings = localStorage.getItem('cookie-settings');
    
    if (savedConsent) {
      setConsent(savedConsent as typeof consent);
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const acceptAll = () => {
    const newSettings = { essential: true, analytics: true, functional: true };
    setSettings(newSettings);
    setConsent('accepted');
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-settings', JSON.stringify(newSettings));
  };

  const acceptEssential = () => {
    const newSettings = { essential: true, analytics: false, functional: false };
    setSettings(newSettings);
    setConsent('rejected');
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-settings', JSON.stringify(newSettings));
  };

  const saveCustomSettings = (customSettings: CookieSettings) => {
    setSettings({ ...customSettings, essential: true });
    setConsent('custom');
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('cookie-settings', JSON.stringify({ ...customSettings, essential: true }));
  };

  const resetConsent = () => {
    setConsent('pending');
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-settings');
  };

  return (
    <CookieConsentContext.Provider value={{
      consent,
      settings,
      acceptAll,
      acceptEssential,
      saveCustomSettings,
      resetConsent,
      showBanner: consent === 'pending',
    }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const CookieBanner = () => {
  const { consent, settings, acceptAll, acceptEssential, saveCustomSettings } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [customSettings, setCustomSettings] = useState<CookieSettings>(settings);

  if (consent !== 'pending') return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
        <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-lg rounded-xl border border-border shadow-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">We value your privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your experience and analyze app usage. 
                You can customize your preferences or accept essential cookies only.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={acceptAll} size="sm">
                  Accept all
                </Button>
                <Button onClick={acceptEssential} variant="outline" size="sm">
                  Reject non-essential
                </Button>
                <Button 
                  onClick={() => setShowSettings(true)} 
                  variant="ghost" 
                  size="sm"
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Cookie settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Cookie Settings
            </DialogTitle>
            <DialogDescription>
              Customize which cookies you want to allow. Essential cookies cannot be disabled.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Essential Cookies</p>
                <p className="text-sm text-muted-foreground">
                  Required for the app to function properly.
                </p>
              </div>
              <Switch checked disabled />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Analytics Cookies</p>
                <p className="text-sm text-muted-foreground">
                  Help us understand how the app is used.
                </p>
              </div>
              <Switch 
                checked={customSettings.analytics}
                onCheckedChange={(checked) => 
                  setCustomSettings(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Functional Cookies</p>
                <p className="text-sm text-muted-foreground">
                  Enable personalization and advanced features.
                </p>
              </div>
              <Switch 
                checked={customSettings.functional}
                onCheckedChange={(checked) => 
                  setCustomSettings(prev => ({ ...prev, functional: checked }))
                }
              />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              saveCustomSettings(customSettings);
              setShowSettings(false);
            }}>
              Save preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const CookieSettingsButton = () => {
  const { resetConsent } = useCookieConsent();
  
  return (
    <button 
      onClick={resetConsent}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      Cookie Settings
    </button>
  );
};
