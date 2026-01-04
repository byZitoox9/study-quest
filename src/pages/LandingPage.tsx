import { useState, useRef } from 'react';
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
  Play,
  X,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Mascot } from '@/components/Mascot';
import demoVideo from '@/assets/demo-walkthrough.mp4';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoOpen = () => {
    setVideoOpen(true);
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  const handleVideoClose = () => {
    setVideoOpen(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
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
          <div className="flex items-center gap-3">
            <Link to="/demo">
              <Button variant="ghost" size="sm">Try Demo</Button>
            </Link>
            <Button size="sm" className="btn-primary">Join Waitlist</Button>
          </div>
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
            <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border shadow-2xl hover:shadow-primary/10 transition-shadow duration-500">
                {/* XP Bar Mockup */}
                <div className="bg-background/80 rounded-2xl p-4 mb-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Level 5 • Thinker</span>
                    <span className="text-xs text-xp-gold font-bold animate-pulse">2,450 XP</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-xp-gold to-xp-glow rounded-full xp-bar-fill" style={{ animation: 'xp-fill 2s ease-out 0.8s forwards', width: '0%' }} />
                  </div>
                </div>

                {/* Stats Preview */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-background/80 rounded-xl p-3 text-center animate-slide-up hover:scale-105 transition-transform" style={{ animationDelay: '0.6s' }}>
                    <Flame className="w-5 h-5 text-streak-orange mx-auto mb-1 animate-pulse" />
                    <span className="text-lg font-bold">12</span>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="bg-background/80 rounded-xl p-3 text-center animate-slide-up hover:scale-105 transition-transform" style={{ animationDelay: '0.7s' }}>
                    <Timer className="w-5 h-5 text-primary mx-auto mb-1" />
                    <span className="text-lg font-bold">8.5h</span>
                    <p className="text-xs text-muted-foreground">Focus Time</p>
                  </div>
                  <div className="bg-background/80 rounded-xl p-3 text-center animate-slide-up hover:scale-105 transition-transform" style={{ animationDelay: '0.8s' }}>
                    <BookOpen className="w-5 h-5 text-progress-green mx-auto mb-1" />
                    <span className="text-lg font-bold">3</span>
                    <p className="text-xs text-muted-foreground">Books</p>
                  </div>
                </div>

                {/* Mascot */}
                <div className="absolute -bottom-6 -right-6 transform scale-75 animate-float">
                  <Mascot message="You're doing great!" />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-xp-gold/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-xp-gold/30 animate-float shadow-lg">
                <span className="text-sm font-bold text-xp-gold">+50 XP</span>
              </div>
              <div className="absolute top-1/2 -right-8 bg-progress-green/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-progress-green/30 animate-float shadow-lg" style={{ animationDelay: '0.5s' }}>
                <span className="text-sm font-medium text-progress-green flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> Level Up!
                </span>
              </div>
              <div className="absolute -bottom-2 left-1/4 bg-accent/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-accent/30 animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                <span className="text-sm font-medium text-accent flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> AI Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Play className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Guided Walkthrough</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              A Guided Walkthrough of the{' '}
              <span className="text-gradient-gold">Real Demo</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Watch the actual app in action — every screen you see is real
            </p>
          </div>

          {/* Video Thumbnail */}
          <div 
            className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-border/50"
            onClick={handleVideoOpen}
          >
            {/* Video as thumbnail (muted, looping preview) */}
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              src={demoVideo}
              muted
              loop
              playsInline
              autoPlay
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent group-hover:opacity-50 transition-opacity" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                
                {/* Play button */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Video captions overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <p className="text-lg md:text-xl font-medium text-foreground">
                See StudyQuest in action
              </p>
              <p className="text-sm text-muted-foreground mt-1">Click to watch with sound</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 bg-xp-gold/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-xp-gold/30">
              <span className="text-xs font-bold text-xp-gold">+50 XP</span>
            </div>
            <div className="absolute top-4 right-4 bg-progress-green/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-progress-green/30">
              <span className="text-xs font-medium text-progress-green flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Level Up!
              </span>
            </div>
          </div>

          {/* Video Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
            {[
              "Focus for 30 minutes",
              "Reflect & remember",
              "Level up your learning",
              "See your progress grow"
            ].map((caption, i) => (
              <div 
                key={i} 
                className="text-center py-3 px-4 rounded-xl bg-card/50 border border-border/50 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="text-sm font-medium text-muted-foreground">{caption}</p>
              </div>
            ))}
          </div>

          {/* CTA under video */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button size="lg" className="btn-primary w-full sm:w-auto text-lg px-8 py-6 group">
                  Try the Demo Yourself
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <Dialog open={videoOpen} onOpenChange={handleVideoClose}>
          <DialogContent className="max-w-5xl w-full p-0 bg-background border-border overflow-hidden">
            <div className="relative aspect-video bg-black">
              {/* Actual Video Player */}
              <video 
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain"
                src={demoVideo}
                muted={isMuted}
                playsInline
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-primary-foreground" fill="currentColor" />
                  ) : (
                    <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                  )}
                </button>
              </div>
              
              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <Link to="/demo" onClick={handleVideoClose}>
                    <Button size="sm" className="btn-primary">
                      Try Demo Now
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Close button */}
              <button 
                onClick={handleVideoClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/demo">
              <Button size="lg" className="btn-primary w-full sm:w-auto text-lg px-8 py-6 group animate-pulse-glow hover:scale-105 transition-transform">
                Try the Demo
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 hover:scale-105 hover:border-primary/50 transition-all">
              Join the Waitlist
            </Button>
          </div>

          {/* Inline Waitlist Form */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border max-w-md mx-auto animate-scale-in hover:border-primary/30 transition-all" style={{ animationDelay: '0.3s' }}>
            {submitted ? (
              <div className="flex items-center gap-3 text-progress-green animate-bounce-in">
                <Check className="w-5 h-5" />
                <span>You're on the list! We'll be in touch soon.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 focus:border-primary transition-colors"
                  required
                />
                <Button type="submit" className="btn-primary hover:scale-105 transition-transform">
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm">
              🦉
            </div>
            <span className="font-display font-bold">StudyQuest</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for learners everywhere
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
