# Profile Creation Fix Guide

## Issue
Sign-up does not create profiles in the database, causing authentication and profile-related features to fail.

## Root Causes
1. **Database trigger not properly set up** - The trigger that automatically creates profiles on user registration may not be active
2. **RLS policies too restrictive** - Row Level Security policies may be preventing profile creation
3. **Missing metadata handling** - The trigger may not be extracting user metadata correctly

## Solution

### Step 1: Run the Database Fix Script
Execute the `supabase/fix_profile_creation.sql` script in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** tab
3. Copy and paste the contents of `supabase/fix_profile_creation.sql`
4. Click **Run** to execute the script

This script will:
- ✅ Create/recreate the `handle_new_user()` function
- ✅ Set up the database trigger properly
- ✅ Fix RLS policies to allow profile creation
- ✅ Verify the setup is working correctly

### Step 2: Verify the Setup
After running the script, check the output to ensure all items show "YES":
- Profiles table exists
- Trigger exists  
- Function exists
- RLS enabled

### Step 3: Test Registration
1. Try registering a new account
2. Check that the profile is created automatically
3. Verify you can log in and see your profile data

### Step 4: Enhanced Registration Flow
The registration page has been updated with a fallback mechanism:
- ✅ Waits for the database trigger to create the profile
- ✅ Checks if profile was created successfully
- ✅ Creates profile manually if trigger fails
- ✅ Provides clear error messages if profile creation fails

## What the Fix Does

### Database Trigger
```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Profile Creation Function
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, email, first_name, last_name, 
    student_id, major, year, role
  ) VALUES (
    NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'student_id', NULL),
    COALESCE(NEW.raw_user_meta_data->>'major', NULL),
    COALESCE(NEW.raw_user_meta_data->>'year', NULL),
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### RLS Policies
- ✅ System can create profiles for new users
- ✅ Users can view their own profile
- ✅ Users can update their own profile
- ✅ Public profiles are viewable by everyone

## Testing the Fix

### 1. Test New Registration
```javascript
// The registration flow now:
// 1. Creates user account with metadata
// 2. Waits for trigger to create profile
// 3. Checks if profile exists
// 4. Creates profile manually if needed
// 5. Updates profile with additional data
```

### 2. Verify Profile Creation
Check in Supabase dashboard:
```sql
SELECT u.email, p.first_name, p.last_name, p.student_id
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'test@example.com';
```

### 3. Test Authentication Flow
- ✅ Login should work properly
- ✅ Profile data should be available
- ✅ Navbar should show user information
- ✅ Profile setup page should work

## Troubleshooting

### If Profiles Still Not Created
1. Check Supabase logs for trigger execution errors
2. Verify RLS policies are correct
3. Test the trigger manually:
   ```sql
   SELECT public.handle_new_user();
   ```

### If Manual Creation Fails
1. Check RLS policies allow INSERT operations
2. Verify user has proper permissions
3. Check for foreign key constraint violations

### Environment Variables
Ensure these are set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Success Indicators
After applying the fix, you should see:
- ✅ New user registrations automatically create profiles
- ✅ Profile data is properly stored in the database
- ✅ Authentication context loads profile information
- ✅ No more "Error fetching profile" messages
- ✅ User can access profile-dependent features

## Files Modified
- `supabase/fix_profile_creation.sql` - Database fix script
- `app/auth/register/page.tsx` - Enhanced registration flow
- `PROFILE_CREATION_FIX.md` - This documentation

The fix ensures robust profile creation during registration with both automatic (trigger-based) and manual fallback mechanisms.
