"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

interface Profile {
  id: string
  email: string
  student_id?: string
  first_name: string
  last_name: string
  major?: string
  year?: string
  bio?: string
  avatar_url?: string
  role: 'student' | 'tutor' | 'admin'
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.warn('Profile fetch error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        
        // Check for specific error types - these are expected for new users
        if (error.code === 'PGRST116' && error.message.includes('No rows found')) {
          console.log('Profile does not exist yet for user:', userId)
          return null
        }
        
        if (error.code === 'PGRST116' && error.message.includes('relation "public.profiles" does not exist')) {
          console.warn('Profiles table does not exist yet. Please run the database migration.')
          return null
        }
        
        if (error.code === 'PGRST301' || error.message.includes('JWT')) {
          console.warn('Authentication error - user may not be properly authenticated')
          return null
        }
        
        if (error.code === 'PGRST301' || error.message.includes('permission denied')) {
          console.warn('Permission denied - RLS policy may be blocking access')
          return null
        }
        
        // For any other error, log it and return null
        console.warn('Unexpected profile fetch error:', error)
        return null
      }

      console.log('Profile fetched successfully:', data)
      return data
    } catch (error) {
      console.error('Unexpected error fetching profile:', error)
      return null
    }
  }

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id)
      setProfile(profileData)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...')
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Initial session:', { session: !!session, user: !!session?.user })
        setUser(session?.user ?? null)
        
        if (session?.user) {
          console.log('Fetching profile for user:', session.user.id)
          try {
            const profileData = await fetchProfile(session.user.id)
            setProfile(profileData)
          } catch (profileError) {
            console.warn('Profile fetch failed during initialization:', profileError)
            setProfile(null)
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        console.log('Setting loading to false')
        setLoading(false)
      }
    }

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('Auth initialization timeout - setting loading to false')
      setLoading(false)
    }, 5000) // 5 second timeout

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', { event, session: !!session, user: !!session?.user })
        setUser(session?.user ?? null)
        
        if (session?.user) {
          try {
            const profileData = await fetchProfile(session.user.id)
            setProfile(profileData)
          } catch (profileError) {
            console.warn('Profile fetch failed during auth state change:', profileError)
            setProfile(null)
          }
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [])

  const value = {
    user,
    profile,
    loading,
    signOut,
    refreshProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
