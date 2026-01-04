// Privacy-friendly analytics that respects cookie consent

type AnalyticsEvent = 
  | 'app_opened'
  | 'demo_started'
  | 'session_completed'
  | 'credits_used'
  | 'login_completed'
  | 'upgrade_viewed'
  | 'upgrade_purchased'
  | 'waitlist_signup'
  | 'book_added'
  | 'notes_created'
  | 'xp_gained'
  | 'streak_updated';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

class Analytics {
  private isEnabled(): boolean {
    try {
      const consent = localStorage.getItem('cookie-consent');
      const settings = localStorage.getItem('cookie-settings');
      
      if (consent === 'accepted') return true;
      if (consent === 'custom' && settings) {
        const parsed = JSON.parse(settings);
        return parsed.analytics === true;
      }
      return false;
    } catch {
      return false;
    }
  }

  track(event: AnalyticsEvent, properties?: EventProperties) {
    if (!this.isEnabled()) {
      console.debug('[Analytics] Tracking disabled - no consent');
      return;
    }

    // Store events locally for now - can be sent to a privacy-friendly analytics service later
    const eventData = {
      event,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId(),
    };

    // Log to console in development
    if (import.meta.env.DEV) {
      console.debug('[Analytics]', eventData);
    }

    // Store in localStorage for later batch sending
    this.storeEvent(eventData);
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private storeEvent(eventData: object) {
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      events.push(eventData);
      // Keep only last 100 events
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch {
      // Silently fail if localStorage is full
    }
  }

  // Helper methods for common tracking patterns
  trackSessionDuration(durationMinutes: number) {
    this.track('session_completed', { duration_minutes: durationMinutes });
  }

  trackXPGained(amount: number, source: string) {
    this.track('xp_gained', { amount, source });
  }

  trackUpgradeViewed(location: string) {
    this.track('upgrade_viewed', { location });
  }

  trackCreditsUsed(remaining: number) {
    this.track('credits_used', { remaining });
  }
}

export const analytics = new Analytics();
