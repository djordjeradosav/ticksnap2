/**
 * useAuth Hook
 * Manages authentication state and real Supabase session
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface AuthUser {
  id: string;
  email: string | undefined;
  username?: string;
  phone?: string;
  provider?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string, phone: string, username?: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { phone, username },
        },
      });
      if (err) throw err;

      // Create profile entry
      if (data.user) {
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            username: username || email.split('@')[0],
            full_name: username || '',
            avatar_url: null,
          },
        ]);
      }

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (err) throw err;
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error: err } = await supabase.auth.signOut();
      if (err) throw err;
      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'apple') => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: 'ticksnap://auth/callback',
        },
      });
      if (err) throw err;
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : `${provider} sign in failed`;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data, error: err } = await supabase.auth.getSession();
        if (err) throw err;

        if (data?.session?.user) {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email,
            provider: data.session.user.app_metadata?.provider,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Auth error');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            provider: session.user.app_metadata?.provider,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    signInWithOAuth,
    isAuthenticated: !!user,
    clearError: () => setError(null),
  };
}
