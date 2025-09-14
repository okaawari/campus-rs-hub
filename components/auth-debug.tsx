"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"

export function AuthDebug() {
  const { user, profile, loading } = useAuth()
  const [connectionTest, setConnectionTest] = useState<string>("Testing...")
  const [envVars, setEnvVars] = useState({ url: false, key: false })

  useEffect(() => {
    // Test environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    setEnvVars({ url: !!url, key: !!key })

    // Test basic connection
    const testConnection = async () => {
      try {
        const supabase = createClient()
        
        // Test 1: Basic auth connection
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          setConnectionTest(`❌ Auth Error: ${sessionError.message}`)
          return
        }
        
        // Test 2: Try profiles table (might fail due to RLS)
        const { data, error } = await supabase.from('profiles').select('count').limit(1)
        
        if (error) {
          if (error.code === 'PGRST301' || error.message.includes('permission denied')) {
            setConnectionTest("✅ Connection OK (RLS blocking profiles)")
          } else {
            setConnectionTest(`❌ Profiles Error: ${error.message}`)
          }
        } else {
          setConnectionTest("✅ Connection OK")
        }
      } catch (err) {
        setConnectionTest(`❌ Connection Failed: ${err}`)
      }
    }

    testConnection()
  }, [])

  if (loading) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
        <h3 className="font-bold mb-2">Loading authentication...</h3>
        <div>This should complete within 5 seconds. If it doesn't, check the console for errors.</div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-100 rounded text-sm">
      <h3 className="font-bold mb-2">Authentication Debug</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>Environment URL: {envVars.url ? "✅ Set" : "❌ Missing"}</div>
        <div>Environment Key: {envVars.key ? "✅ Set" : "❌ Missing"}</div>
        <div>Connection: {connectionTest}</div>
        <div>Loading: {loading ? "Yes" : "No"}</div>
        <div>User: {user ? `✅ ${user.email}` : "❌ Not logged in"}</div>
        <div>Profile: {profile ? `✅ ${profile.first_name} ${profile.last_name}` : "❌ No profile"}</div>
      </div>
      <div className="mt-2 text-xs text-gray-600">
        User ID: {user?.id || "N/A"}
      </div>
      
      {/* Quick navigation links */}
      <div className="mt-4 pt-2 border-t">
        <h4 className="font-semibold mb-2">Quick Links:</h4>
        <div className="flex gap-2">
          <a href="/auth/login" className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
            Login
          </a>
          <a href="/auth/register" className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
            Register
          </a>
          <a href="/debug" className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600">
            Debug Page
          </a>
        </div>
      </div>
    </div>
  )
}
