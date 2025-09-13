# Campus Resource Hub

A comprehensive platform for students to share study materials, find tutoring, trade textbooks, and discover campus events. Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Features

### 📚 Study Materials
- Upload and share notes, past exams, flashcards, and study guides
- Rate and review materials from peers
- Search by subject, course code, or professor
- Download tracking and quality ratings

### 👩‍🏫 Tutoring Marketplace
- Find peer tutors or offer your expertise
- Filter by subject, availability, and pricing
- Book tutoring sessions
- Rate and review tutors

### 🛒 Buy & Sell Marketplace
- Trade textbooks, calculators, lab equipment, and electronics
- Free items section to encourage sharing
- In-app messaging between buyers and sellers
- Condition ratings and detailed descriptions

### 📅 Campus Events
- Discover academic talks, club meetings, job fairs, and sports events
- RSVP to events and track attendance
- Create and manage your own events
- Filter by event type and date

### 💬 Forum & Q&A
- Ask questions and get help from the campus community
- Share insights and study tips
- Categorized discussions (academic, social, career, etc.)
- Like and reply to posts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd campus-rs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up the database**
   - Go to your Supabase dashboard
   - Navigate to the SQL Editor
   - Run the SQL script from `supabase/schema.sql` to create all tables and policies

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
campus-rs/
├── app/                    # Next.js app directory
│   ├── materials/         # Study materials pages
│   ├── tutoring/          # Tutoring marketplace pages
│   ├── marketplace/       # Buy/sell marketplace pages
│   ├── events/            # Campus events pages
│   ├── forum/             # Forum and Q&A pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── navbar.tsx        # Navigation component
├── lib/                  # Utility functions
│   ├── supabase/         # Supabase client configuration
│   └── utils.ts          # Helper functions
├── supabase/             # Database schema and migrations
│   └── schema.sql        # Complete database schema
└── public/               # Static assets
```

## 🗄️ Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:

- **profiles** - User profiles and information
- **study_materials** - Study materials with ratings and downloads
- **tutoring_posts** - Tutoring service listings
- **marketplace_listings** - Buy/sell marketplace items
- **events** - Campus events and RSVPs
- **forum_posts** - Forum discussions and Q&A

All tables include Row Level Security (RLS) policies for data protection.

## 🎨 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel (recommended)

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables

Make sure to set these in your deployment environment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for students, by students
- Inspired by the need for better campus resource sharing
- Thanks to the Next.js and Supabase communities for excellent documentation

## 📞 Support

If you have any questions or need help setting up the project, please open an issue on GitHub.

---

**Happy coding and good luck with your studies! 🎓**
