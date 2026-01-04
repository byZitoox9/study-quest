import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { CookieSettingsButton } from './CookieConsent';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
                🦉
              </div>
              <span className="font-display font-bold text-lg">StudyQuest</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Turn your learning into visible progress. Focus sessions, reflections, 
              and a reward system that keeps you motivated.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/demo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Try Demo
                </Link>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/impressum" className="text-muted-foreground hover:text-foreground transition-colors">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StudyQuest. All rights reserved.
          </p>
          <a 
            href="mailto:kokalolishamer@gmail.com" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
            kokalolishamer@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};
