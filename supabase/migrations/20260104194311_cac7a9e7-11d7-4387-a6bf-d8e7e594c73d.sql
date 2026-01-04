-- Create waitlist table for email signups
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Anyone can join the waitlist (public insert)
CREATE POLICY "Anyone can join waitlist" ON public.waitlist
FOR INSERT WITH CHECK (true);

-- Only admins can view waitlist (no public read)
-- For now, no SELECT policy - data is write-only from frontend