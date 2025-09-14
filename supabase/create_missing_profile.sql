-- Create Missing Profile Script
-- This will create a profile for the user if it doesn't exist

-- First, check if profile exists
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.id as profile_id,
  p.first_name,
  p.last_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'noxious0510@gmail.com';

-- Create the missing profile
INSERT INTO public.profiles (
  id,
  email,
  first_name,
  last_name,
  student_id,
  major,
  year,
  role
) 
SELECT 
  u.id,
  u.email,
  u.raw_user_meta_data->>'first_name' as first_name,
  u.raw_user_meta_data->>'last_name' as last_name,
  u.raw_user_meta_data->>'student_id' as student_id,
  u.raw_user_meta_data->>'major' as major,
  u.raw_user_meta_data->>'year' as year,
  'student' as role
FROM auth.users u
WHERE u.email = 'noxious0510@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
);

-- Verify the profile was created
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.id as profile_id,
  p.first_name,
  p.last_name,
  p.student_id,
  p.major,
  p.year
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'noxious0510@gmail.com';
