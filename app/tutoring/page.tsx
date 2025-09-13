"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  Monitor,
  DollarSign,
  Calendar,
  MessageCircle,
  Filter,
  Plus
} from "lucide-react"

const mockTutors = [
  {
    id: 1,
    name: "Alex Johnson",
    subject: "Mathematics",
    courseCode: "MATH 152",
    description: "I'm a senior math major with 3+ years of tutoring experience. I specialize in calculus and linear algebra.",
    hourlyRate: 25,
    isFree: false,
    rating: 4.9,
    ratingCount: 47,
    location: "Library Study Room 3",
    isOnline: true,
    availableTimes: ["Mon 2-4 PM", "Wed 3-5 PM", "Fri 10-12 PM"],
    avatar: "AJ",
    year: "Senior",
    major: "Mathematics"
  },
  {
    id: 2,
    name: "Sarah Chen",
    subject: "Chemistry",
    courseCode: "CHEM 201",
    description: "Chemistry graduate student offering free tutoring for organic chemistry. Let's make chemistry fun!",
    hourlyRate: 0,
    isFree: true,
    rating: 4.8,
    ratingCount: 32,
    location: "Chemistry Building",
    isOnline: false,
    availableTimes: ["Tue 1-3 PM", "Thu 2-4 PM"],
    avatar: "SC",
    year: "Graduate",
    major: "Chemistry"
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    subject: "Physics",
    courseCode: "PHYS 101",
    description: "Physics major with passion for helping students understand complex concepts through real-world examples.",
    hourlyRate: 20,
    isFree: false,
    rating: 4.7,
    ratingCount: 28,
    location: "Online",
    isOnline: true,
    availableTimes: ["Mon 6-8 PM", "Wed 6-8 PM", "Sat 2-4 PM"],
    avatar: "MR",
    year: "Junior",
    major: "Physics"
  },
  {
    id: 4,
    name: "Emma Thompson",
    subject: "Computer Science",
    courseCode: "CS 301",
    description: "Software engineering student specializing in algorithms and data structures. Available for both in-person and online sessions.",
    hourlyRate: 30,
    isFree: false,
    rating: 4.9,
    ratingCount: 41,
    location: "Computer Lab 2",
    isOnline: true,
    availableTimes: ["Tue 3-5 PM", "Thu 3-5 PM", "Sun 1-3 PM"],
    avatar: "ET",
    year: "Senior",
    major: "Computer Science"
  }
]

const subjects = ["All", "Mathematics", "Chemistry", "Physics", "Computer Science", "Biology", "English", "History"]
const priceRanges = ["All", "Free", "$0-15", "$16-25", "$26-40", "$40+"]

export default function TutoringPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")

  const filteredTutors = mockTutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubject = selectedSubject === "All" || tutor.subject === selectedSubject
    
    let matchesPrice = true
    if (selectedPriceRange === "Free") {
      matchesPrice = tutor.isFree
    } else if (selectedPriceRange === "$0-15") {
      matchesPrice = !tutor.isFree && tutor.hourlyRate <= 15
    } else if (selectedPriceRange === "$16-25") {
      matchesPrice = !tutor.isFree && tutor.hourlyRate >= 16 && tutor.hourlyRate <= 25
    } else if (selectedPriceRange === "$26-40") {
      matchesPrice = !tutor.isFree && tutor.hourlyRate >= 26 && tutor.hourlyRate <= 40
    } else if (selectedPriceRange === "$40+") {
      matchesPrice = !tutor.isFree && tutor.hourlyRate > 40
    }
    
    return matchesSearch && matchesSubject && matchesPrice
  })

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Tutoring Marketplace</h1>
        <p className="text-xl text-muted-foreground">
          Find peer tutors or offer your expertise to help fellow students succeed
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
                placeholder="Search tutors, subjects, or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Subject Filter */}
          <div className="lg:w-48">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="lg:w-48">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Become Tutor Button */}
          <Button className="lg:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Become a Tutor
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredTutors.length} of {mockTutors.length} tutors
        </p>
      </div>

      {/* Tutors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTutors.map((tutor) => (
          <div key={tutor.id} className="bg-background rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                  {tutor.avatar}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-foreground">{tutor.name}</h3>
                  <p className="text-sm text-gray-500">{tutor.year} • {tutor.major}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                {tutor.rating} ({tutor.ratingCount})
              </div>
            </div>

            {/* Subject and Course */}
            <div className="mb-4">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-2">
                {tutor.subject}
              </div>
              <div className="text-sm text-muted-foreground">
                {tutor.courseCode}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {tutor.description}
            </p>

            {/* Pricing */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {tutor.isFree ? (
                  <span className="text-green-600 font-semibold">Free</span>
                ) : (
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="font-semibold">${tutor.hourlyRate}/hr</span>
                  </div>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                {tutor.isOnline ? (
                  <Monitor className="w-4 h-4 mr-1" />
                ) : (
                  <MapPin className="w-4 h-4 mr-1" />
                )}
                {tutor.location}
              </div>
            </div>

            {/* Available Times */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Available Times:</div>
              <div className="flex flex-wrap gap-1">
                {tutor.availableTimes.map((time, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-muted-foreground rounded text-xs">
                    {time}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </Button>
              <Button size="sm" className="flex-1">
                <Calendar className="w-4 h-4 mr-1" />
                Book Session
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTutors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No tutors found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or become the first tutor for this subject.
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Become a Tutor
          </Button>
        </div>
      )}
    </div>
  )
}
