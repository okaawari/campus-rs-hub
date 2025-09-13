"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users,
  Plus,
  ChevronRight,
  Star
} from "lucide-react"

const mockEvents = [
  {
    id: 1,
    title: "Computer Science Career Fair",
    description: "Meet with top tech companies and learn about internship and job opportunities in computer science.",
    type: "career",
    location: "Student Union Ballroom",
    startTime: "2024-02-15T10:00:00",
    endTime: "2024-02-15T16:00:00",
    maxAttendees: 500,
    currentAttendees: 234,
    isPublic: true,
    registrationRequired: true,
    organizer: "Career Services",
    tags: ["career", "tech", "networking"]
  },
  {
    id: 2,
    title: "Math Study Group - Calculus II",
    description: "Weekly study group for MATH 152. Bring your questions and study materials.",
    type: "academic",
    location: "Library Study Room 3",
    startTime: "2024-02-12T18:00:00",
    endTime: "2024-02-12T20:00:00",
    maxAttendees: 15,
    currentAttendees: 8,
    isPublic: true,
    registrationRequired: false,
    organizer: "Alex Johnson",
    tags: ["study", "math", "calculus"]
  },
  {
    id: 3,
    title: "Chemistry Club Meeting",
    description: "Monthly meeting discussing upcoming lab experiments and chemistry research opportunities.",
    type: "club",
    location: "Chemistry Building Room 201",
    startTime: "2024-02-14T19:00:00",
    endTime: "2024-02-14T21:00:00",
    maxAttendees: 30,
    currentAttendees: 12,
    isPublic: true,
    registrationRequired: false,
    organizer: "Chemistry Club",
    tags: ["club", "chemistry", "research"]
  },
  {
    id: 4,
    title: "Basketball Game vs State University",
    description: "Support our team in this exciting home game. Free admission for students with ID.",
    type: "sports",
    location: "Sports Arena",
    startTime: "2024-02-16T19:30:00",
    endTime: "2024-02-16T22:00:00",
    maxAttendees: 2000,
    currentAttendees: 1456,
    isPublic: true,
    registrationRequired: false,
    organizer: "Athletics Department",
    tags: ["sports", "basketball", "free"]
  },
  {
    id: 5,
    title: "AI and Machine Learning Workshop",
    description: "Hands-on workshop covering the basics of AI and ML. No prior experience required.",
    type: "academic",
    location: "Computer Lab 1",
    startTime: "2024-02-18T14:00:00",
    endTime: "2024-02-18T17:00:00",
    maxAttendees: 25,
    currentAttendees: 18,
    isPublic: true,
    registrationRequired: true,
    organizer: "CS Department",
    tags: ["workshop", "AI", "programming"]
  },
  {
    id: 6,
    title: "Student Government Meeting",
    description: "Monthly student government meeting. Open to all students. Voice your concerns and ideas.",
    type: "social",
    location: "Student Union Conference Room",
    startTime: "2024-02-13T17:00:00",
    endTime: "2024-02-13T19:00:00",
    maxAttendees: 100,
    currentAttendees: 45,
    isPublic: true,
    registrationRequired: false,
    organizer: "Student Government",
    tags: ["government", "student", "meeting"]
  }
]

const eventTypes = ["All", "academic", "social", "sports", "club", "career", "other"]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = selectedType === "All" || event.type === selectedType
    
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-blue-100 text-blue-700"
      case "social": return "bg-green-100 text-green-700"
      case "sports": return "bg-orange-100 text-orange-700"
      case "club": return "bg-purple-100 text-purple-700"
      case "career": return "bg-yellow-100 text-yellow-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const isEventToday = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    return eventDate.toDateString() === today.toDateString()
  }

  const isEventUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString)
    const now = new Date()
    return eventDate > now
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Campus Events</h1>
        <p className="text-xl text-muted-foreground">
          Discover academic talks, club meetings, sports events, and more happening on campus
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
                placeholder="Search events, organizers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="lg:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type === "All" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Create Event Button */}
          <Button className="lg:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredEvents.length} of {mockEvents.length} events
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-background rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Date/Time Info */}
              <div className="flex-shrink-0">
                <div className="bg-blue-50 rounded-lg p-4 text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-blue-600">
                    {new Date(event.startTime).getDate()}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {new Date(event.startTime).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTime(event.startTime)}
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      {isEventToday(event.startTime) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          Today
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                  </div>
                </div>

                {/* Event Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {event.currentAttendees} / {event.maxAttendees} attendees
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Organized by {event.organizer}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-muted-foreground rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {event.registrationRequired ? (
                      <Button size="sm">
                        Register
                      </Button>
                    ) : (
                      <Button size="sm">
                        RSVP
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Star className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or create the first event for your campus.
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>
      )}
    </div>
  )
}
