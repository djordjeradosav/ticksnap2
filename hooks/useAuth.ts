/**
 * useAuth Hook
 * Email/password authentication using tRPC API calls
 */

import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '@/store/authStore';
import { getApiBaseUrl } from '@/constants/oauth';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
}

export function useAuth() {
  const router = useRouter();
  const { user, token, setUser, setToken, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const apiCall = useCallback(
    async (method: string, data: any) => {
      try {
        setError(null);
        const response = await fetch(`${getApiBaseUrl()}/api/trpc/auth.${method}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ json: data }),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `API error: ${response.status}`);
        }

        const result = await response.json();
        return result.result.data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      }
    },
    []
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        const result = await apiCall('login', { email, password });

        // Store token
        await SecureStore.setItemAsync('auth_token', result.token);

        // Update store
        setToken(result.token);
        setUser(result.user);

        // Redirect to tabs
        router.replace('/(tabs)');

        return result;
      } catch (err) {
        console.error('Login failed:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [apiCall, setToken, setUser, router]
  );

  const signUp = useCallback(
    async (email: string, username: string, password: string, fullName?: string) => {
      try {
        setIsLoading(true);
        const result = await apiCall('signup', {
          email,
          username,
          password,
          fullName,
        });

        // Store token
        await SecureStore.setItemAsync('auth_token', result.token);

        // Update store
        setToken(result.token);
        setUser(result.user);

        // Redirect to tabs
        router.replace('/(tabs)');

        return result;
      } catch (err) {
        console.error('Signup failed:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [apiCall, setToken, setUser, router]
  );

  const signOut = useCallback(
    async () => {
      try {
        setIsLoading(true);

        // Clear token from storage
        await SecureStore.deleteItemAsync('auth_token');

        // Clear store
        clearAuth();

        // Redirect to auth
        router.replace('/(auth)');
      } catch (err) {
        console.error('Logout failed:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [clearAuth, router]
  );

  return {
    user,
    token,
    signIn,
    signUp,
    signOut,
    isLoading,
    error,
    isAuthenticated: !!user && !!token,
  };
}
