# Ticksnap — Mobile App Design System

## Overview

Ticksnap is a premium dark-themed trading and finance social application. The design emphasizes clarity, trust, and professional trading aesthetics with a black background and bold yellow accents.

---

## Design Principles

- **Dark-first**: Black background (#000000) throughout, with subtle surface variations
- **Premium feel**: Elevated cards, smooth interactions, and professional typography
- **One-handed usage**: All interactive elements positioned within thumb reach
- **Portrait orientation**: 9:16 aspect ratio (standard mobile)
- **iOS-first**: Follows Apple Human Interface Guidelines (HIG) for native feel

---

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `background` | #FFFFFF | #000000 | Screen backgrounds |
| `surface` | #F5F5F5 | #111111 | Cards, elevated surfaces |
| `card` | #FFFFFF | #1A1A1A | Trade cards, content containers |
| `accent` | #F5C518 | #F5C518 | Primary buttons, active states, CTAs |
| `text-primary` | #11181C | #FFFFFF | Main text content |
| `text-secondary` | #687076 | #888888 | Secondary text, labels |
| `success` | #22C55E | #00C087 | Profit, gains (green) |
| `danger` | #EF4444 | #FF4444 | Loss, declines (red) |
| `border` | #E5E7EB | #2A2A2A | Dividers, subtle borders |

---

## Typography

- **System Fonts**: SF Pro (iOS), Roboto (Android)
- **Headers**: Bold, large (24-32px)
- **Body**: Regular, medium (14-16px)
- **Labels**: Medium, small (12-14px)
- **Line Height**: 1.4-1.5× font size

---

## Screen List

### Authentication Flow

1. **Welcome Screen** (`/`)
   - Full-screen dark background
   - Candlestick chart graphic (SVG or static image)
   - "Ticksnap" logo in bold yellow
   - Tagline: "Made for Traders by Traders"
   - Two CTA buttons: "Login to your account" (yellow) and "Create new account" (outlined)

2. **Sign Up Screen** (`/signup`)
   - Email, Password, Phone Number, Confirm Password fields
   - Terms & privacy checkbox
   - Yellow "Complete sign up →" button
   - OAuth: Google, Apple sign-up buttons

3. **Login Screen** (`/login`)
   - Email/Username, Password fields
   - Yellow "Log in →" button
   - OAuth: Google, Apple login buttons
   - "Forgot password?" link

### Main App (Tab Navigation)

4. **Popular Feed Tab** (`/popular`)
   - Header: Ticksnap logo, search icon, notification bell
   - Sections (vertical scroll):
     - "Daily News" — horizontal scroll of news cards (image, headline, source)
     - "Stock News" — horizontal ticker scroll (EUR/USD, MSFT, TSLA, etc.)
     - "Traders" — horizontal avatar scroll of top traders
     - "Best Today" — vertical list of trade cards (sorted by likes)
   - Each trade card: user avatar, username, ticker, P&L badge (green/red), like button, chart thumbnail

5. **Search Tab** (`/search`)
   - Search bar: "Search traders, stocks, currencies..."
   - Filter chips: All / Traders / Stocks / Currencies
   - Results: user profiles + trade posts
   - Pull from Supabase `profiles` + `trades` tables

6. **Forecast Tab** (`/forecast`)
   - Header: "Forecast"
   - Large interactive chart (line/candlestick)
   - Instrument selector: EUR/USD, pairs grid
   - "Best Trades" leaderboard section
   - Trade cards with buy/sell indicators

7. **Profile Tab** (`/profile/[id]`)
   - User avatar (large, circular)
   - Username, bio
   - Stats row: Followers / Following / Trades
   - Yellow "Follow" button
   - "Best Trades" tab — user's trade list
   - "Followed Accounts" horizontal avatar scroll

8. **Settings Tab** (`/settings`)
   - Menu items with chevrons:
     - Edit profile details
     - Account privacy
     - Change app experience
     - Notification settings
     - Logout
     - Divider: Other
     - Terms of service
     - Privacy policy

### Modals & Overlays

9. **Trade Details Modal** (`/popup/trade`)
   - Bottom sheet that slides up
   - "Trade Details" header
   - Trader avatar, username, timestamp
   - Description (trade rationale)
   - Chart image/thumbnail
   - Ticker + P&L badge (e.g., "EUR/GBP +$45.00")
   - Yellow "Like this trade" button
   - Toggle like in Supabase `likes` table

### Push Notification Screens

10. **Push / Currency** (`/push/currency`)
    - Shows specific currency pair (e.g., EUR)
    - Recent News section (2-3 NewsAPI articles)
    - Best Trades for that pair

11. **Push / Stock** (`/push/stock`)
    - Shows specific stock (e.g., NVDA)
    - Recent News from NewsAPI
    - Best Trades filtered by ticker

12. **Push / Profile** (`/push/profile`)
    - Profile view triggered by notification
    - Shows profile of follower/liker

---

## Key User Flows

### Flow 1: Sign Up → Home
1. User taps "Create new account" on Welcome screen
2. Fills email, password, phone, confirm password
3. Agrees to terms
4. Taps "Complete sign up →"
5. Supabase creates user + profile entry
6. Redirects to Popular Feed

### Flow 2: Explore & Like a Trade
1. User views Popular Feed
2. Scrolls through "Best Today" trade cards
3. Taps trade card → Trade Details modal opens
4. Reads description, views chart
5. Taps yellow "Like this trade" button
6. Supabase inserts into `likes` table
7. Button state updates (filled/unfilled)

### Flow 3: Follow a Trader
1. User navigates to Profile tab
2. Searches for trader or taps from "Traders" scroll
3. Views trader's profile
4. Taps yellow "Follow" button
5. Supabase inserts into `follows` table
6. Button updates to "Following"

### Flow 4: Search Stocks & News
1. User taps Search tab
2. Types "NVDA" in search bar
3. Results show matching trades + profiles
4. Taps a stock result → shows recent news + best trades for that ticker

---

## Component Library

### Reusable Components

- **TradeCard**: Displays ticker, P&L, user info, like count
- **NewsCard**: Image, headline, source, date
- **UserAvatar**: Circular with optional ring/border
- **TickerBadge**: Ticker symbol with color (green/red for P&L)
- **TradeModal**: Bottom sheet with full trade details
- **TabBar**: Bottom navigation with 5 tabs (Popular, Search, Forecast, Profile, Settings)

---

## Interaction Patterns

### Buttons
- **Primary (Yellow)**: `bg-accent`, `rounded-full` or `rounded-xl`, full width or fixed width
- **Secondary (Outlined)**: `border-2 border-accent`, transparent background
- **Press Feedback**: Scale 0.97 + light haptic

### Cards
- **Trade Card**: `bg-card (#1A1A1A)`, `rounded-lg`, subtle border, 12px radius
- **News Card**: Similar styling with image placeholder
- **Press Feedback**: Opacity 0.7 on press

### Lists
- **Infinite Scroll**: Page size 10, load more on scroll to bottom
- **Pull-to-Refresh**: Swipe down to refresh feed
- **Loading Skeleton**: Show skeleton cards while loading (no spinners)

### Modals
- **Bottom Sheet**: Slides up from bottom, semi-transparent overlay
- **Dismiss**: Swipe down or tap outside

---

## Responsive Layout

- **Safe Area**: Handle notch, home indicator, tab bar
- **Portrait Only**: Lock to portrait orientation
- **Padding**: 16px horizontal, 12px vertical between elements
- **Max Width**: Content centered on tablets (if needed)

---

## Accessibility

- **Color Contrast**: All text meets WCAG AA standards
- **Touch Targets**: Minimum 44pt × 44pt for interactive elements
- **Text Sizing**: Respects system font size settings
- **Haptic Feedback**: Used sparingly for important actions

---

## Dark Mode

- All colors use dark theme by default
- No `dark:` prefix needed in Tailwind (CSS variables handle it)
- Status bar: light text on dark background

---

## Animation Guidelines

- **Subtle Transitions**: 200-300ms for screen transitions
- **Press Feedback**: 80ms scale animation
- **Avoid**: Bouncy springs, excessive motion
- **Principle**: Enhance, don't distract

---

## Next Steps

1. Build authentication screens (Welcome, Login, Sign Up)
2. Implement Supabase integration (auth, database, storage)
3. Create tab navigation layout
4. Build Popular Feed with real-time updates
5. Implement Search, Forecast, Profile, Settings screens
6. Add Trade Details modal
7. Integrate NewsAPI for news feed
8. Polish interactions and add loading states
