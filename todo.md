# Ticksnap — Project TODO

## Phase 1: Project Setup & Design System
- [x] Design system constants (colors, typography, spacing)
- [x] App branding (logo, app name, theme)
- [x] Theme configuration (dark mode, color tokens)

## Phase 2: Authentication
- [x] Welcome screen (`/`) with candlestick graphic
- [x] Sign Up screen (`/signup`) with email/password/phone
- [x] Login screen (`/login`) with email/password
- [x] OAuth integration (Google, Apple) via Supabase
- [x] Protected routes (redirect to login if not authenticated)
- [x] Auth hook (`useAuth`) for session management

## Phase 3: Database & Backend
- [x] Supabase project setup (URL, anon key)
- [x] Database schema (profiles, trades, follows, comments, likes)
- [x] Row Level Security (RLS) policies on all tables
- [x] CRUD services (trades, profiles, social)
- [x] NewsAPI integration for financial news
- [ ] Real-time subscriptions (Supabase Realtime)

## Phase 4: Core Components
- [x] TradeCard component (ticker, P&L, user info, like button)
- [x] NewsCard component (image, headline, source)
- [x] UserAvatar component (circular, optional ring)
- [x] TickerBadge component (ticker symbol with color)
- [x] TradeModal component (bottom sheet with trade details)
- [x] TabBar component (5 tabs: Popular, Search, Forecast, Profile, Settings)

## Phase 5: Main Screens — Tab Navigation
- [x] Popular Feed (`/popular`) with news, tickers, traders, best trades
- [x] Search (`/search`) with filters and results
- [x] Forecast (`/forecast`) with chart and leaderboard
- [x] Profile (`/profile/[id]`) with user stats and trades
- [x] Settings (`/settings`) with menu items and logout

## Phase 6: Features — Feed & Social
- [ ] Infinite scroll / pagination (page size: 10)
- [ ] Pull-to-refresh on all feed screens
- [ ] Loading skeletons (not spinners)
- [ ] Like/unlike trades (toggle in `likes` table)
- [ ] Follow/unfollow users (toggle in `follows` table)
- [ ] Comments on trades (add/delete from `comments` table)
- [ ] Real-time updates on Popular Feed

## Phase 7: Features — User & Profile
- [ ] Profile avatar upload (Supabase Storage bucket: `avatars`)
- [ ] Edit profile details (username, bio, avatar)
- [ ] View user profile with stats
- [ ] Follow/unfollow from profile
- [ ] View user's best trades

## Phase 8: Features — Trading & Data
- [ ] Create trade (INSERT into `trades` table)
- [ ] View trade details (modal with full info)
- [ ] Edit trade (UPDATE `trades` table)
- [ ] Delete trade (DELETE from `trades` table)
- [ ] Search trades by ticker, username, or content
- [ ] Filter trades (all, buy, sell)

## Phase 9: Features — News & Market Data
- [ ] Fetch daily news from NewsAPI (q=finance&stocks)
- [ ] Fetch stock-specific news (q=NVDA, q=MSFT, etc.)
- [ ] Display news cards with images and headlines
- [ ] Horizontal ticker scroll (EUR/USD, MSFT, TSLA, MPLX)
- [ ] Interactive chart (line/candlestick) using react-native-wagmi-charts or victory-native

## Phase 10: Push Notifications
- [ ] Push / Currency screen (`/push/currency`)
- [ ] Push / Stock screen (`/push/stock`)
- [ ] Push / Profile screen (`/push/profile`)
- [ ] Handle notification taps and deep linking

## Phase 11: Polish & Optimization
- [ ] Toast notifications for success/error states
- [ ] Loading indicators and skeletons
- [ ] Error handling and fallbacks
- [ ] Haptic feedback on button presses
- [ ] Smooth animations and transitions
- [ ] Test on iOS and Android

## Phase 12: Testing & Delivery
- [ ] End-to-end flow testing (sign up → explore → like → follow)
- [ ] Cross-platform testing (iOS, Android, Web)
- [ ] Performance optimization (lazy loading, memoization)
- [ ] Create app checkpoint
- [ ] Deliver project files to user

---

## Environment Variables Needed
- [ ] `EXPO_PUBLIC_SUPABASE_URL` — Supabase project URL
- [ ] `EXPO_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- [ ] `EXPO_PUBLIC_NEWSAPI_KEY` — NewsAPI key (free tier from newsapi.org)

---

## Notes
- Dark theme throughout (#000000 background, #F5C518 yellow accent)
- Use NativeWind (Tailwind CSS) for styling
- Use Zustand for state management (trades, user, social)
- Use Supabase for auth, database, and storage
- Use NewsAPI for financial news data
- All screens should feel premium and professional


## Bug Fixes Required

### Phase 1: Authentication
- [x] Replace mock auth with real Supabase auth in auth-context.tsx
- [x] Implement email/password login with Supabase
- [x] Implement email/password signup with Supabase
- [x] Implement Google OAuth with Supabase
- [x] Implement Apple OAuth with Supabase
- [x] Add session listener and auth state management

### Phase 2: Database Schema
- [x] Create profiles table migration
- [x] Create trades table migration
- [x] Create follows table migration
- [x] Create likes table migration
- [x] Create comments table migration
- [x] Add RLS policies for all tables
- [x] Create auto-profile trigger on signup

### Phase 3: UI & Data Connection
- [ ] Connect Profile screen to real user data
- [ ] Connect Popular feed to real trades
- [ ] Connect news section to NewsAPI
- [ ] Show real user trades in profile
- [ ] Display real follower/following counts
- [x] Auto-inject user_id in useTrades hook
- [x] Auto-inject user_id in useProfile hook

### Phase 4: Navigation & Auth Guards
- [x] Add auth guard to root layout
- [x] Redirect to welcome if not authenticated
- [x] Redirect to tabs if already logged in
- [ ] Connect settings modal logout button
- [x] Fix tab layout (remove index, add popular)

### Phase 5: Missing Features
- [x] Create trade posting screen
- [ ] Add FAB button for creating trades
- [x] Auto-inject user_id in createTrade hook
- [x] Fix updateProfile to use correct userId

### Phase 6: Components & Utils
- [x] Add missing icon mappings
- [ ] Replace Alert-based toasts with ToastAndroid
- [x] Fix icon symbol mappings for Android/web
- [ ] Connect settings icon to profile-edit

### Phase 7: Testing
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test Google OAuth
- [ ] Test protected routes
- [ ] Test trade creation
- [ ] Test profile display
- [ ] Test logout
