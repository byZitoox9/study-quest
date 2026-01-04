-- Add restrictive SELECT policy to prevent unauthorized access to waitlist emails
CREATE POLICY "No public access to waitlist emails"
ON public.waitlist
FOR SELECT
USING (false);