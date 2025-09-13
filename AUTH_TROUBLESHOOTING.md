# Authentication Troubleshooting Guide

## Current Issue
You can't sign in, register, or logout. Let's debug this step by step.

## Step 1: Check Environment Variables
1. Visit `/debug` in your browser to see if environment variables are set
2. Make sure you have a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Step 2: Check Console Logs
1. Open browser developer tools (F12)
2. Go to the Console tab
3. Try to register or login
4. Look for error messages in the console

## Step 3: Common Issues and Solutions

### Issue 1: Environment Variables Not Set
**Symptoms:** Console shows "Not set" for Supabase URL/Key
**Solution:** 
- Create `.env.local` file in project root
- Add your Supabase credentials
- Restart the development server

### Issue 2: Database Tables Don't Exist
**Symptoms:** "Error fetching profile" or "relation does not exist"
**Solution:**
- Run the database migration in Supabase dashboard
- Copy contents of `supabase/migrations/20250912141146_campus_hub_schema.sql`
- Paste and run in Supabase SQL Editor

### Issue 3: Supabase Project Not Configured
**Symptoms:** Connection errors or authentication failures
**Solution:**
- Verify your Supabase project is active
- Check that authentication is enabled
- Ensure email confirmation is configured properly

### Issue 4: CORS Issues
**Symptoms:** Network errors in browser console
**Solution:**
- Check Supabase project settings
- Ensure your domain is allowed in CORS settings

## Step 4: Test Authentication Flow
1. Go to `/auth/register`
2. Fill out the form and submit
3. Check console for any errors
4. If successful, try logging in at `/auth/login`

## Step 5: Check Database
1. Go to Supabase dashboard
2. Check if user was created in Authentication > Users
3. Check if profile was created in Table Editor > profiles

## Debug Information
Visit `/debug` to see:
- Environment variable status
- Database connection test
- Quick links to auth pages

## Still Having Issues?
1. Check the browser console for specific error messages
2. Verify your Supabase project settings
3. Make sure the database migration has been run
4. Try creating a new Supabase project if needed
