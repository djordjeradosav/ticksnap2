/**
 * useTrades Hook
 * Manages trade CRUD operations and fetching
 */

import { useEffect, useState } from 'react';
import { supabase, Trade } from '@/lib/supabase';

export function useTrades(userId?: string) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch trades
  const fetchTrades = async (filters?: { ticker?: string; limit?: number }) => {
    try {
      setLoading(true);
      let query = supabase.from('trades').select('*');

      if (userId) {
        query = query.eq('user_id', userId);
      }

      if (filters?.ticker) {
        query = query.eq('ticker', filters.ticker);
      }

      const { data, error: err } = await query
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(filters?.limit || 20);

      if (err) throw err;
      setTrades(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch trades';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Create trade
  const createTrade = async (tradeData: Omit<Trade, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'user_id'>) => {
    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userData.user) throw new Error('Not authenticated');
      
      const { data, error: err } = await supabase
        .from('trades')
        .insert([{ ...tradeData, user_id: userData.user.id }])
        .select('*, user:profiles(username, full_name, avatar_url)');
      if (err) throw err;
      if (data) {
        setTrades([data[0], ...trades]);
      }
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create trade';
      setError(message);
      throw err;
    }
  };

  // Update trade
  const updateTrade = async (id: string, updates: Partial<Trade>) => {
    try {
      const { data, error: err } = await supabase.from('trades').update(updates).eq('id', id).select();
      if (err) throw err;
      if (data) {
        setTrades(trades.map((t) => (t.id === id ? data[0] : t)));
      }
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update trade';
      setError(message);
      throw err;
    }
  };

  // Delete trade
  const deleteTrade = async (id: string) => {
    try {
      const { error: err } = await supabase.from('trades').delete().eq('id', id);
      if (err) throw err;
      setTrades(trades.filter((t) => t.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete trade';
      setError(message);
      throw err;
    }
  };

  // Like trade
  const likeTrade = async (tradeId: string) => {
    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userData.user) throw new Error('Not authenticated');
      
      const { error: err } = await supabase
        .from('likes')
        .insert([{ trade_id: tradeId, user_id: userData.user.id }]);
      if (err && err.code !== '23505') throw err; // Ignore duplicate key error
      
      // Update likes count
      setTrades(
        trades.map((t) =>
          t.id === tradeId ? { ...t, likes_count: t.likes_count + 1 } : t
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to like trade';
      setError(message);
    }
  };

  // Unlike trade
  const unlikeTrade = async (tradeId: string) => {
    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userData.user) throw new Error('Not authenticated');
      
      const { error: err } = await supabase
        .from('likes')
        .delete()
        .eq('trade_id', tradeId)
        .eq('user_id', userData.user.id);
      if (err) throw err;
      
      // Update likes count
      setTrades(
        trades.map((t) =>
          t.id === tradeId ? { ...t, likes_count: Math.max(0, t.likes_count - 1) } : t
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to unlike trade';
      setError(message);
    }
  };

  return {
    trades,
    loading,
    error,
    fetchTrades,
    createTrade,
    updateTrade,
    deleteTrade,
    likeTrade,
    unlikeTrade,
  };
}
