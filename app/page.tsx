import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  Calendar, 
  MessageSquare,
  Star,
  Download,
  Clock,
  TrendingUp,
  Shield,
  Heart
} from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Study Materials",
    description: "Share and discover notes, past exams, flashcards, and study guides from your peers.",
    href: "/materials",
    color: "bg-blue-500"
  },
  {
    icon: Users,
    title: "Tutoring Marketplace",
    description: "Find peer tutors or offer your expertise. Connect with students who need help in your strong subjects.",
    href: "/tutoring",
    color: "bg-green-500"
  },
  {
    icon: ShoppingCart,
    title: "Buy & Sell",
    description: "Trade textbooks, calculators, lab equipment, and more. Save money and reduce waste.",
    href: "/marketplace",
    color: "bg-purple-500"
  },
  {
    icon: Calendar,
    title: "Campus Events",
    description: "Stay updated with academic talks, club meetings, job fairs, and social events.",
    href: "/events",
    color: "bg-orange-500"
  },
  {
    icon: MessageSquare,
    title: "Forum & Q&A",
    description: "Ask questions, share insights, and get help from the campus community.",
    href: "/forum",
    color: "bg-pink-500"
  }
]

const stats = [
  { label: "Study Materials", value: "1,200+", icon: BookOpen },
  { label: "Active Tutors", value: "150+", icon: Users },
  { label: "Listings", value: "800+", icon: ShoppingCart },
  { label: "Events", value: "50+", icon: Calendar }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted to-accent py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Your Campus
            <span className="text-primary"> Resource Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect, share, and thrive together. A centralized platform for students to access study materials, 
            find tutoring, trade textbooks, and discover campus events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From study materials to campus events, we've got you covered for a successful academic journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={index}
                  href={feature.href}
                  className="group bg-background rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-border"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Campus Hub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built by students, for students. We understand your needs and challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-xl mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                Built by students who understand the challenges of campus life. 
                Share resources and help each other succeed.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-xl mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Safe & Secure
              </h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security. 
                Connect with verified students from your campus.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-xl mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Always Growing
              </h3>
              <p className="text-muted-foreground">
                New features and improvements based on student feedback. 
                We're constantly evolving to serve you better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using Campus Hub to succeed academically and build meaningful connections.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Start Your Journey Today
          </Button>
        </div>
      </section>
    </div>
  )
}
