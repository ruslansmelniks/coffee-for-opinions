-- Fix search_path security issue for handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name')
  );
  RETURN NEW;
END;
$$;

-- Fix search_path security issue for claim_voucher function
CREATE OR REPLACE FUNCTION public.claim_voucher(p_user_id UUID)
RETURNS TABLE (
  voucher_code TEXT,
  cafe_name TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;