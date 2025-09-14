"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
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
  Settings,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Debug logging
  console.log('Navbar render:', { user: !!user, profile: !!profile, loading })

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu()
  }, [pathname])

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground truncate">Campus Hub</span>
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
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out relative group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-sm"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
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
                  <span className="text-sm font-medium text-foreground">
                    {profile ? `${profile.first_name} ${profile.last_name}` : user.email}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200 hover:shadow-md"
                  onClick={async () => {
                    console.log("Attempting logout...")
                    try {
                      await signOut()
                      console.log("Logout successful")
                    } catch (error) {
                      console.error("Logout error:", error)
                    }
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 hover:shadow-md"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button & User Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            {user && !loading && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">
                  {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase()}
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="h-9 w-9"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          ref={mobileMenuRef}
          className={cn(
            "md:hidden border-t border-border overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-[500px] opacity-100 py-4 shadow-lg" : "max-h-0 opacity-0 py-0"
          )}
        >
          <div className="flex flex-col space-y-1 pt-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out relative group min-h-[44px]",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-sm active:bg-accent"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {/* Mobile Auth Actions */}
            <div className="pt-4 border-t border-border">
              {loading ? (
                <div className="flex items-center space-x-2 px-4 py-3">
                  <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                  <div className="w-24 h-4 bg-muted rounded animate-pulse" />
                </div>
              ) : user ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-medium">
                        {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {profile ? `${profile.first_name} ${profile.last_name}` : user.email}
                      </span>
                      <span className="text-xs text-muted-foreground">Signed in</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mx-4 min-h-[44px] hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200"
                    onClick={async () => {
                      console.log("Attempting logout...")
                      try {
                        await signOut()
                        closeMobileMenu()
                        console.log("Logout successful")
                      } catch (error) {
                        console.error("Logout error:", error)
                      }
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link href="/auth/login" onClick={closeMobileMenu}>
                    <Button 
                      variant="outline" 
                      className="w-full min-h-[44px] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={closeMobileMenu}>
                    <Button 
                      className="w-full min-h-[44px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
