/**
 * Supabase Client Configuration
 * Initialize Supabase with environment variables
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not configured. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database Types (inferred from schema)
 */

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  followers_count: number;
  following_count: number;
  created_at: string;
}

export interface Trade {
  id: string;
  user_id: string;
  ticker: string;
  trade_type: 'buy' | 'sell';
  entry_price: number;
  exit_price: number | null;
  profit_loss: number | null;
  notes: string | null;
  likes_count: number;
  comments_count: number;
  is_public: boolean;
  created_at: string;
}

export interface Follow {
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  trade_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Like {
  trade_id: string;
  user_id: string;
}

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}
