import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Gamepad2, 
  Timer, 
  Brain, 
  BarChart3, 
  BookOpen, 
  Target, 
  Trophy, 
  Flame,
  Sparkles,
  ChevronRight,
  Check,
  Star,
  Zap,
  TrendingUp,
  Calendar,
  MessageCircle,
  Crown,
  Infinity,
  Shield,
  Gift,
  X
} from 'lucide-react';
import { Mascot } from '@/components/Mascot';
import { MobileNav } from '@/components/MobileNav';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Footer } from '@/components/Footer';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { isGuest } = useAuth();

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
              🦉
            </div>
            <span className="font-display font-bold text-lg">StudyQuest</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/demo">
              <Button variant="ghost" size="sm">Try Demo</Button>
            </Link>
            {isGuest ? (
              <Button size="sm" className="btn-primary">Join Waitlist</Button>
            ) : (
              <UserMenu />
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-40 left-1/4 w-32 h-32 bg-xp-gold/5 rounded-full blur-2xl animate-float" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
                Turn Studying Into{' '}
                <span className="text-gradient-gold animate-pulse-glow inline-block">Visible Progress</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Focus. Learn. Reflect. Level up. — The study app that makes your learning journey feel like a game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/demo">
                  <Button size="lg" className="btn-primary w-full sm:w-auto text-lg px-8 py-6 group animate-pulse-glow hover:scale-105 transition-transform">
                    Try the Demo
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 hover:scale-105 transition-transform hover:border-primary/50">
                  Join the Waitlist
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>No signup required • Free demo</p>
            </div>

            {/* Hero Visual - App Mockup */}
            <div className="relative animate-scale-in animate-tilt-float" style={{ animationDelay: '0.3s' }}>
              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border shadow-2xl hover:shadow-primary/20 transition-shadow duration-500 animate-glow-ring">
                {/* XP Bar Mockup */}
                <div className="bg-background/80 rounded-2xl p-4 mb-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Level 5 • Thinker</span>
                    <span className="text-xs text-xp-gold font-bold animate-shimmer">2,450 XP</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full xp-bar-shimmer" style={{ animation: 'xp-fill 2s ease-out 0.8s forwards', width: '0%' }} />
                  </div>
                </div>

                {/* Stats Preview */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-background/80 rounded-xl p-3 text-center animate-slide-up hover:scale-105 transition-transform group" style={{ animationDelay: '0.6s' }}>
                    <Flame className="w-5 h-5 text-streak-orange mx-auto mb-1 animate-breathe" />
                    <span className="text-lg font-bold animate-count-up" style={{ animationDelay: '1s' }}>12</span>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="bg-background/80 rounded-xl p-3 text-center animate-slide-up hover:scale-105 transition-transform group" style={{ animationDelay: '0.7s' }}>
                    <Timer className="w-5 h-5 text-primary mx-auto mb-1 group-hover:animate-pulse" />
                    <span className="text-lg font-bold">8.5h</span>
                    <p className="text-xs text-muted-foreground">Focus Time</p>
                  </div>
                  <div className="bg-background/80 rounded-xl p-3 text-center animate-slide-up hover:scale-105 transition-transform group" style={{ animationDelay: '0.8s' }}>
                    <BookOpen className="w-5 h-5 text-progress-green mx-auto mb-1 group-hover:animate-pulse" />
                    <span className="text-lg font-bold">3</span>
                    <p className="text-xs text-muted-foreground">Books</p>
                  </div>
                </div>

                {/* Mascot with idle animation */}
                <div className="absolute -bottom-6 -right-6 transform scale-75 animate-breathe">
                  <div className="animate-blink">
                    <Mascot message="You're doing great!" />
                  </div>
                </div>
              </div>

              {/* Floating elements with enhanced animations */}
              <div className="absolute -top-4 -left-4 bg-xp-gold/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-xp-gold/30 animate-float-slow shadow-lg">
                <span className="text-sm font-bold text-xp-gold animate-shimmer">+50 XP</span>
              </div>
              <div className="absolute top-1/2 -right-8 bg-progress-green/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-progress-green/30 animate-float-slow shadow-lg" style={{ animationDelay: '1s' }}>
                <span className="text-sm font-medium text-progress-green flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 animate-pulse" /> Level Up!
                </span>
              </div>
              <div className="absolute -bottom-2 left-1/4 bg-accent/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-accent/30 animate-float-slow shadow-lg" style={{ animationDelay: '2s' }}>
                <span className="text-sm font-medium text-accent flex items-center gap-1">
                  <Sparkles className="w-4 h-4 animate-pulse" /> AI Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section - Layered Mockups */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              See Your Progress{' '}
              <span className="text-gradient-gold">Come to Life</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Real features. Real progress. Built for learners who want results.
            </p>
          </div>

          {/* Layered App Screenshots */}
          <div className="relative max-w-4xl mx-auto h-[500px] md:h-[550px]">
            {/* Background Layer - Stats Screen */}
            <div className="absolute left-0 top-8 w-[280px] md:w-[320px] animate-float-slow opacity-80 hover:opacity-100 transition-opacity" style={{ animationDelay: '0.5s' }}>
              <div className="bg-card rounded-2xl p-5 border border-border shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="font-display font-bold">Your Stats</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🔥</span>
                      <span className="text-xl font-bold text-gradient-xp animate-shimmer">12</span>
                      <span className="text-xs text-muted-foreground">Day Streak</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <span className="text-lg font-bold">17</span>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                    </div>
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <span className="text-lg font-bold">8.5h</span>
                      <p className="text-xs text-muted-foreground">Focus</p>
                    </div>
                  </div>
                  {/* Mini Heatmap */}
                  <div className="grid grid-cols-7 gap-1">
                    {[...Array(14)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-sm animate-fade-in ${
                          [0, 2, 5, 6, 8, 10, 12, 13].includes(i) 
                            ? 'bg-progress-green' 
                            : 'bg-muted'
                        }`}
                        style={{ animationDelay: `${1 + i * 0.05}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Layer - Main Dashboard */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[300px] md:w-[360px] z-10 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-card rounded-2xl p-5 border-2 border-primary/30 shadow-2xl animate-glow-ring">
                {/* XP Bar */}
                <div className="bg-background rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl animate-breathe">🧠</span>
                      <span className="font-semibold">Thinker</span>
                    </div>
                    <span className="text-xs text-xp-gold font-bold">Lv.5</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full xp-bar-shimmer" style={{ width: '65%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">2,450 / 3,000 XP</p>
                </div>

                {/* Book Progress */}
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Books</p>
                  {[
                    { icon: '📘', title: 'Atomic Habits', progress: 75 },
                    { icon: '📗', title: 'Deep Work', progress: 40 },
                  ].map((book, i) => (
                    <div key={i} className="bg-muted rounded-lg p-3 animate-slide-up hover:scale-[1.02] transition-transform" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span>{book.icon}</span>
                        <span className="text-sm font-medium flex-1">{book.title}</span>
                        <span className="text-xs text-progress-green">{book.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-progress-green rounded-full transition-all duration-1000"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Start Session Button */}
                <button className="w-full mt-4 py-3 rounded-xl font-semibold btn-primary animate-pulse-glow">
                  Start Focus Session
                </button>
              </div>
            </div>

            {/* Right Layer - Evolution Path */}
            <div className="absolute right-0 top-12 w-[260px] md:w-[300px] animate-float-slow opacity-80 hover:opacity-100 transition-opacity" style={{ animationDelay: '1s' }}>
              <div className="bg-card rounded-2xl p-5 border border-border shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-xp-gold" />
                  <span className="font-display font-bold">Evolution Path</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  {['👶', '📚', '🧒', '🧠', '🎓', '🐉'].map((emoji, i) => (
                    <div 
                      key={i} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg animate-scale-in ${
                        i <= 3 ? 'bg-primary/20 border-2 border-primary' : 'bg-muted opacity-50'
                      } ${i === 3 ? 'animate-breathe ring-2 ring-primary ring-offset-2 ring-offset-card' : ''}`}
                      style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '60%',
                      background: 'linear-gradient(90deg, hsl(var(--level-purple)), hsl(var(--primary)))'
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  <span className="text-xp-gold font-semibold">550 XP</span> to next evolution
                </p>
              </div>
            </div>

            {/* Floating Achievement Badge */}
            <div className="absolute bottom-8 left-1/4 animate-float-slow" style={{ animationDelay: '1.5s' }}>
              <div className="bg-xp-gold/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-xp-gold/30 shadow-lg animate-glow-ring">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-sm font-bold text-xp-gold">Week Warrior</p>
                    <p className="text-xs text-muted-foreground">7-day streak achieved!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs under mockup */}
          <div className="text-center mt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button size="lg" className="btn-primary w-full sm:w-auto text-lg px-8 py-6 group animate-pulse-glow hover:scale-105 transition-transform">
                  Try the Demo
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 hover:scale-105 transition-transform hover:border-primary/50">
                Join the Waitlist
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">No signup required • Free demo</p>
          </div>
        </div>
      </section>


      {/* Problem Section */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-destructive/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 animate-slide-up">
            Sound Familiar?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "You study, but progress feels invisible",
              "You forget what you read after a few days",
              "Motivation drops without clear milestones",
              "Productivity apps track time, not learning"
            ].map((problem, i) => (
              <div 
                key={i}
                className="flex items-center gap-4 bg-background/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 text-left animate-slide-up hover:bg-background/70 hover:border-destructive/30 transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-destructive/20 transition-all">
                  <span className="text-destructive text-lg">✗</span>
                </div>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">{problem}</p>
              </div>
            ))}
          </div>
          <p className="text-xl text-foreground font-medium animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Studying shouldn't feel like{' '}
            <span className="text-gradient-gold animate-pulse-glow inline-block">effort with no reward.</span>
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              What Makes This Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              We combined the best of gamification with proven learning techniques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Gamepad2,
                title: "RPG-Style Progress",
                description: "Earn XP, level up, and evolve your avatar from Toddler to Master",
                color: "text-primary"
              },
              {
                icon: Timer,
                title: "Focus Sessions",
                description: "30-minute deep work sessions designed for real learning",
                color: "text-session-blue"
              },
              {
                icon: Brain,
                title: "Reflection + AI",
                description: "Capture insights and let AI synthesize your learning",
                color: "text-accent"
              },
              {
                icon: BarChart3,
                title: "Stats & Momentum",
                description: "Streaks, heatmaps, and analytics that keep you going",
                color: "text-progress-green"
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${feature.color}`}>
                  <feature.icon className="w-7 h-7 group-hover:animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Five simple steps to transform your learning
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { icon: BookOpen, label: "Choose a Book", step: 1 },
                { icon: Timer, label: "Focus 30 min", step: 2 },
                { icon: Brain, label: "Reflect & Note", step: 3 },
                { icon: Sparkles, label: "AI Synthesis", step: 4 },
                { icon: Trophy, label: "Earn XP & Rank", step: 5 }
              ].map((step, i) => (
                <div 
                  key={i}
                  className="relative text-center animate-scale-in group"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="relative z-10 w-20 h-20 rounded-full bg-background border-2 border-primary mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-primary/30 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                    <step.icon className="w-8 h-8 text-primary group-hover:animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      {step.step}
                    </div>
                  </div>
                  <p className="font-medium group-hover:text-primary transition-colors">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link to="/demo">
              <Button size="lg" className="btn-primary text-lg px-8 group hover:scale-105 transition-transform animate-pulse-glow">
                Experience the Demo
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Built for focused learners who want results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Per-Book Tracking", desc: "Individual progress for each book you study" },
              { icon: MessageCircle, title: "Notes & Memory", desc: "Capture insights that stick with AI help" },
              { icon: Target, title: "Weekly Goals", desc: "Set challenges and crush them every week" },
              { icon: Trophy, title: "Achievements", desc: "Unlock badges as you hit milestones" },
              { icon: Calendar, title: "Heatmaps & Streaks", desc: "Visualize your consistency over time" },
              { icon: Star, title: "Mascot Guide", desc: "A friendly companion to keep you motivated" }
            ].map((feature, i) => (
              <div 
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-xp-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-8 animate-slide-up">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Built for students & self-learners</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Inspired by What Works
          </h2>
          <p className="text-lg text-muted-foreground mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            We studied Duolingo's gamification, RPG progression systems, and learning science to create something new.
          </p>

          {/* Preview Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Finally, an app that makes studying feel rewarding!", name: "Preview User", role: "Student" },
              { quote: "The XP system keeps me coming back every day.", name: "Preview User", role: "Self-Learner" },
              { quote: "Love seeing my avatar evolve as I learn more.", name: "Preview User", role: "Bookworm" }
            ].map((testimonial, i) => (
              <div 
                key={i}
                className="bg-background rounded-xl p-6 border border-border text-left animate-scale-in hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-xp-gold text-xp-gold group-hover:scale-110 transition-transform" style={{ transitionDelay: `${j * 50}ms` }} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-sm">👤</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">* Preview testimonial</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo vs Full Version Section */}
      <section id="pricing" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-xp-gold/5 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              Demo vs{' '}
              <span className="text-gradient-gold">Full Version</span>
            </h2>
            <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Try everything free, then unlock unlimited access
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Demo Card */}
            <div className="bg-card rounded-2xl p-8 border border-border animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl">Demo</h3>
                  <p className="text-sm text-muted-foreground">Free forever</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  { text: '2 learning sessions', included: true },
                  { text: 'Limited credits', included: true },
                  { text: 'Basic avatars', included: true },
                  { text: 'Temporary progress', included: true },
                  { text: 'Try all features', included: true },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                      <Check className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link to="/demo">
                <Button variant="outline" className="w-full py-6 text-lg group">
                  Try Demo Free
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-center text-sm text-muted-foreground mt-3">No account required</p>
            </div>

            {/* Full Version Card */}
            <div className="bg-gradient-to-br from-card to-xp-gold/5 rounded-2xl p-8 border-2 border-xp-gold/30 relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-xp-gold text-background px-4 py-1 rounded-full text-sm font-medium">
                Recommended
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-xp-gold/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-xp-gold" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl">Full Version</h3>
                  <p className="text-sm text-xp-gold">Lifetime access</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gradient-gold">$4.99</span>
                <span className="text-muted-foreground ml-2">one-time</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  { text: 'Unlimited sessions', icon: Infinity },
                  { text: 'Unlimited credits', icon: Zap },
                  { text: 'Premium avatars & crown', icon: Crown },
                  { text: 'Exclusive themes', icon: Sparkles },
                  { text: 'Progress saved forever', icon: Shield },
                  { text: 'No subscription', icon: Check },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-xp-gold/20 flex items-center justify-center">
                      <item.icon className="w-3 h-3 text-xp-gold" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link to="/demo">
                <Button className="w-full py-6 text-lg bg-gradient-to-r from-xp-gold to-yellow-600 hover:from-xp-gold/90 hover:to-yellow-600/90 text-background group">
                  Unlock Full Version
                  <Crown className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-center text-sm text-muted-foreground mt-3">Pay once, own forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Credits Work Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              How{' '}
              <span className="text-gradient-gold">Credits</span>
              {' '}Work
            </h2>
            <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Simple system, big rewards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Start a Session',
                description: 'Each focus session uses 1 credit',
                detail: 'Demo: 2 credits • Premium: ∞',
              },
              {
                icon: '⭐',
                title: 'Earn XP',
                description: 'Complete sessions to gain experience points',
                detail: '25-50 XP per session',
              },
              {
                icon: '🚀',
                title: 'Level Up',
                description: 'XP unlocks new avatars and achievements',
                detail: 'Toddler → Dragon evolution',
              },
            ].map((step, i) => (
              <div 
                key={i}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all group animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{step.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <p className="text-xs text-primary font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-xp-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Early Bird Benefits</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
            Join the{' '}
            <span className="text-gradient-gold">Waitlist</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Be first in line and get exclusive rewards
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '🏅', title: 'Early Access Badge', desc: 'Show off in your profile' },
              { icon: '🦊', title: 'Exclusive Avatar', desc: 'Limited edition character' },
              { icon: '💰', title: '$2.99 Launch Price', desc: 'Save 40% off regular price' },
            ].map((benefit, i) => (
              <div 
                key={i}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border animate-slide-up"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="text-2xl mb-2">{benefit.icon}</div>
                <p className="font-medium text-sm">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Waitlist Form */}
          <div className="bg-card rounded-2xl p-6 border border-border max-w-md mx-auto animate-scale-in" style={{ animationDelay: '0.4s' }}>
            {submitted ? (
              <div className="flex items-center gap-3 text-progress-green justify-center py-4">
                <Check className="w-5 h-5" />
                <span className="font-medium">You're on the list! Check your email soon.</span>
              </div>
            ) : (
              <>
                <form onSubmit={handleWaitlist} className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" className="btn-primary">
                    Join Waitlist
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-3">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="mb-8 animate-float">
            <Mascot message="Ready to level up?" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
            Start Learning in a Way That{' '}
            <span className="text-gradient-gold animate-pulse-glow inline-block">Actually Sticks</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Join thousands of learners who've transformed their study habits
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/demo">
              <Button size="lg" className="btn-primary w-full sm:w-auto text-lg px-8 py-6 group animate-pulse-glow hover:scale-105 transition-transform">
                Try the Demo — Free
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 hover:scale-105 hover:border-xp-gold/50 transition-all gap-2">
                <Crown className="w-5 h-5 text-xp-gold" />
                Unlock Full Version — $4.99
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
