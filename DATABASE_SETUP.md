# Database Setup Guide

## Issue
The authentication system is showing "Error fetching profile: {}" because the database tables haven't been created yet.

## Solution
You need to run the database migration in your Supabase project.

## Steps to Fix

### Option 1: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** tab
3. Copy the contents of `supabase/migrations/20250912141146_campus_hub_schema.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute the migration

### Option 2: Using Supabase CLI
If you have Supabase CLI installed and your project linked:

```bash
# Link your project (if not already linked)
npx supabase link --project-ref YOUR_PROJECT_REF

# Push the migration
npx supabase db push
```

### Option 3: Manual Setup
If you prefer to set up tables manually, you can run the SQL commands from the migration file one by one in the Supabase SQL Editor.

## What the Migration Creates
- `profiles` table - User profile information
- `study_materials` table - Study materials and files
- `tutoring_posts` table - Tutoring service listings
- `marketplace_listings` table - Marketplace items
- `events` table - Campus events
- `forum_posts` table - Forum discussions
- And all related tables with proper relationships and security policies

## After Running the Migration
1. The authentication system will work properly
2. User profiles will be created automatically on registration
3. All features of the campus hub will be functional

## Environment Variables
Make sure you have these set in your `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing
After running the migration:
1. Try registering a new account
2. Check that the profile is created successfully
3. Verify that login/logout works properly
