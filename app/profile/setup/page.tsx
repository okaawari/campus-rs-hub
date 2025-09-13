"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { User, GraduationCap, BookOpen, CheckCircle } from "lucide-react"

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState({
    studentId: "",
    major: "",
    year: "",
    bio: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { user, profile, refreshProfile } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      router.push('/auth/login')
      return
    }

    // If profile already exists and is complete, redirect to home
    if (profile && profile.student_id && profile.major && profile.year) {
      router.push('/')
      return
    }

    // Pre-fill form with existing profile data
    if (profile) {
      setFormData({
        studentId: profile.student_id || "",
        major: profile.major || "",
        year: profile.year || "",
        bio: profile.bio || "",
      })
    }
  }, [user, profile, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to complete your profile.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // First check if profile exists, if not create it
      let profileExists = false
      if (profile) {
        profileExists = true
      } else {
        // Try to create the profile if it doesn't exist
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email || '',
            first_name: '',
            last_name: '',
            student_id: formData.studentId || null,
            major: formData.major || null,
            year: formData.year || null,
            bio: formData.bio || null,
            role: 'student'
          })

        if (createError) {
          console.error('Profile creation error:', createError)
          // If profile creation fails, try update anyway (in case profile exists but wasn't loaded)
          profileExists = true
        } else {
          profileExists = true
        }
      }

      // Update or upsert the profile
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email || '',
          first_name: profile?.first_name || '',
          last_name: profile?.last_name || '',
          student_id: formData.studentId || null,
          major: formData.major || null,
          year: formData.year || null,
          bio: formData.bio || null,
          role: 'student'
        }, {
          onConflict: 'id'
        })

      if (error) {
        toast({
          title: "Update Failed",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      setIsSuccess(true)
      await refreshProfile()
      
      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      })

      // Redirect to home after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Profile Complete!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your profile has been successfully updated. You're all set to use Campus Hub!
            </p>
            <div className="mt-6">
              <Button onClick={() => router.push('/')} className="w-full">
                Continue to Campus Hub
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Complete Your Profile</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Help other students get to know you better by completing your profile.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                Student ID
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your student ID"
                />
              </div>
            </div>

            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                Major
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="major"
                  name="major"
                  type="text"
                  value={formData.major}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Academic Year
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select your year</option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/')}
            >
              Skip for now
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Complete Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
