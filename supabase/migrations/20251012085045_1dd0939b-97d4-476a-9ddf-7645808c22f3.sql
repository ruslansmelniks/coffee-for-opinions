-- Function to add survey points (called by Make.com)
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
  -- Get user ID from email
  SELECT id INTO v_user_id
  FROM public.profiles
  WHERE email = p_user_email;
  
  -- If user doesn't exist, return error
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'User not found with email: ' || p_user_email
    );
  END IF;
  
  -- Update user points and survey count
  UPDATE public.profiles
  SET 
    points_balance = points_balance + p_points,
    total_surveys_completed = total_surveys_completed + 1,
    updated_at = NOW()
  WHERE id = v_user_id
  RETURNING points_balance INTO v_new_balance;
  
  -- Record the survey response
  INSERT INTO public.survey_responses (user_id, survey_name, points_awarded)
  VALUES (v_user_id, p_survey_name, p_points);
  
  -- Return updated balance
  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'new_balance', v_new_balance,
    'message', format('Added %s points. New balance: %s', p_points, v_new_balance)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;