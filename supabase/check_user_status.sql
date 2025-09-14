-- Check User Status Script
-- Run this in Supabase SQL Editor to check user accounts

-- Check all users in auth.users table
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at,
  raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC;

-- Check if profiles exist for these users
SELECT 
  u.id as user_id,
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
ORDER BY u.created_at DESC;

-- Check the latest user (most recent registration)
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  u.created_at,
  u.raw_user_meta_data,
  CASE 
    WHEN u.email_confirmed_at IS NULL THEN 'Email not verified'
    ELSE 'Email verified'
  END as verification_status
FROM auth.users u
ORDER BY u.created_at DESC
LIMIT 1;
