"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ThumbsUp, 
  MessageCircle, 
  Eye,
  Plus,
  Pin,
  Lock,
  User,
  Clock
} from "lucide-react"

const mockPosts = [
  {
    id: 1,
    title: "Need help with Calculus II integration problems",
    content: "I'm struggling with integration by parts in MATH 152. Can someone explain the concept and maybe work through a few examples?",
    category: "academic",
    author: "Alex Johnson",
    authorAvatar: "AJ",
    replies: 8,
    views: 45,
    likes: 12,
    isPinned: false,
    isLocked: false,
    lastReply: "2024-01-15T14:30:00",
    createdAt: "2024-01-15T10:00:00",
    tags: ["math", "calculus", "help"]
  },
  {
    id: 2,
    title: "Best study spots on campus?",
    content: "Looking for quiet places to study. The library is always crowded. Any recommendations for hidden gems?",
    category: "general",
    author: "Sarah Chen",
    authorAvatar: "SC",
    replies: 15,
    views: 89,
    likes: 23,
    isPinned: true,
    isLocked: false,
    lastReply: "2024-01-15T16:45:00",
    createdAt: "2024-01-14T09:30:00",
    tags: ["study", "campus", "recommendations"]
  },
  {
    id: 3,
    title: "Chemistry Club Meeting - This Friday",
    content: "Don't forget about our monthly meeting this Friday at 7 PM in Chemistry Building Room 201. We'll be discussing the upcoming lab experiments.",
    category: "club",
    author: "Mike Rodriguez",
    authorAvatar: "MR",
    replies: 3,
    views: 34,
    likes: 8,
    isPinned: false,
    isLocked: false,
    lastReply: "2024-01-15T12:15:00",
    createdAt: "2024-01-15T08:00:00",
    tags: ["chemistry", "club", "meeting"]
  },
  {
    id: 4,
    title: "Job Fair Tips - What to Bring",
    content: "The CS career fair is next week. Here are some tips I learned from last year's fair that really helped me land my internship...",
    category: "career",
    author: "Emma Thompson",
    authorAvatar: "ET",
    replies: 12,
    views: 67,
    likes: 19,
    isPinned: false,
    isLocked: false,
    lastReply: "2024-01-15T15:20:00",
    createdAt: "2024-01-15T11:30:00",
    tags: ["career", "job-fair", "tips"]
  },
  {
    id: 5,
    title: "Physics Study Group - Looking for Members",
    content: "Starting a study group for PHYS 101. We meet every Tuesday and Thursday at 6 PM in the Physics building. All skill levels welcome!",
    category: "academic",
    author: "David Kim",
    authorAvatar: "DK",
    replies: 6,
    views: 28,
    likes: 11,
    isPinned: false,
    isLocked: false,
    lastReply: "2024-01-15T13:45:00",
    createdAt: "2024-01-15T09:15:00",
    tags: ["physics", "study-group", "collaboration"]
  },
  {
    id: 6,
    title: "Campus WiFi Issues - IT Support Thread",
    content: "Having trouble with WiFi in the library? This thread is monitored by IT support. Please post your location and device details.",
    category: "general",
    author: "IT Support",
    authorAvatar: "IT",
    replies: 24,
    views: 156,
    likes: 5,
    isPinned: true,
    isLocked: true,
    lastReply: "2024-01-15T17:30:00",
    createdAt: "2024-01-14T14:00:00",
    tags: ["wifi", "technical", "support"]
  }
]

const categories = ["All", "general", "academic", "social", "career", "club", "other"]

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic": return "bg-blue-100 text-blue-700"
      case "social": return "bg-green-100 text-green-700"
      case "career": return "bg-yellow-100 text-yellow-700"
      case "club": return "bg-purple-100 text-purple-700"
      case "general": return "bg-gray-100 text-gray-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Forum & Q&A</h1>
        <p className="text-xl text-muted-foreground">
          Ask questions, share insights, and get help from the campus community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-background rounded-lg shadow-sm border border-border p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts, topics, or questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Create Post Button */}
          <Button className="lg:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredPosts.length} of {mockPosts.length} posts
        </p>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-background rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Author Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {post.authorAvatar}
                </div>
              </div>

              {/* Post Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                      {post.title}
                    </h3>
                    {post.isPinned && (
                      <Pin className="w-4 h-4 text-blue-500" />
                    )}
                    {post.isLocked && (
                      <Lock className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>

                {/* Content Preview */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-muted-foreground rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.replies} replies
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views} views
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes} likes
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTimeAgo(post.lastReply)}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or be the first to start a discussion.
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      )}
    </div>
  )
}
