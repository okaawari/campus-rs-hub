"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function DebugPage() {
  const [envCheck, setEnvCheck] = useState({
    supabaseUrl: false,
    supabaseKey: false,
  })
  const [connectionTest, setConnectionTest] = useState<string>("Testing...")

  useEffect(() => {
    // Check environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    setEnvCheck({
      supabaseUrl: !!url,
      supabaseKey: !!key,
    })

    // Test Supabase connection
    const testConnection = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from('profiles').select('count').limit(1)
        
        if (error) {
          setConnectionTest(`Connection Error: ${error.message}`)
        } else {
          setConnectionTest("✅ Connection successful!")
        }
      } catch (err) {
        setConnectionTest(`Connection Failed: ${err}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className={envCheck.supabaseUrl ? "text-green-600" : "text-red-600"}>
                  {envCheck.supabaseUrl ? "✅" : "❌"}
                </span>
                <span>NEXT_PUBLIC_SUPABASE_URL</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={envCheck.supabaseKey ? "text-green-600" : "text-red-600"}>
                  {envCheck.supabaseKey ? "✅" : "❌"}
                </span>
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Database Connection</h2>
            <p className="text-sm text-gray-600">{connectionTest}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Environment Values</h2>
            <div className="bg-gray-100 p-4 rounded text-sm">
              <p><strong>SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Not set"}</p>
              <p><strong>SUPABASE_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Not set"}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a href="/auth/login" className="block text-blue-600 hover:text-blue-800">→ Go to Login</a>
              <a href="/auth/register" className="block text-blue-600 hover:text-blue-800">→ Go to Register</a>
              <a href="/" className="block text-blue-600 hover:text-blue-800">→ Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
