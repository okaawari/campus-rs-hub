"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export function ProfileCreationHandler() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const createProfileIfNeeded = async () => {
      // Only run if user is authenticated but has no profile
      if (!user || profile) {
        return
      }

      console.log("User authenticated but no profile found, attempting to create profile...")

      try {
        // Check if profile exists first
        const { data: existingProfile, error: checkError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single()

        if (existingProfile) {
          console.log("Profile already exists, skipping creation")
          return
        }

        // Profile doesn't exist, create it
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email || '',
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            student_id: user.user_metadata?.student_id || null,
            major: user.user_metadata?.major || null,
            year: user.user_metadata?.year || null,
            role: 'student'
          })

        if (createError) {
          console.error('Profile creation failed:', createError)
          toast({
            title: "Profile Setup Required",
            description: "Please complete your profile setup to continue.",
            variant: "destructive",
          })
        } else {
          console.log('Profile created successfully')
          // Refresh the page to reload the auth context
          window.location.reload()
        }
      } catch (error) {
        console.error('Profile creation error:', error)
      }
    }

    // Run after a short delay to ensure auth context is fully loaded
    const timer = setTimeout(createProfileIfNeeded, 1000)
    return () => clearTimeout(timer)
  }, [user, profile, supabase, toast])

  // This component doesn't render anything
  return null
}
