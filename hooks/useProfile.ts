/**
 * useProfile Hook
 * Manages user profile operations
 */

import { useEffect, useState } from 'react';
import { supabase, Profile } from '@/lib/supabase';

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile
  const fetchProfile = async (id: string) => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase.from('profiles').select('*').eq('id', id).single();
      if (err) throw err;
      setProfile(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (id: string, updates: Partial<Profile>) => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (err) throw err;
      setProfile(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Follow user
  const followUser = async (followingId: string, followerId: string) => {
    try {
      const { error: err } = await supabase.from('follows').insert([
        { follower_id: followerId, following_id: followingId },
      ]);
      if (err && err.code !== '23505') throw err; // Ignore duplicate key error
      
      // Update following count
      if (profile && profile.id === followingId) {
        setProfile({ ...profile, followers_count: profile.followers_count + 1 });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to follow user';
      setError(message);
    }
  };

  // Unfollow user
  const unfollowUser = async (followingId: string, followerId: string) => {
    try {
      const { error: err } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', followerId)
        .eq('following_id', followingId);
      if (err) throw err;
      
      // Update following count
      if (profile && profile.id === followingId) {
        setProfile({ ...profile, followers_count: Math.max(0, profile.followers_count - 1) });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to unfollow user';
      setError(message);
    }
  };

  // Check if following
  const isFollowing = async (followingId: string, followerId: string): Promise<boolean> => {
    try {
      const { data, error: err } = await supabase
        .from('follows')
        .select('*')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .single();
      if (err && err.code !== 'PGRST116') throw err; // PGRST116 = no rows found
      return !!data;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    followUser,
    unfollowUser,
    isFollowing,
  };
}
