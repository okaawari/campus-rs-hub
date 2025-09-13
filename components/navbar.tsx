"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  Calendar, 
  MessageSquare, 
  User,
  LogIn,
  LogOut,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Study Materials", href: "/materials", icon: BookOpen },
  { name: "Tutoring", href: "/tutoring", icon: Users },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingCart },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Forum", href: "/forum", icon: MessageSquare },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, profile, loading, signOut } = useAuth()

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Campus Hub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {loading ? (
              <div className="w-20 h-9 bg-muted rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">
                      {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-foreground">
                    {profile ? `${profile.first_name} ${profile.last_name}` : user.email}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={async () => {
                  console.log("Attempting logout...")
                  try {
                    await signOut()
                    console.log("Logout successful")
                  } catch (error) {
                    console.error("Logout error:", error)
                  }
                }}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border py-4">
          <div className="flex flex-col space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
