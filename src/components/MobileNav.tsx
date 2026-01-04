import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

interface MobileNavProps {
  showAuth?: boolean;
  links?: { href: string; label: string }[];
  onUpgradeClick?: () => void;
  sessionsRemaining?: number;
}

export const MobileNav = ({ showAuth = true, links = [], onUpgradeClick, sessionsRemaining }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isGuest, isPremium } = useAuth();

  const defaultLinks = [
    { href: '/demo', label: 'Try Demo' },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
                🦉
              </div>
              <span className="font-display font-bold">StudyQuest</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Plan Info Section - Show for logged in users */}
          {!isGuest && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Plan</span>
                {isPremium ? (
                  <span className="text-xs bg-xp-gold/20 text-xp-gold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                ) : (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    Free
                  </span>
                )}
              </div>
              {!isPremium && sessionsRemaining !== undefined && (
                <p className="text-xs text-muted-foreground mt-1">
                  {sessionsRemaining} free session{sessionsRemaining !== 1 ? 's' : ''} left
                </p>
              )}
              {!isPremium && onUpgradeClick && (
                <Button
                  size="sm"
                  className="w-full mt-3 btn-primary gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    onUpgradeClick();
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Upgrade to Premium
                </Button>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          {showAuth && (
            <div className="p-4 border-t border-border space-y-3">
              {isGuest ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      setShowAuthModal(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full btn-primary"
                    onClick={() => {
                      setIsOpen(false);
                      setShowAuthModal(true);
                    }}
                  >
                    Join Waitlist
                  </Button>
                </>
              ) : (
                <div className="flex justify-center">
                  <UserMenu onUpgradeClick={() => {
                    setIsOpen(false);
                    onUpgradeClick?.();
                  }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        defaultMode="signup"
      />
    </>
  );
};
