/**
 * useAuth Hook
 * Local authentication system that works without Supabase auth
 */

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
}

// Demo accounts
const DEMO_ACCOUNTS = [
  {
    id: 'demo-1',
    email: 'demo@example.com',
    password: 'Demo123!@#',
    username: 'demo_trader',
  },
  {
    id: 'test-1',
    email: 'test@example.com',
    password: 'Test1234!@#',
    username: 'test_user',
  },
];

const STORAGE_KEY = 'ticksnap_auth_user';
const USERS_KEY = 'ticksnap_users';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Check demo accounts
      const demoAccount = DEMO_ACCOUNTS.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (demoAccount) {
        const authUser: AuthUser = {
          id: demoAccount.id,
          email: demoAccount.email,
          username: demoAccount.username,
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
        setUser(authUser);
        return { user: authUser };
      }

      // Check registered users
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      const registeredUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (registeredUser) {
        const authUser: AuthUser = {
          id: registeredUser.id,
          email: registeredUser.email,
          username: registeredUser.username,
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
        setUser(authUser);
        return { user: authUser };
      }

      throw new Error('Invalid email or password');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, phone?: string, username?: string) => {
    try {
      setLoading(true);
      setError(null);

      // Check if email already exists
      const demoExists = DEMO_ACCOUNTS.some((acc) => acc.email === email);
      if (demoExists) {
        throw new Error('Email already registered');
      }

      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      if (users.some((u: any) => u.email === email)) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        password,
        phone: phone || '',
        username: username || email.split('@')[0],
      };

      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Auto-login after signup
      const authUser: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      setUser(authUser);

      return { user: authUser };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
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
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    clearError,
  };
}
