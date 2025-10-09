-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (Supabase Auth handles core auth, this is for profile data)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  age_range TEXT, -- '18-24', '25-34', '35-44', '45-54', '55+'
  city TEXT,
  points_balance INTEGER DEFAULT 0,
  total_surveys_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vouchers table (unified pool)
CREATE TABLE public.vouchers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  cafe_name TEXT NOT NULL DEFAULT 'Caffeine',
  is_used BOOLEAN DEFAULT FALSE,
  used_by_user_id UUID REFERENCES public.profiles(id),
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey responses table
CREATE TABLE public.survey_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  survey_name TEXT NOT NULL, -- 'banking', 'quick-loans', 'fintech'
  survey_url TEXT, -- Tally form submission URL
  points_awarded INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Voucher claims table (track redemptions)
CREATE TABLE public.voucher_claims (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  voucher_id UUID REFERENCES public.vouchers(id) NOT NULL,
  claimed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_vouchers_is_used ON public.vouchers(is_used);
CREATE INDEX idx_survey_responses_user_id ON public.survey_responses(user_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voucher_claims ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for survey_responses
CREATE POLICY "Users can view own survey responses"
  ON public.survey_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own survey responses"
  ON public.survey_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for voucher_claims
CREATE POLICY "Users can view own voucher claims"
  ON public.voucher_claims FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for vouchers (users can only see their claimed vouchers)
CREATE POLICY "Users can view their claimed vouchers"
  ON public.vouchers FOR SELECT
  USING (auth.uid() = used_by_user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to claim voucher (atomic operation)
CREATE OR REPLACE FUNCTION public.claim_voucher(p_user_id UUID)
RETURNS TABLE (
  voucher_code TEXT,
  cafe_name TEXT
) AS $$
DECLARE
  v_voucher_id UUID;
  v_code TEXT;
  v_cafe TEXT;
  v_points INTEGER;
BEGIN
  -- Check user has enough points
  SELECT points_balance INTO v_points
  FROM public.profiles
  WHERE id = p_user_id;

  IF v_points < 100 THEN
    RAISE EXCEPTION 'Insufficient points. Need 100 points.';
  END IF;

  -- Get first available voucher (with row lock)
  SELECT id, code, cafe_name INTO v_voucher_id, v_code, v_cafe
  FROM public.vouchers
  WHERE is_used = FALSE
  ORDER BY created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;

  IF v_voucher_id IS NULL THEN
    RAISE EXCEPTION 'No vouchers available. Please try again later.';
  END IF;

  -- Mark voucher as used
  UPDATE public.vouchers
  SET is_used = TRUE,
      used_by_user_id = p_user_id,
      used_at = NOW()
  WHERE id = v_voucher_id;

  -- Deduct points
  UPDATE public.profiles
  SET points_balance = points_balance - 100
  WHERE id = p_user_id;

  -- Record claim
  INSERT INTO public.voucher_claims (user_id, voucher_id)
  VALUES (p_user_id, v_voucher_id);

  -- Return voucher details
  RETURN QUERY SELECT v_code, v_cafe;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;