-- Drop the broken policy
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create a helper function to get current user's email in public schema
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS TEXT AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claims', true)::json->>'email',
    ''
  )
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Create new policy using the helper function
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() = id 
    OR 
    email = public.current_user_email()
  );

-- Also update the UPDATE policy to allow users to update their profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (
    auth.uid() = id 
    OR 
    email = public.current_user_email()
  );