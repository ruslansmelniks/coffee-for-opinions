-- ============================================================================
-- COFFEEDATA DATABASE - FRESH INSTALLATION
-- Drops all existing tables/functions and recreates from scratch
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1: Drop all existing objects
-- ----------------------------------------------------------------------------

-- Drop tables (CASCADE removes all dependencies)
DROP TABLE IF EXISTS public.voucher_claims CASCADE;
DROP TABLE IF EXISTS public.survey_responses CASCADE;
DROP TABLE IF EXISTS public.vouchers CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.claim_voucher(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.claim_voucher(text, text) CASCADE;
DROP FUNCTION IF EXISTS public.add_survey_points(text, text, integer) CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- ----------------------------------------------------------------------------
-- STEP 2: Create profiles table
-- ----------------------------------------------------------------------------

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  age_range TEXT,
  city TEXT,
  points_balance INTEGER DEFAULT 0,
  total_surveys_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profiles_email ON public.profiles(email);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Public can insert profiles" 
  ON public.profiles FOR INSERT 
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- STEP 3: Create vouchers table
-- ----------------------------------------------------------------------------

CREATE TABLE public.vouchers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  partner TEXT NOT NULL DEFAULT 'Caffeine',
  is_used BOOLEAN DEFAULT FALSE,
  assigned_to TEXT,
  assigned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_vouchers_is_used ON public.vouchers(is_used);
CREATE INDEX idx_vouchers_partner ON public.vouchers(partner);

-- Enable RLS
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their claimed vouchers"
  ON public.vouchers FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE email = assigned_to)
    OR assigned_to IS NULL
  );

-- ----------------------------------------------------------------------------
-- STEP 4: Create survey_responses table
-- ----------------------------------------------------------------------------

CREATE TABLE public.survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  survey_name TEXT NOT NULL,
  points_awarded INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_survey_responses_user_email ON public.survey_responses(user_email);

-- Enable RLS
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own responses"
  ON public.survey_responses FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE email = user_email));

CREATE POLICY "Anyone can insert responses"
  ON public.survey_responses FOR INSERT
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- STEP 5: Create handle_new_user function and trigger
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name')
  )
  ON CONFLICT (email) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- STEP 6: Create add_survey_points function
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.add_survey_points(
  p_user_email TEXT,
  p_survey_name TEXT,
  p_points INTEGER
)
RETURNS jsonb AS $$
DECLARE
  v_user_id UUID;
  v_new_balance INTEGER;
BEGIN
  -- Get or create user profile
  INSERT INTO public.profiles (id, email, points_balance, total_surveys_completed)
  VALUES (
    gen_random_uuid(), 
    p_user_email, 
    p_points, 
    1
  )
  ON CONFLICT (email) DO UPDATE
  SET 
    points_balance = public.profiles.points_balance + p_points,
    total_surveys_completed = public.profiles.total_surveys_completed + 1,
    updated_at = NOW()
  RETURNING id, points_balance INTO v_user_id, v_new_balance;
  
  -- Record the survey response
  INSERT INTO public.survey_responses (user_email, survey_name, points_awarded)
  VALUES (p_user_email, p_survey_name, p_points);
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'new_balance', v_new_balance,
    'message', format('Added %s points. New balance: %s', p_points, v_new_balance)
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM,
      'message', format('Error adding points: %s', SQLERRM)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ----------------------------------------------------------------------------
-- STEP 7: Create claim_voucher function
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.claim_voucher(
  p_user_email TEXT,
  p_partner TEXT DEFAULT 'Caffeine'
)
RETURNS jsonb AS $$
DECLARE
  v_voucher_id UUID;
  v_code TEXT;
  v_points INTEGER;
  v_user_id UUID;
BEGIN
  -- Get user and check points
  SELECT id, points_balance INTO v_user_id, v_points
  FROM public.profiles
  WHERE email = p_user_email;

  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;

  IF v_points < 100 THEN
    RETURN jsonb_build_object(
      'success', false, 
      'error', format('Insufficient points. You have %s, need 100.', v_points)
    );
  END IF;

  -- Get first available voucher (with row lock to prevent race conditions)
  SELECT id, code INTO v_voucher_id, v_code
  FROM public.vouchers
  WHERE is_used = FALSE AND partner = p_partner
  ORDER BY created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;

  IF v_voucher_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false, 
      'error', 'No vouchers available. Please contact support.'
    );
  END IF;

  -- Mark voucher as used
  UPDATE public.vouchers
  SET 
    is_used = TRUE,
    assigned_to = p_user_email,
    assigned_at = NOW()
  WHERE id = v_voucher_id;

  -- Deduct points
  UPDATE public.profiles
  SET points_balance = points_balance - 100
  WHERE id = v_user_id;

  -- Return success with voucher code
  RETURN jsonb_build_object(
    'success', true,
    'voucher_code', v_code,
    'partner', p_partner,
    'remaining_points', v_points - 100
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- INSTALLATION COMPLETE
-- ============================================================================