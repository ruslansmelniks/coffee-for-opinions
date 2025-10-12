-- Remove the foreign key constraint on profiles.id
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Update handle_new_user to merge existing profiles when users log in
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  existing_profile_id UUID;
BEGIN
  -- Check if a profile already exists with this email (from survey completion)
  SELECT id INTO existing_profile_id
  FROM public.profiles
  WHERE email = NEW.email;

  IF existing_profile_id IS NOT NULL THEN
    -- Update existing profile with auth user id
    UPDATE public.profiles
    SET id = NEW.id,
        name = COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', name),
        updated_at = NOW()
    WHERE email = NEW.email;
  ELSE
    -- Create new profile
    INSERT INTO public.profiles (id, email, name)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name')
    );
  END IF;
  
  RETURN NEW;
END;
$$;