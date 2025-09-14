-- Fix Profile Creation During Sign-Up
-- This script ensures profiles are automatically created when users register

-- Step 1: Ensure the profiles table exists and has the correct structure
-- (This should already exist from the migration, but let's verify)

-- Step 2: Create or replace the function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert the profile with data from user metadata
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
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'student_id', NULL),
    COALESCE(NEW.raw_user_meta_data->>'major', NULL),
    COALESCE(NEW.raw_user_meta_data->>'year', NULL),
    'student'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    student_id = COALESCE(EXCLUDED.student_id, profiles.student_id),
    major = COALESCE(EXCLUDED.major, profiles.major),
    year = COALESCE(EXCLUDED.year, profiles.year);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Drop and recreate the trigger to ensure it's properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Fix RLS policies to allow profile creation during registration
-- Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow profile creation during registration" ON public.profiles;
DROP POLICY IF EXISTS "System can create profiles for new users" ON public.profiles;

-- Create new, comprehensive policies
-- Allow profile creation during registration (system-level)
CREATE POLICY "System can create profiles for new users" ON public.profiles
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow public viewing of profiles (for user discovery)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

-- Step 5: Ensure RLS is enabled on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 6: Test the setup by checking if everything is configured correctly
SELECT 
  'Profiles table exists' as check_item,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_name = 'profiles' AND table_schema = 'public'
    ) THEN 'YES' 
    ELSE 'NO' 
  END as status;

SELECT 
  'Trigger exists' as check_item,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.triggers 
      WHERE trigger_name = 'on_auth_user_created' 
      AND event_object_table = 'users'
      AND event_object_schema = 'auth'
    ) THEN 'YES' 
    ELSE 'NO' 
  END as status;

SELECT 
  'Function exists' as check_item,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.routines 
      WHERE routine_name = 'handle_new_user' 
      AND routine_schema = 'public'
    ) THEN 'YES' 
    ELSE 'NO' 
  END as status;

SELECT 
  'RLS enabled' as check_item,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_tables 
      WHERE tablename = 'profiles' 
      AND schemaname = 'public' 
      AND rowsecurity = true
    ) THEN 'YES' 
    ELSE 'NO' 
  END as status;

-- Step 7: Show current policies
SELECT 
  policyname, 
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'profiles' AND schemaname = 'public'
ORDER BY policyname;
