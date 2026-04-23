-- Ticksnap Database Schema
-- Create all required tables with Row Level Security

-- profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  followers_count INT DEFAULT 0,
  following_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- trades table
CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  trade_type TEXT NOT NULL,
  entry_price NUMERIC,
  exit_price NUMERIC,
  profit_loss NUMERIC,
  notes TEXT,
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- follows table
CREATE TABLE IF NOT EXISTS follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- likes table
CREATE TABLE IF NOT EXISTS likes (
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (trade_id, user_id)
);

-- comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles viewable by all" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Trades policies
CREATE POLICY "Public trades viewable" ON trades FOR SELECT USING (is_public = TRUE OR auth.uid() = user_id);
CREATE POLICY "Users create own trades" ON trades FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own trades" ON trades FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own trades" ON trades FOR DELETE USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follows viewable by all" ON follows FOR SELECT USING (TRUE);
CREATE POLICY "Users manage own follows" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users delete own follows" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Likes policies
CREATE POLICY "Likes viewable by all" ON likes FOR SELECT USING (TRUE);
CREATE POLICY "Users manage own likes" ON likes FOR ALL USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments viewable by all" ON comments FOR SELECT USING (TRUE);
CREATE POLICY "Users create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name) VALUES ('avatars', 'avatars')
ON CONFLICT (id) DO NOTHING;

-- Avatar storage policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
