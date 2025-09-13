-- Database Verification Script
-- Run this in your Supabase SQL Editor to check your database setup

-- Check if the profiles table exists
SELECT 
  table_name, 
  table_schema 
FROM information_schema.tables 
WHERE table_name = 'profiles' AND table_schema = 'public';

-- Check the structure of the profiles table
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check RLS policies on profiles table
SELECT 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'profiles' AND schemaname = 'public';

-- Check if RLS is enabled on profiles table
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles' AND schemaname = 'public';

-- Test a simple query (this should work if everything is set up correctly)
SELECT COUNT(*) as profile_count FROM public.profiles;

-- Check if you have any profiles
SELECT id, email, first_name, last_name, created_at 
FROM public.profiles 
LIMIT 5;
