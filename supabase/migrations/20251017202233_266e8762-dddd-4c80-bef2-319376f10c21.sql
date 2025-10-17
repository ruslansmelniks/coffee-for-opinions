-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create new policy that allows users to see profiles by email OR by id
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() = id 
    OR 
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );