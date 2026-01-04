import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Crown, Sparkles } from 'lucide-react';
import { AuthModal } from './AuthModal';

interface UserMenuProps {
  onUpgradeClick?: () => void;
}

export const UserMenu = ({ onUpgradeClick }: UserMenuProps) => {
  const { user, profile, isGuest, isPremium, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (isGuest) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAuthModal(true)}
          className="gap-2"
        >
          <User className="w-4 h-4" />
          Sign In
        </Button>
        <AuthModal
          open={showAuthModal}
          onOpenChange={setShowAuthModal}
          defaultMode="login"
        />
      </>
    );
  }

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            {isPremium ? (
              <Crown className="w-3 h-3 text-xp-gold" />
            ) : (
              <User className="w-3 h-3 text-primary" />
            )}
          </div>
          <span className="hidden sm:inline max-w-24 truncate">{displayName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <span className="truncate">{displayName}</span>
          {isPremium && (
            <span className="text-xs bg-xp-gold/20 text-xp-gold px-2 py-0.5 rounded-full">
              Premium
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!isPremium && (
          <DropdownMenuItem 
            className="text-primary cursor-pointer"
            onClick={onUpgradeClick}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
