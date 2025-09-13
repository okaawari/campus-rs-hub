"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  MapPin,
  DollarSign,
  Tag,
  Plus,
  Image as ImageIcon
} from "lucide-react"

const mockListings = [
  {
    id: 1,
    title: "Calculus Textbook - Stewart 8th Edition",
    description: "Excellent condition, barely used. No highlighting or writing inside. Perfect for MATH 152.",
    category: "textbook",
    price: 45,
    isFree: false,
    condition: "like_new",
    images: ["/placeholder-book.jpg"],
    location: "North Campus",
    seller: "Alex Johnson",
    uploadDate: "2024-01-15",
    contactMethod: "in_app"
  },
  {
    id: 2,
    title: "TI-84 Plus CE Calculator",
    description: "Graphing calculator in great condition. Comes with case and USB cable.",
    category: "calculator",
    price: 0,
    isFree: true,
    condition: "good",
    images: ["/placeholder-calculator.jpg"],
    location: "Library",
    seller: "Sarah Chen",
    uploadDate: "2024-01-12",
    contactMethod: "email"
  },
  {
    id: 3,
    title: "Organic Chemistry Lab Kit",
    description: "Complete lab kit for CHEM 201. All equipment included and in working condition.",
    category: "lab_equipment",
    price: 80,
    isFree: false,
    condition: "good",
    images: ["/placeholder-lab.jpg"],
    location: "Chemistry Building",
    seller: "Mike Rodriguez",
    uploadDate: "2024-01-10",
    contactMethod: "phone"
  },
  {
    id: 4,
    title: "MacBook Air 13\" - 2020 Model",
    description: "Perfect for students. 8GB RAM, 256GB SSD. Light scratches on case but works perfectly.",
    category: "electronics",
    price: 650,
    isFree: false,
    condition: "good",
    images: ["/placeholder-laptop.jpg"],
    location: "South Campus",
    seller: "Emma Thompson",
    uploadDate: "2024-01-08",
    contactMethod: "in_app"
  },
  {
    id: 5,
    title: "Physics Lab Manual - Free",
    description: "Physics I lab manual. Some pages have notes but still very usable.",
    category: "textbook",
    price: 0,
    isFree: true,
    condition: "fair",
    images: ["/placeholder-manual.jpg"],
    location: "Physics Building",
    seller: "David Kim",
    uploadDate: "2024-01-05",
    contactMethod: "in_app"
  },
  {
    id: 6,
    title: "Scientific Calculator - Casio fx-115ES",
    description: "Great for engineering and science courses. Like new condition.",
    category: "calculator",
    price: 15,
    isFree: false,
    condition: "like_new",
    images: ["/placeholder-calc2.jpg"],
    location: "Engineering Building",
    seller: "Lisa Wang",
    uploadDate: "2024-01-03",
    contactMethod: "in_app"
  }
]

const categories = ["All", "textbook", "calculator", "lab_equipment", "electronics", "other"]
const conditions = ["All", "new", "like_new", "good", "fair", "poor"]
const priceRanges = ["All", "Free", "$0-25", "$26-50", "$51-100", "$100+"]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory
    const matchesCondition = selectedCondition === "All" || listing.condition === selectedCondition
    
    let matchesPrice = true
    if (selectedPriceRange === "Free") {
      matchesPrice = listing.isFree
    } else if (selectedPriceRange === "$0-25") {
      matchesPrice = !listing.isFree && listing.price <= 25
    } else if (selectedPriceRange === "$26-50") {
      matchesPrice = !listing.isFree && listing.price >= 26 && listing.price <= 50
    } else if (selectedPriceRange === "$51-100") {
      matchesPrice = !listing.isFree && listing.price >= 51 && listing.price <= 100
    } else if (selectedPriceRange === "$100+") {
      matchesPrice = !listing.isFree && listing.price > 100
    }
    
    return matchesSearch && matchesCategory && matchesCondition && matchesPrice
  })

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new": return "bg-green-100 text-green-700"
      case "like_new": return "bg-blue-100 text-blue-700"
      case "good": return "bg-yellow-100 text-yellow-700"
      case "fair": return "bg-orange-100 text-orange-700"
      case "poor": return "bg-red-100 text-red-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "textbook": return "📚"
      case "calculator": return "🧮"
      case "lab_equipment": return "🔬"
      case "electronics": return "💻"
      default: return "📦"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Marketplace</h1>
        <p className="text-xl text-muted-foreground">
          Buy, sell, and exchange textbooks, equipment, and more with fellow students
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
                placeholder="Search items, categories, or descriptions..."
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
                  {category === "All" ? "All Categories" : category.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div className="lg:w-48">
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {conditions.map(condition => (
                <option key={condition} value={condition}>
                  {condition === "All" ? "All Conditions" : condition.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </option>
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

          {/* Sell Item Button */}
          <Button className="lg:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Sell Item
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredListings.length} of {mockListings.length} listings
        </p>
      </div>

      {/* Listings Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-background rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-400" />
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getCategoryIcon(listing.category)}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(listing.condition)}`}>
                    {listing.condition.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Title and Description */}
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                {listing.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {listing.description}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {listing.isFree ? (
                    <span className="text-green-600 font-bold text-xl">Free</span>
                  ) : (
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-gray-500 mr-1" />
                      <span className="font-bold text-xl">${listing.price}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </div>
              </div>

              {/* Seller Info */}
              <div className="text-sm text-gray-500 mb-4">
                <div>Sold by {listing.seller}</div>
                <div>{new Date(listing.uploadDate).toLocaleDateString()}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" className="flex-1">
                  <Tag className="w-4 h-4 mr-1" />
                  {listing.isFree ? "Claim" : "Buy Now"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No listings found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or be the first to list an item in this category.
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Sell Item
          </Button>
        </div>
      )}
    </div>
  )
}
