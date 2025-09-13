-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'tutor', 'admin');
CREATE TYPE material_type AS ENUM ('notes', 'exam', 'flashcards', 'cheatsheet', 'other');
CREATE TYPE listing_status AS ENUM ('active', 'sold', 'pending', 'cancelled');
CREATE TYPE event_type AS ENUM ('academic', 'social', 'sports', 'club', 'career', 'other');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  student_id TEXT UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  major TEXT,
  year TEXT, -- freshman, sophomore, junior, senior, graduate
  bio TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study materials table
CREATE TABLE public.study_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  material_type material_type NOT NULL,
  subject TEXT NOT NULL,
  course_code TEXT,
  professor TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  tags TEXT[],
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Material ratings table
CREATE TABLE public.material_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  material_id UUID REFERENCES public.study_materials(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(material_id, user_id)
);

-- Tutoring posts table
CREATE TABLE public.tutoring_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tutor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  course_code TEXT,
  description TEXT NOT NULL,
  hourly_rate DECIMAL(10,2),
  is_free BOOLEAN DEFAULT false,
  available_times JSONB, -- Store available time slots
  location TEXT,
  is_online BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tutoring sessions table
CREATE TABLE public.tutoring_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.tutoring_posts(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  notes TEXT,
  student_rating INTEGER CHECK (student_rating >= 1 AND student_rating <= 5),
  student_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketplace listings table
CREATE TABLE public.marketplace_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- textbook, calculator, lab_equipment, electronics, other
  price DECIMAL(10,2),
  is_free BOOLEAN DEFAULT false,
  condition TEXT, -- new, like_new, good, fair, poor
  images TEXT[], -- Array of image URLs
  status listing_status DEFAULT 'active',
  location TEXT,
  contact_method TEXT, -- email, phone, in_app
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketplace messages table
CREATE TABLE public.marketplace_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES public.marketplace_listings(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type event_type NOT NULL,
  location TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  max_attendees INTEGER,
  is_public BOOLEAN DEFAULT true,
  registration_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event RSVPs table
CREATE TABLE public.event_rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'attending', -- attending, maybe, not_attending
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Forum posts table
CREATE TABLE public.forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- general, academic, social, career, other
  tags TEXT[],
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum replies table
CREATE TABLE public.forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_reply_id UUID REFERENCES public.forum_replies(id) ON DELETE CASCADE,
  is_solution BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_study_materials_user_id ON public.study_materials(user_id);
CREATE INDEX idx_study_materials_subject ON public.study_materials(subject);
CREATE INDEX idx_study_materials_course_code ON public.study_materials(course_code);
CREATE INDEX idx_tutoring_posts_tutor_id ON public.tutoring_posts(tutor_id);
CREATE INDEX idx_tutoring_posts_subject ON public.tutoring_posts(subject);
CREATE INDEX idx_marketplace_listings_seller_id ON public.marketplace_listings(seller_id);
CREATE INDEX idx_marketplace_listings_category ON public.marketplace_listings(category);
CREATE INDEX idx_events_organizer_id ON public.events(organizer_id);
CREATE INDEX idx_events_start_time ON public.events(start_time);
CREATE INDEX idx_forum_posts_author_id ON public.forum_posts(author_id);
CREATE INDEX idx_forum_posts_category ON public.forum_posts(category);

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutoring_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutoring_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Study materials policies
CREATE POLICY "Public materials are viewable by everyone" ON public.study_materials
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can insert their own materials" ON public.study_materials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own materials" ON public.study_materials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own materials" ON public.study_materials
  FOR DELETE USING (auth.uid() = user_id);

-- Material ratings policies
CREATE POLICY "Ratings are viewable by everyone" ON public.material_ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ratings" ON public.material_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON public.material_ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- Tutoring posts policies
CREATE POLICY "Active tutoring posts are viewable by everyone" ON public.tutoring_posts
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can insert their own tutoring posts" ON public.tutoring_posts
  FOR INSERT WITH CHECK (auth.uid() = tutor_id);

CREATE POLICY "Users can update their own tutoring posts" ON public.tutoring_posts
  FOR UPDATE USING (auth.uid() = tutor_id);

-- Marketplace listings policies
CREATE POLICY "Active listings are viewable by everyone" ON public.marketplace_listings
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can insert their own listings" ON public.marketplace_listings
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own listings" ON public.marketplace_listings
  FOR UPDATE USING (auth.uid() = seller_id);

-- Events policies
CREATE POLICY "Public events are viewable by everyone" ON public.events
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can insert their own events" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Users can update their own events" ON public.events
  FOR UPDATE USING (auth.uid() = organizer_id);

-- Forum posts policies
CREATE POLICY "Forum posts are viewable by everyone" ON public.forum_posts
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own forum posts" ON public.forum_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own forum posts" ON public.forum_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_study_materials_updated_at BEFORE UPDATE ON public.study_materials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tutoring_posts_updated_at BEFORE UPDATE ON public.tutoring_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tutoring_sessions_updated_at BEFORE UPDATE ON public.tutoring_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_marketplace_listings_updated_at BEFORE UPDATE ON public.marketplace_listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_replies_updated_at BEFORE UPDATE ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
