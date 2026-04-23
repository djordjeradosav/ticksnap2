# Ticksnap — Trading & Finance Social App

A premium React Native mobile application built with Expo, Supabase, and NewsAPI. Share trades, follow top traders, and stay updated with real-time market insights.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account (free tier available at supabase.com)
- NewsAPI key (free tier available at newsapi.org)

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Copy `.env.local` and fill in your credentials:
   ```bash
   cp .env.local .env.local
   ```

   Required environment variables:
   - `EXPO_PUBLIC_SUPABASE_URL` — Your Supabase project URL
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anonymous key
   - `EXPO_PUBLIC_NEWSAPI_KEY` — Your NewsAPI key

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Open in Expo Go:**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or open http://localhost:8081 in browser for web preview

---

## 🏗️ Project Structure

```
app/
  (auth)/              # Authentication screens
    index.tsx          # Welcome screen
    login.tsx          # Login screen
    signup.tsx         # Sign up screen
  (tabs)/              # Main app tabs
    (popular)/         # Popular feed tab
    search.tsx         # Search tab
    forecast.tsx       # Forecast tab
    profile/           # Profile tab
    settings.tsx       # Settings tab

components/            # Reusable components
  TradeCard.tsx        # Trade display card
  NewsCard.tsx         # News article card
  UserAvatar.tsx       # User avatar component
  TickerBadge.tsx      # Ticker symbol badge
  TradeModal.tsx       # Trade details modal

hooks/                 # Custom React hooks
  useAuth.ts           # Authentication state
  useTrades.ts         # Trade CRUD operations
  useProfile.ts        # Profile management

lib/                   # Utilities and services
  supabase.ts          # Supabase client
  newsapi.ts           # NewsAPI integration
  utils.ts             # Helper functions

constants/             # App constants
  colors.ts            # Design system colors
  tickers.ts           # Trading instruments
```

---

## 🔐 Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anonymous key to `.env.local`

### 2. Create Database Tables

Run this SQL in Supabase SQL Editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  followers_count INT DEFAULT 0,
  following_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trades table
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  trade_type TEXT CHECK (trade_type IN ('buy', 'sell')),
  entry_price NUMERIC,
  exit_price NUMERIC,
  profit_loss NUMERIC,
  notes TEXT,
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Follows table
CREATE TABLE follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes table
CREATE TABLE likes (
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  PRIMARY KEY (trade_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name) VALUES ('avatars', 'avatars');
```

### 3. Set Up Row Level Security (RLS)

Create RLS policies to restrict data access:

```sql
-- Users can read all public profiles
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Users can read public trades
CREATE POLICY "Public trades are viewable by everyone"
ON trades FOR SELECT
USING (is_public = true);

-- Users can create trades
CREATE POLICY "Users can create trades"
ON trades FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update own trades
CREATE POLICY "Users can update own trades"
ON trades FOR UPDATE
USING (auth.uid() = user_id);

-- Similar policies for follows, comments, likes...
```

### 4. Enable OAuth Providers

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable **Google** and **Apple** authentication
3. Add your OAuth credentials

---

## 📱 Features

### Authentication
- Email/password sign up and login
- OAuth with Google and Apple
- Session management with Supabase Auth

### Trading
- Create, read, update, delete trades
- Track entry price, exit price, and P&L
- Mark trades as public or private
- Add notes to trades

### Social
- Follow/unfollow traders
- Like trades
- Comment on trades
- View trader profiles and stats

### Feed
- Popular feed with best trades
- Daily financial news from NewsAPI
- Stock ticker scroll
- Top traders carousel
- Search traders, stocks, currencies

### Profile
- User profile with avatar
- Trading statistics (followers, following, trades)
- Best trades list
- Followed accounts

---

## 🎨 Design System

### Colors
- **Background**: #000000 (pure black)
- **Surface**: #111111 (subtle dark)
- **Card**: #1A1A1A (card background)
- **Accent**: #F5C518 (yellow - primary CTA)
- **Text Primary**: #FFFFFF (white)
- **Text Secondary**: #888888 (muted gray)
- **Success**: #00C087 (green for profit)
- **Danger**: #FF4444 (red for loss)

### Typography
- Headers: Bold, large (24-32px)
- Body: Regular, medium (14-16px)
- Labels: Medium, small (12-14px)

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Run type checking
pnpm check

# Run linting
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Build for production
pnpm build

# Start production server
pnpm start
```

### Building for iOS/Android

```bash
# iOS
pnpm ios

# Android
pnpm android
```

---

## 📚 API Integration

### Supabase Client
```typescript
import { supabase } from '@/lib/supabase';

// Example: Fetch trades
const { data, error } = await supabase
  .from('trades')
  .select('*')
  .eq('is_public', true)
  .order('created_at', { ascending: false });
```

### NewsAPI Integration
```typescript
import { fetchFinanceNews, fetchStockNews } from '@/lib/newsapi';

// Fetch finance news
const articles = await fetchFinanceNews(10);

// Fetch stock-specific news
const nvdaNews = await fetchStockNews('NVDA', 5);
```

---

## 🚀 Deployment

### Publish to App Stores

1. **Create a checkpoint** in the Manus UI
2. **Click Publish button** to build APK/IPA
3. **Submit to app stores:**
   - Apple App Store (iOS)
   - Google Play Store (Android)

---

## 📖 Documentation

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Supabase Docs](https://supabase.com/docs)
- [NewsAPI Docs](https://newsapi.org/docs)
- [NativeWind Docs](https://www.nativewind.dev)

---

## 🤝 Support

For issues or questions:
1. Check the documentation above
2. Review the code comments
3. Check Expo Go logs for errors

---

## 📝 License

This project is provided as-is for educational and commercial use.

---

## 🎯 Next Steps

1. Set up Supabase project and database
2. Configure OAuth providers (Google, Apple)
3. Add your API keys to `.env.local`
4. Start the dev server: `pnpm dev`
5. Test authentication flow
6. Explore the app in Expo Go

Happy trading! 🚀📈
