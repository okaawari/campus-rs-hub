"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Upload, 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye,
  FileText,
  Image,
  File,
  Calendar
} from "lucide-react"

const mockMaterials = [
  {
    id: 1,
    title: "Calculus II Final Exam Solutions",
    description: "Complete solutions to the Spring 2024 Calculus II final exam with detailed explanations.",
    type: "exam",
    subject: "Mathematics",
    courseCode: "MATH 152",
    professor: "Dr. Smith",
    rating: 4.8,
    ratingCount: 24,
    downloadCount: 156,
    uploadDate: "2024-01-15",
    uploader: "Alex Johnson",
    fileSize: "2.3 MB"
  },
  {
    id: 2,
    title: "Organic Chemistry Study Notes",
    description: "Comprehensive notes covering all major topics in Organic Chemistry I.",
    type: "notes",
    subject: "Chemistry",
    courseCode: "CHEM 201",
    professor: "Dr. Brown",
    rating: 4.6,
    ratingCount: 18,
    downloadCount: 89,
    uploadDate: "2024-01-12",
    uploader: "Sarah Chen",
    fileSize: "5.1 MB"
  },
  {
    id: 3,
    title: "Physics Mechanics Flashcards",
    description: "Digital flashcards for Physics I mechanics concepts and formulas.",
    type: "flashcards",
    subject: "Physics",
    courseCode: "PHYS 101",
    professor: "Dr. Wilson",
    rating: 4.9,
    ratingCount: 31,
    downloadCount: 203,
    uploadDate: "2024-01-10",
    uploader: "Mike Rodriguez",
    fileSize: "1.8 MB"
  },
  {
    id: 4,
    title: "Computer Science Algorithms Cheat Sheet",
    description: "Quick reference for common algorithms and data structures.",
    type: "cheatsheet",
    subject: "Computer Science",
    courseCode: "CS 301",
    professor: "Dr. Davis",
    rating: 4.7,
    ratingCount: 22,
    downloadCount: 134,
    uploadDate: "2024-01-08",
    uploader: "Emma Thompson",
    fileSize: "0.9 MB"
  }
]

const subjects = ["All", "Mathematics", "Chemistry", "Physics", "Computer Science", "Biology", "English", "History"]
const materialTypes = ["All", "notes", "exam", "flashcards", "cheatsheet", "other"]

export default function MaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "All" || material.subject === selectedSubject
    const matchesType = selectedType === "All" || material.type === selectedType
    
    return matchesSearch && matchesSubject && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "notes": return <FileText className="w-5 h-5" />
      case "exam": return <File className="w-5 h-5" />
      case "flashcards": return <BookOpen className="w-5 h-5" />
      case "cheatsheet": return <Image className="w-5 h-5" />
      default: return <File className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "notes": return "bg-blue-100 text-blue-600"
      case "exam": return "bg-red-100 text-red-600"
      case "flashcards": return "bg-green-100 text-green-600"
      case "cheatsheet": return "bg-purple-100 text-purple-600"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Study Materials</h1>
        <p className="text-xl text-muted-foreground">
          Discover and share study materials with your campus community
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
                placeholder="Search materials, courses, or professors..."
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

          {/* Type Filter */}
          <div className="lg:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {materialTypes.map(type => (
                <option key={type} value={type}>
                  {type === "All" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Button */}
          <Button className="lg:w-auto">
            <Upload className="w-4 h-4 mr-2" />
            Upload Material
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredMaterials.length} of {mockMaterials.length} materials
        </p>
      </div>

      {/* Materials Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-background rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(material.type)}`}>
                {getTypeIcon(material.type)}
                <span className="ml-2 capitalize">{material.type}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                {material.rating}
              </div>
            </div>

            {/* Title and Description */}
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
              {material.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {material.description}
            </p>

            {/* Course Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">{material.courseCode}</span>
                <span className="mx-2">•</span>
                <span>{material.subject}</span>
              </div>
              <div className="text-sm text-gray-500">
                Prof. {material.professor}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                {material.downloadCount} downloads
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {material.ratingCount} reviews
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                <div>By {material.uploader}</div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(material.uploadDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No materials found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or upload the first material for this course.
          </p>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Material
          </Button>
        </div>
      )}
    </div>
  )
}
